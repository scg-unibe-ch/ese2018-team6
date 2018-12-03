import {Router, Request, Response} from 'express';
import {Admin} from '../models/admin.model';
import {Company} from '../models/company.model';
import {User} from '../models/user.model';
import {JobItem} from '../models/jobitem.model';
import {foundUser, checkToken} from './user.controller';

const router: Router = Router();

/*
- returns a map of all jobitems which exist
- need to be logged in as admin (userId and token needed)
 */
router.get('/allJobItems/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const user = await User.findById(id);
  const admin = await Admin.findOne({ where: {userId: id }});
  if (adminAuthentification(user, res, id, token, admin) && user !== null) {
    const instances = await JobItem.findAll();
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
- returns a map of all companies which exist
- need to be logged in as admin (userId and token needed)
 */
router.get('/allCompanies/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const user = await User.findById(id);
  const admin = await Admin.findOne({ where: {userId: id }});
  if (adminAuthentification(user, res, id, token, admin) && user !== null) {
    const instances = await Company.findAll();
    res.statusCode = 200;
    res.send(instances.map(e => e.toSimplification()));
  }
});

/*
- returns a map of all unverified companies
- need to be logged in as admin (userId and token needed)
 */
router.get('/unverifiedCompanies/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const user = await User.findById(id);
  const admin = await Admin.findOne({ where: {userId: id }});
  if (adminAuthentification(user, res, id, token, admin) && user !== null) {
    const instances = await Company.findAll({where: {verified: null}});
    res.statusCode = 200;
    res.send(instances.map(e => e.toSimplification()));
  }
});

/*
- for editing company verified status to given body boolean
- need to be logged in as admin (userId and token needed)
- sets 'onceVerified' to true
 */
router.put('/verify/:companyId/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const verify = req.body.verify;
  if(!(verify == true || verify == false)){
    res.statusCode = 400;
    res.json({
      'message': 'please set a valid boolean for verify'
    });
    return;
  }
  const user = await User.findById(id);
  const admin = await Admin.findOne({ where: {userId: id }});
  if (adminAuthentification(user, res, id, token, admin) && user !== null) {
    const companyId = parseInt(req.params.companyId);
    const instance = await Company.findOne({where: {userId: companyId}});
    if (instance !== null) {
      instance.verified = verify;
      if (verify == true)
        instance.onceVerified = true;
      if(req.body.message) {
        instance.messageFromAdmin = req.body.message;
      }
      res.statusCode = 200;
      await instance.save();
      res.send();
    } else {
      res.statusCode = 404;
      res.json({
        'message': 'company not found'
      });
    }
  }
});

/*
- returns a map of all open JobItems
- need to be logged in as admin (userId and token needed)
 */
router.get('/unacceptedJobItems/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const user = await User.findById(id);
  const admin = await Admin.findOne({ where: {userId: id }});
  if (adminAuthentification(user, res, id, token, admin) && user !== null) {
    const instances = await JobItem.findAll({where: {accepted: null}});
    let returnArray = instances.map(e => e.toSimplification());
    for(let i = 0; i < returnArray.length; i++){
      const company = await Company.findOne({where: {userId: instances[i].companyId}});
      if (company !== null)
        returnArray[i].companyName = company.companyName;
    }
    res.statusCode = 200;
    res.send(returnArray);
  }
});
/*
- for accepting job items by an admin
- the user has to be admin
- add in the request body a field with accepted == true or false
- if the admin wants to decline the jobitem (accepted == false), then a message string can be specified
 */
router.put('/accept/:jobitemId/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const accept = req.body.accept;
  const user = await User.findById(id);
  const admin = await Admin.findOne({ where: {userId: id }});
  if (adminAuthentification(user, res, id, token, admin) && user !== null) {
    const jobitemId = parseInt(req.params.jobitemId);
    const instance = await JobItem.findById(jobitemId);
    if (instance !== null) {
      instance.accepted = accept;
      if (accept == false) {
        instance.messageFromAdmin = req.body.message;
      } else if (accept == true) {
        instance.messageFromAdmin = '';
        let today = new Date();
        instance.datePosted = today.getTime();
      } else {
        res.statusCode = 400;
        res.json({
          'message': 'please specify accept boolean'
        });
      }
      await instance.save();
      res.statusCode = 200;
      res.send()
    } else {
      res.statusCode = 404;
      res.json({
        'message': 'jobitem not found'
      });
    }
  }
});

/*
- for editing own admin name
- need to be logged in as admin (userId and token needed)
 */
router.put('/changeName/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const user = await User.findById(id);
  const admin = await Admin.findOne({ where: {userId: id }});
  if (adminAuthentification(user, res, id, token, admin) && user !== null) {
    const instance = await Admin.findOne({ where: {userId: id }});
    const newName = req.body.name;
    if (instance !== null) {
      instance.name = newName;
      await instance.save();
      res.statusCode = 200;
      res.send();
    }
  }
});

/*
- for deleting a jobitem
- only possible for an admin
 */
router.delete('/deleteJobItem/:jobItemId/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const user = await User.findById(id);
  const admin = await Admin.findOne({ where: {userId: id }});
  if (adminAuthentification(user, res, id, token, admin) && user !== null){
    const jobItemId = parseInt(req.params.jobItemId);
    const jobItem = await JobItem.findById(jobItemId);
    if (jobItem == null) {
      res.statusCode = 404;
      res.json({
        'message': 'jobitem not found'
      });
      return;
    }
    await jobItem.destroy();
    res.statusCode = 204;
    res.send();
  }
});

/*
- for deleting a company
- only possible for an admin
 */
router.delete('/deleteCompany/:companyId/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const companyId = req.params.companyId;
  const user = await User.findById(id);
  const admin = await Admin.findOne({ where: {userId: id }});
  if (adminAuthentification(user, res, id, token, admin) && user !== null){
    const companyInstance = await Company.findOne({ where: {userId: companyId }});
    const companyUser = await User.findById(companyId);
    if (companyInstance !== null && companyUser !== null) {
      await companyUser.destroy();
      await companyInstance.destroy();
      res.statusCode = 204;
      res.send();
    } else {
      res.statusCode = 404;
      res.json({
        'message': 'company not found'
      });
    }
  }
});

/*
- feature a company
- need to be logged in as admin (userId and token needed)
 */
router.put('/featureCompany/:companyId/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const companyId = req.params.companyId;
  const feature = req.body.feature;
  if(!(feature == true || feature == false)){
    res.statusCode = 400;
    res.json({
      'message': 'please set a valid boolean for feature'
    });
    return;
  }
  const user = await User.findById(id);
  const admin = await Admin.findOne({ where: {userId: id }});
  if (adminAuthentification(user, res, id, token, admin) && user !== null) {
    const instance = await Company.findOne({where: {userId: companyId}});
    if (instance !== null) {
      instance.featured = feature;
      res.statusCode = 200;
      await instance.save();
      res.send();
    } else {
      res.statusCode = 404;
      res.json({
        'message': 'company not found'
      });
    }
  }
});

/*
- feature a jobItem
- need to be logged in as admin (userId and token needed)
 */
router.put('/featureJobItem/:jobItemId/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const jobItemId = req.params.jobItemId;
  const feature = req.body.feature;
  if(!(feature == true || feature == false)){
    res.statusCode = 400;
    res.json({
      'message': 'please set a valid boolean for feature'
    });
    return;
  }
  const user = await User.findById(id);
  const admin = await Admin.findOne({ where: {userId: id }});
  if (adminAuthentification(user, res, id, token, admin) && user !== null) {
    const instance = await JobItem.findById(jobItemId);
    if (instance !== null) {
      instance.featured = feature;
      res.statusCode = 200;
      await instance.save();
      res.send();
    } else {
      res.statusCode = 404;
      res.json({
        'message': 'jobItem not found'
      });
    }
  }
});

/*
- helper method to check admin authentication
- if the stated user is not admin a request is sent!
 */
function adminAuthentification(user: any, res: any, id: number, token: string, admin: any) {
  if (foundUser(user, res) && checkToken(user, res, token) && admin) {
    //please note: foundUser() and checkToken() methods send error requests, if needed
      return true;
  } else {
    res.statusCode = 401; // unauthorized
    res.json({
      'message': 'not authorized'
    });
    return false;
  }
}

export const AdminController: Router = router;
