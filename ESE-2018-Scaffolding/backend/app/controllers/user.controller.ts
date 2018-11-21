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
  if (foundUser(user, res) && user !== null && password && email) {
    const bcrypt = require('bcrypt');

    const match = bcrypt.compareSync(password, user.password);
    if (match) {
      const crypto = require('crypto');
      const token = crypto.randomBytes(64).toString('hex');
      user.token = token;
      user.tokenExpirationDate = Date.now() + 18000000; // valid for 5 hours = 18000000 milliseconds
      await user.save();
      let isAdmin;
      if (await Admin.findOne({ where: {userId: user.id}}) !== null)
        isAdmin = true;
      else isAdmin = false;
      res.statusCode = 201;
      res.json({
        id: user.id,
        token: token,
        isAdmin: isAdmin
      });
    } else {
      res.statusCode = 401;
      res.json({
        'message': 'wrong password'
      });
    }
  } else {
    res.statusCode = 400;
    res.json({
      'message': 'user not found or bad request (email or password missing)'
    });
  }
});

router.get('/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const instance = await User.findById(id);
  if (foundUser(instance, res) && checkToken(instance, res, token) && instance !== null) {
    res.statusCode = 200;
    res.send(instance.toSimplification());
  } else {
    res.statusCode = 404;
    res.json({
      'message': 'user not found'
    });
  }
});

router.put('/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const instance = await User.findById(id);
  if (foundUser(instance, res) && checkToken(instance, res, token) && instance !== null) {
    const sameEmailUser = await User.findOne({where: {email: req.body.email}});
    if (sameEmailUser == null){
      const bcrypt = require('bcrypt');
      instance.fromSimplification(req.body);
      instance.password = bcrypt.hashSync(req.body.password, saltRounds);
      await instance.save();
      res.statusCode = 200;
      res.send();
    } else {
      res.statusCode = 400;
      res.json({
        'message': 'user with this email already exists'
      });
    }
  }
});

router.delete('/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const instance = await User.findById(id);
  if (foundUser(instance, res) && checkToken(instance, res, token) && instance !== null) {
      await instance.destroy();
      res.statusCode = 204;
      res.send();
  } else {
      res.statusCode = 404;
      res.json({
        'message': 'user not found'
      });
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
export const saltRounds = 10;
