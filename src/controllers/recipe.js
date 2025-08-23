import createHttpError from 'http-errors';
import { searchRecipesService } from '../services/recipe.js';
import { parseNumber } from '../utils/parsePaginationParams.js';

export const handleSearchRecipes = async (req, res) => {
  try {
    const { category, ingredients, title } = req.query;
    const page = parseNumber(req.query.page, 1);
    const perPage = parseNumber(req.query.perPage, 12);
    const skip = (page - 1) * perPage;

    const { totalResults, recipes } = await searchRecipesService({
      category,
      ingredients,
      title,
      skip,
      limit: 12,
    });

    const totalPages = Math.ceil(totalResults / perPage);

    res.status(200).json({
      status: 200,
      message: 'Successfully found recipes',
      data: {
        recipes,
        page,
        perPage,
        totalResults,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    throw createHttpError(500, 'Server error');
  }
};
