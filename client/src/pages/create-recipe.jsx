import axios from "axios";
import React, { useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const [cookie, _] = useCookies("access_token");

  const progressStyle = {
    background: "linear-gradient(to right, #ff6c37, #ff9066)",
  };
  function handleClick() {
    addIngredient();
    notify("Ingredient added");
  }
  const CustomToast = ({ closeToast }) => (
    <div>
      <img
        src="https://i.pinimg.com/originals/4e/c7/ef/4ec7ef50e48e82976f8b32796af65e45.png"
        alt="Icon"
      />{" "}
      Ingredient added!
      <button onClick={closeToast}>Close</button>
    </div>
  );

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    setRecipe({ ...recipe, [name]: value });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };
  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const notify = (message) => {
    toast(message);
  };

  console.log({ cookie });
  const onSubmit = async (event) => {
    // console.log(recipe);
    event.preventDefault();
    notify("Recipe Created");
    try {
      await axios.post("http://localhost:3001/recipes", recipe, {
        headers: { Authorization: cookie.access_token },
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
      // alert("recipe created");
      // console.log(recipe);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="create-recipe ">
      <form onSubmit={onSubmit}>
        <h2 id="logo">Create Recipe</h2>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, idx)}
          />
        ))}
        {/* wait for it */}
        <button onClick={handleClick} type="button">
          Add Ingredient
        </button>
        <label htmlFor="instructions">Instruction</label>
        <textarea
          name="instructions"
          id="instructions"
          cols="30"
          rows="5"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Paste ImageUrl </label>
        <input
          className="imageUrl"
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />
        {/* <>Or Upload from your file</> */}
        {/* <input
          accept="image/png,image/jpg"
          type="file"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        /> */}
        <div className="display-image"></div>
        <label htmlFor="cookingTime">Cooking Time (in minuties)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />
        <button type="submit" className="formSubmit">
          Create Recipe
        </button>
      </form>
      <ToastContainer
        position="bottom-right"
        pauseOnHover={false}
        progressStyle={progressStyle}
      />
    </div>
  );
};
