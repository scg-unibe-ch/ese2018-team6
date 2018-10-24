import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Company} from '../models/company.model';
import {JobItem} from '../models/jobitem.model';

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

export const CompanyController: Router = router;
