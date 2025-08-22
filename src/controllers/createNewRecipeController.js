import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { createNewRecipe } from '../services/createNewRecipe.js';


export const createNewRecipeController = async (req, res, next) => {
    const photo = req.file;
    let photoUrl;
    if (photo) {
        photoUrl = await saveFileToCloudinary(photo);
    };
    const recipe = await createNewRecipe({...req.body, owner: req.user._id, thumb: photoUrl});
    res.status(201).json({
        status: 201,
        message: "Successfully created a recipe!",
        data: recipe,
    });
};
