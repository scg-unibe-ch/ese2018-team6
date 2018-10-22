import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {Admin} from '../models/admin.model';
import {Company} from '../models/company.model';
import equals = require('validator/lib/equals');

const router: Router = Router();
router.get('/token/:email/:password', async (req: Request, res: Response) => {
  const email = req.params.email;
  const password = req.params.password;
  const instance = await User.findById(email);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'no user found for this email'
    });
    return;
  } else if (instance.password === password) {
    const crypto = require('crypto');
    const token = crypto.randomBytes(64).toString('hex');
    instance.token = token;
    await instance.save();
    res.statusCode = 200;
    res.send(token);
  } else {
    res.statusCode = 401;
    res.json({
      'message': 'wrong password'
    });
  }
});
/*
router.post('/', async (req: Request, res: Response) => {
  const instance = new TodoItem();
  instance.fromSimplification(req.body);
  await instance.save();
  res.statusCode = 201;
  res.send(instance.toSimplification());
});

router.put('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await TodoItem.findById(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  instance.fromSimplification(req.body);
  await instance.save();
  res.statusCode = 200;
  res.send(instance.toSimplification());
});
router.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await TodoItem.findById(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  instance.fromSimplification(req.body);
  await instance.destroy();
  res.statusCode = 204;
  res.send();
});
*/
export const UserController: Router = router;
