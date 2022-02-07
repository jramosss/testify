import Router from 'express';
import Models from '../db/models';
import UserUtils from '../src/users';
import strftime from 'strftime';

const router = Router();
const userUtils = new UserUtils();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', strftime('%H:%M:%S'));
  console.log(router.stack);
  next();
});

router.route('/').get(async (req, res) => {
  Models.User.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
});

router.route('/exists').get(async (req, res) => {
  userUtils
    .get_by_username(req.body.username)
    .then(user => res.send(user != undefined))
    .catch(err => res.send(err));
});

router.route('/register').post(async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await userUtils.get_by_username(username);
  if (user != undefined) {
    res.status(400).json('Username already registered');
    return;
  }
  const newUser = await userUtils.register(username, password);
  newUser
    .save()
    .then(_ => res.status(201).json('201 Created'))
    .catch(err => res.status(400).json(`Error ${err}`));
});

router.route('/delete/:id').delete(async (req, res) => {
  Models.User.findByIdAndDelete(req.params.id)
    .then(_ => res.status(204).json('User deleted succesfully'))
    .catch(err => res.status(400).json(err));
});

router.route('/update/:id').post(async (req, res) => {
  Models.User.findByIdAndUpdate(req.params.id, req.body);
});

router.route('/test').get(async (req, res) => {
  const username = req.body.username;
  const user = await userUtils.get_by_username(username);
  console.log(user);
  res.status(200);
});

export default router;
