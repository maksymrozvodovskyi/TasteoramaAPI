import createHttpError from 'http-errors';
import { getRecipeById } from '../services/recipes';

export const getRecipeByIdController = async (req, res, next) => {
    const { id } = req.params;
    const recipe = await getRecipeById(id);

    if (!recipe) {
        throw createHttpError(404, 'Recipe not found');
    }

    res.status(200).json({
        status: 200,
        message: 'Successfully found recipe!',
        data: recipe,
    })
}