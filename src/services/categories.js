import { CategoriesCollection } from '../db/models/category.js';

export const getAllCategories = async () => {
  return await CategoriesCollection.find();
};
