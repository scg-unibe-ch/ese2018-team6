import {Router, Request, Response} from 'express';
// import {JobList} from '../models/joblist.model';
import {JobItem} from '../models/jobitem.model';
import {User} from '../models/user.model';
import {checkToken, foundUser} from './user.controller';
import {Company} from '../models/company.model';
import {Sequelize} from 'sequelize-typescript';

const router: Router = Router();
/*
- for posting a new job item -> creates a JobItem
- the company has to be verified (checked by this method)
 */
router.post('/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const user = await User.findById(id);
  const company = await Company.findOne({where: {userId: id}});
  if (foundUser(user, res)  && company != null && company.verified == true) {
    //please note: if foundUser()==false, the foundUser() method sends the request!
    if (checkToken(user, res, token) && user !== null) {
      //please note: if checkToken()==false, the checkToken() method sends the request!
      const instance = new JobItem();
      instance.fromSimplification(req.body);
      // @ts-ignore
      instance.accepted = null; // should not be decided by client
      instance.featured = false;
      instance.messageFromAdmin = ''; // should not be decided by client
      instance.companyId = id; // should not be decided by client
      await instance.save();
      res.statusCode = 201;
      res.send(instance.toSimplification());
    }
  } else {
    res.statusCode = 401;
    res.json({
      'message': 'company is not verified and therefore cannot create job postings'
    });
  }
});

/*
- for searching for jobitems -> returns a map of JobItems
- searches through title, description, skills, city and street
- only works for accepted jobitems
 */
router.get('/search/:term', async (req: Request, res: Response) => {
  const term = req.params.term;
  const Op = Sequelize.Op;
  const instances = await JobItem.findAll({where: {
    accepted: true,
      [Op.or]: [
        {title: {[Op.like]: '%'+term+'%'}},
        {description: {[Op.like]: '%'+term+'%'}},
        {skills: {[Op.like]: '%'+term+'%'}},
        {city: {[Op.like]: '%'+term+'%'}},
        {street: {[Op.like]: '%'+term+'%'}}
      ]
    },
    order: [
      ['featured', 'DESC'],
      ['datePosted', 'DESC'],
    ]
  });
  let returnArray = instances.map(e => e.toSimplification());
  for(let i = 0; i < returnArray.length; i++){
    const company = await Company.findOne({where: {userId: instances[i].companyId}});
    if (company !== null)
      returnArray[i].companyName = company.companyName;
  }
  res.statusCode = 200;
  res.send(returnArray);
});
/*
- for filtering the jobitem list -> returns a map of JobItems
- specify a list of filters as written in the specification
- jobitem has to be accepted
- return featured ones on top
 */
router.post('/filter', async (req: Request, res: Response) => {
  const Op = Sequelize.Op;
  if(req.body.filterList && req.body.filterList.constructor === Array && req.body.filterList.length > 0) {
    let filterArray = []; //stores a list with conditions, which then are used as options for the SQL request
    for(let i = 0; i < req.body.filterList.length; i++) { //loop through every filter object
      let filterObject = req.body.filterList[i];
      switch (filterObject.filter) {
        case undefined:
          sendErrorResponse(res, 400,
            {'message': 'at least one filter object is invalid (missing filter property)'});
          break;
        case "datePosted":
          if(validateMinMaxFilter(filterObject,"minDate","maxDate",res)){
            filterArray.push({
              datePosted: {[Op.between]: [filterObject.minDate, filterObject.maxDate]}
            });
          }
          break;
        case "startDate":
          if(validateMinMaxFilter(filterObject,"minDate","maxDate",res)){
            filterArray.push({
              startDate: {[Op.between]: [filterObject.minDate, filterObject.maxDate]}
            });
          }
          break;
        case "endDate":
          if(validateMinMaxFilter(filterObject,"minDate","maxDate",res)){
            filterArray.push({
              endDate: {[Op.between]: [filterObject.minDate, filterObject.maxDate]}
            });
          }
          break;
        case "validUntil":
          if(validateMinMaxFilter(filterObject,"minDate","maxDate",res)){
            filterArray.push({
              validUntil: {[Op.between]: [filterObject.minDate, filterObject.maxDate]}
            });
          }
          break;
        case "language":
          if(validateArrayFilter(filterObject, "languages", true, res)){
            const opArray = createLanguageFilterOpArray(filterObject.languages);
            filterArray.push({
              [Op.or]: opArray
            });
          }
          break;
        case "postcode":
          if(validateArrayFilter(filterObject, "postcodes", true, res)){
            const opArray = createPostcodeFilterOpArray(filterObject.postcodes);
            filterArray.push({
              [Op.or]: opArray
            });
          }
          break;
        case "salaryType":
          if(filterObject.salaryType && !isNaN(filterObject.salaryType)){
            filterArray.push({
              salaryType: {[Op.eq]: filterObject.salaryType}
            });
          } else {
            sendErrorResponse(res, 400,{'message':'salary type filter is invalid.'})
          }
          break;
        case "salaryAmount":
          if(validateMinMaxFilter(filterObject,"minSalaryAmount","maxSalaryAmount",res)){
            filterArray.push({
              salaryAmount: {[Op.between]: [filterObject.minSalaryAmount, filterObject.maxSalaryAmount]}
            });
          }
          break;
        case "workload":
          if(validateMinMaxFilter(filterObject,"minWorkload","maxWorkload",res)){
            filterArray.push({
              [Op.and]: [
                {workloadMin: {[Op.gte]: filterObject.minWorkload}},
                {workloadMax: {[Op.lte]: filterObject.maxWorkload}}
              ]
            });
          }
          break;
        default:
          sendErrorResponse(res,400,
            {'message': 'at least one filter type is not accepted'})
      }
    }
    //now apply all these filter:
    const instances = await JobItem.findAll({where: {
        accepted: true,
        [Op.and]: filterArray
      },
      order: [
        ['featured', 'DESC'],
        ['datePosted', 'DESC'],
      ]
    });

    let returnArray = instances.map(e => e.toSimplification());
    for(let i = 0; i < returnArray.length; i++){
      const company = await Company.findOne({where: {userId: instances[i].companyId}});
      if (company !== null)
        returnArray[i].companyName = company.companyName;
    }
    res.statusCode = 200;
    res.send(returnArray);

  } else {
    sendErrorResponse(res, 400, {'message': 'please specify a filter list with at least filter object'});
  }
});
/**
 * checks if the filterObject is a valid min/max filter (date, salaryAmount, workload). If not, aborts the request and returns Bad Request.
 *
 * @param filterObject - object to validate
 * @param minimumValue - String of the minimum property
 * @param maximumValue - String of the maximum property
 * @param res - response object, for sending bad request
 */
function validateMinMaxFilter(filterObject: any, minimumValue: any, maximumValue: any, res: any){
  if(filterObject[minimumValue] && filterObject[maximumValue] && !isNaN(filterObject[minimumValue]) && !isNaN(filterObject[maximumValue])){
    return true;
  } else {
    sendErrorResponse(res, 400,
      {'message': 'at least one filter is not valid (date/workload/salaryAmount filter)'});
    return false;
  }
}
/**
 * checks if the filterObject is a valid array filter (language, postcode). If not, aborts the request and returns Bad Request.
 *
 * @param filterObject - object to validate
 * @param filterType - String with the name of the property which stores the array
 * @param hasStringElements - flag, if true, the Elements in the array are Strings, otherwise numbers.
 * @param res - response object, for sending bad request.
 */
function validateArrayFilter(filterObject: any, filterType: any, hasStringElements: boolean, res: any){
  if(filterObject[filterType] && filterObject[filterType] instanceof Array) {
    if (hasStringElements) {
      if (filterObject[filterType].length > 0 && typeof filterObject[filterType][0] === "string") {
        return true;
      }
    }
    if (!hasStringElements) {
      if (filterObject[filterType].length > 0 && !isNaN(filterObject[filterType][0])) {
        return true;
      }
    }
  }
  sendErrorResponse(res,400,
    {'message': 'at least one filter is not valid (language/postcode/salaryType filter)'} );
  return false;
}
/*
creates a "op" string, which can be passed to sequelize
 */
function createLanguageFilterOpArray(array: any){
  const Op = Sequelize.Op;
  let i;
  let opArray = [];
  for(i = 0; i < array.length; i++) {
    opArray.push({firstLanguage: {[Op.eq]: array[i]}});
    opArray.push({secondLanguage: {[Op.eq]: array[i]}});
  }
  return opArray;
}
/*
creates a "op" string, which can be passed to sequelize
 */
function createPostcodeFilterOpArray(array: any){
  const Op = Sequelize.Op;
  let i;
  let opArray = [];
  for(i = 0; i < array.length; i++) {
    opArray.push({postcode: {[Op.eq]: array[i]}});
  }
  return opArray;
}
/**
 * sends a response, but only if the response is not sent already
 *
 * @param res - response object
 * @param statusCode - sets the status code of the response
 * @param object - object, that is sent via json() method
 */
function sendErrorResponse(res: any, statusCode: number, object:any){
  if(!res.headersSent){
    res.statusCode = statusCode;
    res.json(object);
  }
}

/*
 - returns a map of JobItems
 - ordered according to datePosted
 - only works for accepted JobItems
 - return featured ones on top
 */
router.get('/', async (req: Request, res: Response) => {
  const instances = await JobItem.findAll(    {
    where:
      {accepted: true},
    order: [
      ['featured', 'DESC'],
      ['datePosted', 'DESC'],
    ]
  });
  let returnArray = instances.map(e => e.toSimplification());
  for(let i = 0; i < returnArray.length; i++){
    const company = await Company.findOne({where: {userId: instances[i].companyId}});
    if (company !== null)
      returnArray[i].companyName = company.companyName;
  }
  res.statusCode = 200;
  res.send(returnArray);
});

/*
- returns the JobItem with id that is in the parameter
 */
router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await JobItem.findById(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  res.statusCode = 200;
  res.send(instance.toSimplification());
});

/*
 - returns a map of all JobItems of one company that are accepted
 */
router.get('/ofCompany/:companyId', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instances = await JobItem.findAll({where: {companyId: id, accepted: true}});
  res.statusCode = 200;
  res.send(instances.map(e => e.toSimplification()));
});

/*
- returns a map of jobitems of one company user
- messageFromAdmin and accepted status can be seen
- only works for user himself (userId and token needed)
 */
router.get('/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const user = await User.findById(id);
  if (foundUser(user, res) && checkToken(user, res, token) && user !== null) {
    let instances = await JobItem.findAll({
      where:
        {companyId: id},
      order: [
        ['accepted', 'ASC'],
      ]
    });

    if (instances == null) {
      res.statusCode = 404;
      res.json({
        'message': 'jobitem not found'
      });
      return;
    }

    let returnArray = instances.map(e => e.toSimplification());
    for(let i = 0; i < returnArray.length; i++){
      returnArray[i].message = instances[i].messageFromAdmin;
      returnArray[i].accepted = instances[i].accepted;
    }
    res.statusCode = 200;
    res.send(returnArray);
  }
});

/*
- for editing a jobitem (with id in parameter)
- only possible for the corresponding company user (userid and token needed)
 */
router.put('/:jobItemId/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const user = await User.findById(id);
  if (foundUser(user, res) && checkToken(user, res, token) && user !== null) {
    const jobItemId = parseInt(req.params.jobItemId);
    const instance = await JobItem.findById(jobItemId);
    if (instance == null) {
      res.statusCode = 404;
      res.json({
        'message': 'not found'
      });
      return;
    }
    if (instance.companyId == user.id) { // check if user corresponds to this jobItem
      instance.fromSimplification(req.body);
      // @ts-ignore
      instance.accepted = null; // when edited, needs to be accepted again by admin
      // @ts-ignore
      instance.datePosted = null;
      await instance.save();
      res.statusCode = 200;
      res.send(instance.toSimplification());
    } else {
      res.statusCode = 401;
      res.json({
        'message': 'not your job posting'
      });
    }
  }
});

/*
- for deleting a jobitem
- only possible for the corresponding company user (userid and token needed)
 */
router.delete('/:jobItemId/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const user = await User.findById(id);
  if (foundUser(user, res) && checkToken(user, res, token) && user !== null) {
    const jobItemId = parseInt(req.params.jobItemId);
    const jobItem = await JobItem.findById(jobItemId);
    if (jobItem == null) {
      res.statusCode = 404;
      res.json({
        'message': 'not found'
      });
      return;
    }
    if (jobItem.companyId == user.id) {
      // jobItem.fromSimplification(req.body);
      await jobItem.destroy();
      res.statusCode = 204;
      res.send();
    } else {
      res.statusCode = 401;
      res.json({
        'message': 'not your job posting'
      });
    }
  }
});

export const JobItemController: Router = router;
