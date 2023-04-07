import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import image from "../public/kOnzy.gif";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
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

  const handleDelete = async (id) => {
    // console.log({ token: cookies.access_token });
    try {
      await axios.post(
        // `${import.meta.env.VITE_BACKEND_URL}recipes/delete`,
        "http://localhost:4001/recipes/delete",
        {
          id: userID,
          recipeID: id,
        },

        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(savedRecipes.filter((recipe) => recipe._id !== id));
    } catch {}
  };
  if (Object.keys(savedRecipes)?.length < 1) {
    return (
      <div className="loading-container">
        <img src={image} width={100} />
      </div>
    );
  }
  return (
    <div className="saved-recipes">
      <h1>Saved Recipes</h1>
      <div className="recipe">
        <ul>
          {savedRecipes.map((recipe) => (
            <li key={recipe._id}>
              {/* {savedRecipes.includes(recipe._id) && <h1>Already saved</h1>} */}
              <div>
                <h2>{recipe.name}</h2>
              </div>
              {/* <button onClick={() => handleDelete(recipe._id)}>Delete</button> */}
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
