import {Router, Request, Response} from 'express';
import {Admin} from '../models/admin.model';
import {Company} from '../models/company.model';
import {User} from '../models/user.model';
import {JobItem} from '../models/jobitem.model';
import {foundUser, checkToken} from './user.controller';

const router: Router = Router();

router.get('/unverifiedCompanies/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const user = await User.findById(id);
  if (adminAuthentification(user, res, id, token) && user !== null) {
    const crypto = require('crypto');
    const newToken = crypto.randomBytes(64).toString('hex');
    user.token = newToken;
    await user.save();
    const instances = await Company.findAll({where: {verified: false}});
    res.statusCode = 200;
    res.json({
      token: newToken,
      companies: instances.map(e => e.toSimplification())
    });
  }
});

router.put('/verifyCompany/:companyId/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const user = await User.findById(id);
  if (adminAuthentification(user, res, id, token) && user !== null) {
    const companyId = parseInt(req.params.companyId);
    const instance = await Company.findById(companyId);
    if (instance !== null) {
      instance.verified = true;
      res.statusCode = 200;
      await instance.save();
      const crypto = require('crypto');
      const newToken = crypto.randomBytes(64).toString('hex');
      user.token = newToken;
      await user.save();
      res.json({
        token: newToken
      });
    } else {
      res.statusCode = 404;
      res.json({
        'message': 'company not found'
      });
    }
  }
});

router.get('/unacceptedJobItems/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const user = await User.findById(id);
  if (adminAuthentification(user, res, id, token) && user !== null) {
    const crypto = require('crypto');
    const newToken = crypto.randomBytes(64).toString('hex');
    user.token = newToken;
    await user.save();
    const instances = await JobItem.findAll({where: {accepted: false}});
    res.statusCode = 200;
    res.json({
      token: newToken,
      companies: instances.map(e => e.toSimplification())
    });
  }
});

router.put('/acceptJobItem/:jobitemId/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const user = await User.findById(id);
  if (adminAuthentification(user, res, id, token) && user !== null) {
    const jobitemId = parseInt(req.params.jobitemId);
    const instance = await JobItem.findById(jobitemId);
    if (instance !== null) {
      instance.accepted = true;
      await instance.save();
      const crypto = require('crypto');
      const newToken = crypto.randomBytes(64).toString('hex');
      user.token = newToken;
      await user.save();
      res.statusCode = 200;
      res.json({
        token: newToken
      });
    } else {
      res.statusCode = 404;
      res.json({
        'message': 'jobitem not found'
      });
    }
  }
});

router.put('/declineJobItem/:jobitemId/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const user = await User.findById(id);
  if (adminAuthentification(user, res, id, token) && user !== null) {
    const jobitemId = parseInt(req.params.jobitemId);
    const message = req.body.message;
    const instance = await JobItem.findById(jobitemId);
    if (instance !== null) {
      instance.accepted = false;
      instance.messageFromAdmin = message;
      await instance.save();
      res.statusCode = 200;
      const crypto = require('crypto');
      const newToken = crypto.randomBytes(64).toString('hex');
      user.token = newToken;
      await user.save();
      res.json({
        token: newToken
      });
    }
  }
});

function adminAuthentification(user: any, res: any, id: number, token: string) {
  if (foundUser(user, res) && checkToken(user, res, token) && Admin.findOne({ where: {userId: id }}) !== null) {
      return true;
  } else {
    res.statusCode = 401; // unauthorized
    res.json({
      'message': 'not authorized'
    });
    return false;
  }
}


// TODO: admin authentifizierung einrichten, delete requests

export const AdminController: Router = router;
