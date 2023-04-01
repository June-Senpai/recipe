import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export const Home = ({ userID }) => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  // console.log({ cookies });
  // console.log(userID);
  console.log({ recipes });
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}recipes`
        );
        setRecipes(response.data);
        // console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        // console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (userID) {
      fetchSavedRecipe();
    }
    fetchRecipe();
  }, []);
  // console.log(recipes);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}recipes`,
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      // console.log(response);
      setSavedRecipes(response.data.savedRecipes); //for not reloading page
    } catch (err) {
      console.error(err);
    }
  };
  // console.log({ recipes, savedRecipes });
  console.log({ cookies });
  const isRecipeSaved =
    Object.keys(cookies)?.length > 0 && cookies?.access_token?.length > 0
      ? (id) => savedRecipes.includes(id)
      : () => false;
  return (
    <div>
      <h1>Recipes</h1>
      <div className="recipe">
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              {/* {savedRecipes.includes(recipe._id) && <h1>Already saved</h1>} */}
              <div>
                <h2>{recipe.name}</h2>
              </div>

              {Object.keys(cookies)?.length > 0 &&
              cookies?.access_token?.length ? (
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              ) : null}

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
