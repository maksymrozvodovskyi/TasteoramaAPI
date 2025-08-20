import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (typeof authorization !== 'string') {
    throw createHttpError(401, 'Please provide Authorization header');
  }

  const [bearer, accessToken] = authorization.split(' ', 2);

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    throw createHttpError(401, 'Auth header should be of type Bearer');
  }

  const session = await SessionsCollection.findOne({ accessToken });

  if (session === null) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.accessTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await UserCollection.findById(session.userId);

  if (user === null) {
    throw createHttpError(401, 'User not found');
  }

  req.user = user;

  next();
};
