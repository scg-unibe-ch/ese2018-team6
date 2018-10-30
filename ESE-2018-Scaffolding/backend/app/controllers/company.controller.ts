import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Company} from '../models/company.model';
import {JobItem} from '../models/jobitem.model';
import {foundUser, checkToken} from './user.controller';

const router: Router = Router();
router.post('/', async (req: Request, res: Response) => {
  const instance = new User();
  const company = new Company()
  req.body.userId = instance.id;
  instance.fromSimplification(req.body);
  company.fromSimplification(req.body);
  const testInstance = await User.findOne({ where: {email: instance.email }});
  if (testInstance == null) {
    company.verified = false;
    await instance.save();
    await company.save();
    res.statusCode = 201;
    res.send(instance.toSimplification());
  } else { res.statusCode = 403;
  res.json({
    'message': 'email already used'
  });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await Company.findById(id);
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

router.get('/allCompanies', async (req: Request, res: Response) => {
  const instances = await Company.findAll();
  res.statusCode = 200;
  res.send(instances.map(e => e.toSimplification()));
});

router.put('/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const instance = await User.findById(id);
  if (foundUser(instance, res) && checkToken(instance, res, token) && instance !== null) {
    const companyInstance = await Company.findById(id);
    if (companyInstance == null) {
      res.statusCode = 404; // not found
      res.json({
        'message': 'company not found'
      });
      return;
    }
    const oldVerified = companyInstance.verified;
    companyInstance.fromSimplification(req.body);
    companyInstance.verified = oldVerified;
    await companyInstance.save();
    const crypto = require('crypto');
    const newToken = crypto.randomBytes(64).toString('hex');
    instance.token = newToken;
    await instance.save();
    res.statusCode = 200;
    res.json({
      token: newToken
    });
  }
});

router.delete('/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const instance = await User.findById(id);
  if (foundUser(instance, res) && checkToken(instance, res, token) && instance !== null) {
    const companyInstance = await Company.findOne({ where: {userId: id }})
    console.log(companyInstance);
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
