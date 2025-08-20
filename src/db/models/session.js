import { model, Schema } from 'mongoose';

const sessionsShema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    accessToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const SessionsCollection = model('sessions', sessionsShema);
