import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Admin} from '../models/admin.model';
import {Company} from '../models/company.model';
import equals = require('validator/lib/equals');

const router: Router = Router();
router.post('/token', async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const instance = await User.findOne({ where: {email: email }});
  if (foundUser(instance, res) && instance !== null) {
    if (instance.password === password) {
      const crypto = require('crypto');
      const token = crypto.randomBytes(64).toString('hex');
      instance.token = token;
      await instance.save();
      res.statusCode = 200;
      res.json({
        id: instance.id,
        token: token
      });
    } else {
      res.statusCode = 401;
      res.json({
        'message': 'wrong password'
      });
    }
  }
});

export function foundUser(instance: any, res: any) {
  if (instance == null) {
    res.statusCode = 404; // not found
    res.json({
      'message': 'user not found'
    });
    return false;
  } else {
    return true;
  }
}
export function checkToken(instance: any, res: any, token: string) {
  if (token !== instance.token) {
    res.statusCode = 401; // unauthorized
    res.json({
      'message': 'wrong token'
    });
    return false;
  } else {
    return true;
  }
}
export const UserController: Router = router;
