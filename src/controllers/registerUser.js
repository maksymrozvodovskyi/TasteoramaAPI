import { registerUser } from '../services/registerUser.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'User created successfully',
    data: user,
  });
};
