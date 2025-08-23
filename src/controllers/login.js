import createHttpError from 'http-errors';
import { loginUser } from '../services/authLogin.js';

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const session = await loginUser(email, password);

  if (!session) {
    throw createHttpError(401, 'Unauthorized');
  }

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(session.accessTokenValidUntil),
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
