import express from 'express';
import Task from '../models/model.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});


router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.archived)  filter.isArchived  = req.query.archived === 'true';
  if (req.query.completed) filter.isCompleted = req.query.completed === 'true';
  res.json(await Task.find(filter).sort('-createdAt'));
});


router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

router.patch('/:id/toggle-complete', async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.isCompleted = !task.isCompleted;
  await task.save();
  res.json(task);
});

router.patch('/:id/toggle-important', async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.isImportant = !task.isImportant;
  await task.save();
  res.json(task);
});

router.patch('/:id/archive', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { isArchived: true }, { new: true });
  res.json(task);
});

router.patch('/:id/unarchive', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, { isArchived: false }, { new: true });
    res.json(task);
    }   
);

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
