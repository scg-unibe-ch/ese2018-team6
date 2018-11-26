import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Company} from '../models/company.model';
import {JobItem} from '../models/jobitem.model';
import {foundUser, checkToken, saltRounds} from './user.controller';

const router: Router = Router();
router.post('/', async (req: Request, res: Response) => {
  const testInstance = await User.findOne({ where: {email: req.body.email }});
  if (req.body.email && req.body.password && testInstance == null) {
    const instance = new User();
    const bcrypt = require('bcrypt');

    instance.fromSimplification(req.body);
    instance.password = bcrypt.hashSync(req.body.password, saltRounds);

    await instance.save();

    const company = new Company();
    company.fromSimplification(req.body);
    company.verified = false;
    company.userId = instance.id;
    company.messageFromAdmin = '';

    await company.save();
    res.statusCode = 201;
    res.json({
      id: instance.id
    });
  } else { res.statusCode = 403;
  res.json({
    'message': 'email already used or bad request (missing email or password)'
  });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await Company.findOne({ where: {userId: id }});
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'company not found'
    });
    return;
  }
  res.statusCode = 200;
  res.send(instance.toSimplification());
});

router.get('/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const instance = await User.findById(id);
  if (foundUser(instance, res) && checkToken(instance, res, token) && instance !== null) {
    const companyInstance = await Company.findOne({ where: {userId: id }});
    if (companyInstance == null) {
      res.statusCode = 404;
      res.json({
        'message': 'company not found'
      });
      return;
    }
    res.statusCode = 200;

    const returnObject = companyInstance.toSimplification();
    returnObject.message = companyInstance.messageFromAdmin;
    res.send(returnObject);
  }
});

/*
- simple get request without authentication to get an array with all verified companies
 */
router.get('', async (req: Request, res: Response) => {
  const instances = await Company.findAll({ where: {verified: true }});
  res.statusCode = 200;
  res.send(instances.map(e => e.toSimplification()));
});

router.put('/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const instance = await User.findById(id);
  if (foundUser(instance, res) && checkToken(instance, res, token) && instance !== null) {
    const companyInstance = await Company.findOne({ where: {userId: id }});
    if (companyInstance == null) {
      res.statusCode = 404; // not found
      res.json({
        'message': 'company not found'
      });
      return;
    }
    companyInstance.fromSimplification(req.body);
    companyInstance.verified = false;
    await companyInstance.save();
    res.statusCode = 200;
    res.send();
  }
});

router.delete('/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const instance = await User.findById(id);
  if (foundUser(instance, res) && checkToken(instance, res, token) && instance !== null) {
    const companyInstance = await Company.findOne({ where: {userId: id }});
    if (companyInstance !== null) {
      await instance.destroy();
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

export const CompanyController: Router = router;
