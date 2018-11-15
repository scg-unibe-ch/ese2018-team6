import {Router, Request, Response} from 'express';
// import {JobList} from '../models/joblist.model';
import {JobItem} from '../models/jobitem.model';
import {User} from '../models/user.model';
import {checkToken, foundUser} from './user.controller';
import {Company} from '../models/company.model';
import {Sequelize} from 'sequelize-typescript';

const router: Router = Router();
router.post('/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const user = await User.findById(id);
  const company = await Company.findOne({where: {userId: id}});
  // @ts-ignore
  if (foundUser(user, res)  && company.verified == true) {
    if (checkToken(user, res, token) && user !== null) {
      const instance = new JobItem();
      instance.fromSimplification(req.body);
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1; //January is 0!
      let year = today.getFullYear();
      let day;
      let month;
      if (dd < 10)
        day = '0' + dd;
      else day = dd;
      if (mm < 10)
        month = '0' + mm;
      else month = mm;
      instance.datePosted = day + '.' + month + '.' + year;
      // @ts-ignore
      instance.accepted = null; // should not be decided by client
      instance.messageFromAdmin = ''; // should not be decided by client
      instance.companyId = id; // should not be decided by client
      await instance.save();
      res.statusCode = 201;
      res.send(instance.toSimplification());
    }
  } else {
    res.statusCode = 401;
    res.json({
      'message': 'user is not verified and therefore cannot create job postings'
    });
  }
});
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
  }});
  res.statusCode = 200;
  res.send(instances.map(e => e.toSimplification()));
});

router.get('/', async (req: Request, res: Response) => {
  const instances = await JobItem.findAll({where: {accepted: true}});
  res.statusCode = 200;
  res.send(instances.map(e => e.toSimplification()));
});

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

router.get('/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const user = await User.findById(id);
  if (foundUser(user, res) && checkToken(user, res, token) && user !== null) {
    let instances = await JobItem.findAll({where: {companyId: id}});

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
