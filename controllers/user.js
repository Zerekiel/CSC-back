// utils
const makeValidation = require('@withvoid/make-validation');
// models
const UserModel = require('../models/User.js');

module.exports = {
  onGetAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
  onGetUserById: async (req, res) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
  onCreateUser: async (req, res) => {
    try {
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          firstName: { type: types.string },
          lastName: { type: types.string },
          type: { type: types.enum, options: { enum: ['consumer', 'support'] } },
        },
      }));

      if (!validation.success) return res.status(400).json(validation);

      const { firstName, lastName, type } = req.body;
      const user = await UserModel.createUser(firstName, lastName, type);
      return res.status(201).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
  onDeleteUserById: async (req, res) => {
    try {
      const user = await UserModel.deleteByUserById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted a count of ${user.deletedCount} user.`,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
};
