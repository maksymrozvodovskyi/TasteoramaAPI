import { SessionsCollection } from "../db/models/session.js";

export const logoutUser = async (sessionId) => {
    await SessionsCollection.deleteOne({ _id: sessionId });
};