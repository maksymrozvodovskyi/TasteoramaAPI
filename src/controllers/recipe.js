import { searchRecipesService } from "../services/recipe.js";

export const searchRecipes = async (req, res) => {
    try {
        const result = await searchRecipesService(req.query);
        res.json(result);
    } catch(error) {
        res.status(500).json({ message: 'Server error', error});
    }
};