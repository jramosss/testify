import Router from 'express';
import Models from '../db/models';
import UserUtils from '../src/users';

const router = Router();
const userUtils = new UserUtils();

router.route('/').get(async (req, res) => {
  Models.User.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
});

router.route('/register').post(async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = Models.User.find().where('username').equals(username);
  if (userExists) {
    res.status(400).json('Username already registered');
    return;
  }
  const newUser = await userUtils.register(username, password);
  newUser
    .save()
    .then(_ => res.status(201).json('201 Created'))
    .catch(err => res.status(400).json(`Error ${err}`));
});

router.route('delete').delete(async (req, res) => {
  const username = req.body.username;
  const user = Models.User.find().where('username').equals(username);
  if (!user) {
    res.status(400).json('Username already registered');
    return;
  }
  console.log(user);
});

router.route('test').get(async (req, res) => {
  const username = req.body.username;
  const user = Models.User.find().where('username').equals(username);
  console.log(user);
});

export default router;
