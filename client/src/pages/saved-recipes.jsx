import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        // console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSavedRecipe();
  }, []);

  return (
    <div>
      <h1>Saved Recipes</h1>
      <div className="recipe">
        <ul>
          {savedRecipes.map((recipe) => (
            <li key={recipe._id}>
              {/* {savedRecipes.includes(recipe._id) && <h1>Already saved</h1>} */}
              <div>
                <h2>{recipe.name}</h2>
              </div>

              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div>
              <div className="ingredients">
                <h3>Ingredients</h3>
                <ul>
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                width="400px"
                height={400}
              />
              <p>Cooking Time :{recipe.cookingTime} (minutes) </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
