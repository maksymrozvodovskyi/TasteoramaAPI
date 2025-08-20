import { getAllCategories } from '../services/categories.js';

export const getCategoriesController = async (req, res) => {
  const categories = await getAllCategories();

  res.json({
    status: 200,
    message: 'Successfully found categories!',
    data: categories,
  });
};
