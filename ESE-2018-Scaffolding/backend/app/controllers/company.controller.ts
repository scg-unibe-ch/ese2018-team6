import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Company} from '../models/company.model';

const router: Router = Router();
router.post('/', async (req: Request, res: Response) => {
  const instance = new User();
  const company = new Company()
  req.body.userId = instance.id;
  instance.fromSimplification(req.body);
  company.fromSimplification(req.body)
  await instance.save();
  await company.save();
  res.statusCode = 201;
  res.send(instance.toSimplification());
});
export const CompanyController: Router = router;
