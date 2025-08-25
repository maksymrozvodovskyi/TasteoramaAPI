// services/searchRecipesService.js
import { RecipesCollection } from '../db/models/recipe.js';
import { IngredientsCollection } from '../db/models/ingredient.js';

export const searchRecipesService = async ({
  category,
  ingredients,
  title,
  skip = 0,
  limit = 12,
}) => {
  const filter = {};

  if (category) {
    filter.category = { $regex: category, $options: 'i' };
  }

  if (ingredients) {
    const ingArray = ingredients.split(',').map((i) => i.trim());

    const ingDocs = await IngredientsCollection.find({
      name: { $in: ingArray.map((i) => new RegExp(i, 'i')) },
    });

    console.log('Found ingredients:', ingDocs);

    if (ingDocs.length > 0) {
      const ingIds = ingDocs.map((i) => i._id);
      console.log('Ingredient IDs for filter:', ingIds);

      filter['ingredients.id'] = { $in: ingIds };
    } else {
      console.log('No ingredients matched');
      return { totalResults: 0, recipes: [] };
    }
  }

  if (title) {
    filter.title = { $regex: title, $options: 'i' };
  }

  const totalResults = await RecipesCollection.countDocuments(filter);

  const recipes = await RecipesCollection.find(filter)
    .skip(skip)
    .limit(limit)
    .populate('ingredients.id');

  console.log('Final filter:', filter);

  return { totalResults, recipes };
};
