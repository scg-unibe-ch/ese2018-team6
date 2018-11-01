import {Router, Request, Response} from 'express';
// import {JobList} from '../models/joblist.model';
import {JobItem} from '../models/jobitem.model';
import {User} from '../models/user.model';
import {checkToken, foundUser} from './user.controller';

const router: Router = Router();
router.get('/', async (req: Request, res: Response) => {
  /* const jobListId = parseInt(req.query.jobListId);
  let options = {};
  if (jobListId != null) {
    options = {
      include: [{
        model: JobList,
        where: {
          id: jobListId
        }
      }]
    };
  }
  */
  const instances = await JobItem.findAll({where: {accepted: true}});
  res.statusCode = 200;
  res.send(instances.map(e => e.toSimplification()));
});
router.post('/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const user = await User.findById(id);
  if (foundUser(user, res) && checkToken(user, res, token) && user !== null) {
    const instance = new JobItem();
    instance.fromSimplification(req.body);
    instance.accepted = false; // should not be decided by client
    instance.messageFromAdmin = ''; // should not be decided by client
    instance.companyId = id; // should not be decided by client
    await instance.save();
    res.statusCode = 201;
    res.send(instance.toSimplification());
  }
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
