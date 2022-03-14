import Router from 'express';
import Models from '../db/models';
import strftime from 'strftime';

const router = Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', strftime('%H:%M:%S'));
  console.log(router.stack);
  next();
});

router.route('/').get(async (req, res) => res.send('Welcome to testimonies'));

router.route('/create').post(async (req, res) => {
  const testimony = req.body.content;
  const author = req.body.author;
  const newTestimony = await new Models.Testimony({
    content: testimony,
    author: author,
  });
  newTestimony
    .save()
    .then(_ => res.status(201).json('201 Created'))
    .catch(err => res.status(400).json(`Error ${err}`));
});

router.route('/list').get(async (req, res) => {
  Models.Testimony.find()
    .then(testimonies => res.status(200).json(testimonies))
    .catch(err => res.status(500).json(err));
});

router.route('/edit/:id').put(async (req, res) => {
  const id = req.params.id;
  const testimony = req.body.content;
  Models.Testimony.findByIdAndUpdate(id, {
    content: testimony,
    last_edit: Date(),
  })
    .then(_ => res.send({ status: 204 }))
    .catch(err => res.send({ status: 400, error: err }));
});

router.route('/delete/:id').delete(async (req, res) => {
  Models.Testimony.findByIdAndDelete(req.params.id)
    .then(_ => res.status(204).json('Testimony deleted succesfully'))
    .catch(err => res.status(400).json(err));
});

export default router;
