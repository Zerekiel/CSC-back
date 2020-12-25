const express = require('express');
const users = require('../controllers/user.js');

const router = express.Router();

/* GET users listing. */
router.get('/', users.onGetAllUsers)
  .post('/', users.onCreateUser)
  .get('/:id', users.onGetUserById)
  .delete('/:id', users.onDeleteUserById);

// .get('/', (req, res) => {
//   res.send('respond with a resource');
// })
module.exports = router;
