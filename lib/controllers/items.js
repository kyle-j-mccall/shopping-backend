const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Item = require('../models/Item');

module.exports = Router()
  .get('/', [authenticate], async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);
      res.json(items);
    } catch (e) {
      next(e);
    }
  })
  .post('/', [authenticate], async (req, res, next) => {
    try {
      const item = await Item.insert({ ...req.body, user_id: req.user.id });
      res.json(item);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const updatedItem = await Item.updateById(req.params.id, req.body);
      if (!updatedItem) next();
      res.json(updatedItem);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const deleted = await Item.delete(req.params.id);
      if (!deleted) next();
      res.status(200);
      res.send();
    } catch (e) {
      next(e);
    }
  });

// TO DO - implement items CRUD
