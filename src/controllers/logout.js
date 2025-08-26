import { logoutUser } from '../services/logoutUser.js';

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');

  res.sendStatus(204);
};
