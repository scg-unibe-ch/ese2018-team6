import {Router, Request, Response} from 'express';
import {Admin} from '../models/admin.model';
import {Company} from '../models/company.model';
import {User} from '../models/user.model';
import {JobItem} from '../models/jobitem.model';

const router: Router = Router();

router.get('/unverifiedCompanies', async (req: Request, res: Response) => {
  const instances = await Company.findAll({ where: {verified: false }});
  res.statusCode = 200;
  res.send(instances.map(e => e.toSimplification()));
});

router.put('/verifyCompany/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await Company.findById(id);
  if (instance !== null) {
    instance.verified = true;
    res.statusCode = 200;
  }
});

router.put('/acceptJobItem/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await JobItem.findById(id);
  if (instance !== null) {
    instance.accepted = true;
    res.statusCode = 200;
  }
});

router.put('/declineJobItem/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await JobItem.findById(id);
  if (instance !== null) {
    instance.accepted = false;
    res.statusCode = 200;
  }
});
// TODO: testen, dann admin authentifizierung einrichten
// questions: wie nachricht senden, wenn jobitem abgelehnt wird?
// wie werden admins erstellt?
export const AdminController: Router = router;
