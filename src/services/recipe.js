import { RecipesCollection } from "../db/models/recipe.js";
import { IngredientsCollection } from "../db/models/ingredient.js";
import { CategoriesCollection } from "../db/models/category.js";
import mongoose from "mongoose";

export const searchRecipesService = async ({ category, ingredients, title, page = 1}) => {
    const limit = 12;
    const currentPage = Math.max(Number(page) || 1, 1);
    const skip = (currentPage - 1) * limit;

    const recipeFilter = {};

    if (category) {
        const catDoc = await CategoriesCollection.findOne({
            name: new RegExp(`${category}$`, 'i'),
        });
        if (catDoc) recipeFilter.category = catDoc._id;
    }


    if (ingredients) {
        const ingArray = ingredients.split(',').map((i) => i.trim());
        const ingIdsFromQuery = ingArray.filter((i) => mongoose.isValidObjectId(i));
        const ingNamesFromQuery = ingArray.filter((i) => !mongoose.isValidObjectId(i));

        let ingDocs = [];
        if (ingNamesFromQuery.length > 0) {
            ingDocs = await IngredientsCollection.find({
                name: { $in: ingNamesFromQuery.map((i) => new RegExp( i, 'i'))},
            });
        }

        const ingIds = [
            ...ingIdsFromQuery.map((id) => mongoose.Types.ObjectId(id)),
            ...ingDocs.map((i) => i._id),
        ];

        if (ingIds.length > 0) {
            recipeFilter['ingredients.id'] = { $in: ingIds };
        }
    }

    if (title) {
        recipeFilter.title = { $regex: title.trim(), $options: 'i'};

    }
    const total = await RecipesCollection.countDocuments(recipeFilter);
    const recipes = await RecipesCollection.find(recipeFilter)
      .skip(skip)
      .limit(limit)
      .populate("category", "name")
      .populate("ingredients.id", "name");

      return {
        page: currentPage,
        limit,
        totalPages: Math.ceil(total / limit),
        totalResults: total,
        recipes,
      };
};