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

router.route('/get/:id').get(async (req, res) => {
  Models.User.findById(req.params.id)
    .then(user => res.status(200).send(user))
    .catch(err => res.status(404).json(err));
});

router.route('/delete/:id').delete(async (req, res) => {
  Models.User.findByIdAndDelete(req.params.id)
    .then(_ => res.status(204).json('User deleted succesfully'))
    .catch(err => res.status(400).json(err));
});

router.route('/update/:id').put(async (req, res) => {
  console.log(`body: ${req.body}`);
  Models.User.findByIdAndUpdate(req.params.id, req.body)
    .then(_ => res.send({ status: 204 }))
    .catch(err => res.send({ status: 400, error: err }));
});

export default router;
