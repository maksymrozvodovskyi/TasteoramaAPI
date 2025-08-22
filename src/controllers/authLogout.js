import { logoutUser } from '../services/authLogout.js';

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');

  res.status(200).send({ message: 'Logged out successfully' });
};
