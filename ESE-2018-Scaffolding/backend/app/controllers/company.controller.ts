import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Company} from '../models/company.model';
import {JobItem} from '../models/jobitem.model';
import {foundUser, checkToken} from './user.controller';

const router: Router = Router();
router.post('/', async (req: Request, res: Response) => {
  const testInstance = await User.findOne({ where: {email: req.body.email }});
  console.log(req.body.email);
  if (req.body.email && testInstance == null) {
    const instance = new User();
    instance.fromSimplification(req.body);

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
    'message': 'email already used or empty'
  });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await Company.findById(id);
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

router.get('/allVerified', async (req: Request, res: Response) => {
  const instances = await Company.findAll({ where: {verified: true }});
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
    companyInstance.fromSimplification(req.body);
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
    const companyInstance = await Company.findOne({ where: {userId: id }})
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
