import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Admin} from '../models/admin.model';
import {Company} from '../models/company.model';
import equals = require('validator/lib/equals');

const router: Router = Router();
router.post('/token', async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ where: {email: email }});
  if (foundUser(user, res) && user !== null) {
    if (user.password === password) {
      const crypto = require('crypto');
      const token = crypto.randomBytes(64).toString('hex');
      user.token = token;
      user.tokenDate = Date.now();
      user.tokenExpirationDate = Date.now() + 1080000000; // valid for 5 hours = 1080000000 milliseconds
      await user.save();
      res.statusCode = 200;
      res.json({
        id: user.id,
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

router.put('/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const instance = await User.findById(id);
  if (foundUser(instance, res) && checkToken(instance, res, token) && instance !== null) {
    instance.fromSimplification(req.body);
    await instance.save();
    res.statusCode = 200;
    res.send();
  }
});

export function foundUser(user: any, res: any) {
  if (user == null) {
    res.statusCode = 404; // not found
    res.json({
      'message': 'user not found'
    });
    return false;
  } else {
    return true;
  }
}
export function checkToken(user: any, res: any, token: string) {
  if (token !== user.token) {
    res.statusCode = 401; // unauthorized
    res.json({
      'message': 'wrong token'
    });
    return false;
  } else if (user.tokenExpirationDate < Date.now()) {
    res.statusCode = 401; // unauthorized
    res.json({
      'message': 'token expired'
    });
    return false;
  } else {
    return true;
  }
}
export const UserController: Router = router;
