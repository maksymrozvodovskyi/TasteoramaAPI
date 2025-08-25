import bcrypt from 'bcryptjs';
import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';

export const loginUser = async (email, password) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');

  const accessTokenValidUntil = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const session = await SessionsCollection.create({
    userId: user._id,
    accessToken,
    accessTokenValidUntil,
  });

  return session;
};
