import { CategoriesCollection } from '../db/models/category.js';

export const getAllCategories = () => {
  return CategoriesCollection.find();
};
