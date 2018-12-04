import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Admin} from '../models/admin.model';
import {sendErrorResponse} from './jobitem.controller';

const router: Router = Router();
/*
- to log in
- returning id: userId, token: token, isAdmin: isAdmin
 */
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
      sendErrorResponse(res, 401, {'message': 'wrong password'});
    }
  } else {
    sendErrorResponse(res, 400, {'message': 'user not found or bad request (email or password missing)'});
  }
});

/*
- returns user
- only works for user himself (userId and token needed)
 */
router.get('/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const instance = await User.findById(id);
  if (foundUser(instance, res) && checkToken(instance, res, token) && instance !== null) {
    res.statusCode = 200;
    res.send(instance.toSimplification());
  } else {
    sendErrorResponse(res, 404, {'message': 'user not found'});
  }
});

/*
- for updating the user model (password and email address).
- requires a non-empty password and email field
- email has to be unique
 */
router.put('/:id/:token', async (req: Request, res: Response) => {
  if(req.body.email && req.body.password) {
    //valid request
    const id = parseInt(req.params.id);
    const token = req.params.token;
    const instance = await User.findById(id);
    if (foundUser(instance, res) && checkToken(instance, res, token) && instance !== null) {
      const sameEmailUser = await User.findOne({where: {email: req.body.email}});
      //the user can keep his email if he doesn't want to change it
      if (sameEmailUser == null || sameEmailUser.id == instance.id) {
        const bcrypt = require('bcrypt');
        instance.fromSimplification(req.body);
        instance.password = bcrypt.hashSync(req.body.password, saltRounds);
        await instance.save();
        res.statusCode = 200;
        res.send();
      } else {
        sendErrorResponse(res, 400, {'message': 'user with this email already exists'});
      }
    }
  } else {
    sendErrorResponse(res, 400, {'message': 'provide an non-empty email address and password'});
  }
});

/*
- for deleting
- only works for user himself (userId and token needed)
 */
router.delete('/:id/:token', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const token = req.params.token;
  const instance = await User.findById(id);
  if (foundUser(instance, res) && checkToken(instance, res, token) && instance !== null) {
      await instance.destroy();
      res.statusCode = 204;
      res.send();
  } else {
    sendErrorResponse(res, 404, {'message': 'user not found'});
    }
});

/*
- exported helper method to check if user exists
- if the specified user is null, a request is sent!
 */
export function foundUser(user: any, res: any) {
  if (user == null) {
    sendErrorResponse(res, 404, {'message': 'user not found'});
    return false;
  } else {
    return true;
  }
}
/*
- checks, if the specified token is valid for the specified id
- if the token is not valid, a request is sent!
 */
export function checkToken(user: any, res: any, token: string) {
  if (token !== user.token) {
    sendErrorResponse(res, 401, {'message': 'wrong token'});
    return false;
  } else if (user.tokenExpirationDate < Date.now()) {
    sendErrorResponse(res, 401, {'message': 'token expired, please sign in again'});
    return false;
  } else {
    return true;
  }
}



export const UserController: Router = router;
export const saltRounds = 10;
