"use strict";

import ApiServices from "./ApiServices/apiServices.js";
import filter from "./Dropdown/dropddown.js";
import recipesFactory from "./Factory/RecipesFactory.js";
// import { recipesFactory } from "./Factory/RecipesFactory.js";

(function init() {
  // new ApiServices().getAppliance();
  // new ApiServices().getIngredients();
  const AllRecipes = new ApiServices().getRecipes();

  // displayRecipes(AllRecipes);

  Promise.all(AllRecipes)
    .then((AllRecipes) => {
      displayRecipes(AllRecipes);
    })
    .catch(() => {
      console.log("error Api");
    });
})();

// display recipes CHECK

// factory template CHECK

// search

function displayRecipes(recipes) {
  const listRecipes = document.querySelector("#box-recipes");
  const searchBar = document.querySelector("#search-bar");
  const chevron = document.querySelectorAll(".chevron");

  searchBar.addEventListener("input", (e) => {
    const newListRecipes = new ApiServices().searchRecipes(e.target.value);
    if (e.target.value.length > 3) {
      listRecipes.replaceChildren();
      newListRecipes.forEach((newRecipe) => {
        const recipeModel = recipesFactory(newRecipe);
        const recipeCardDOM = recipeModel.getRecipesCardDOM();
        listRecipes.appendChild(recipeCardDOM);
      });
    } else {
      recipes.forEach((recipe) => {
        const recipeModel = recipesFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipesCardDOM();
        listRecipes.appendChild(recipeCardDOM);
      });
    }
  });

  for (let i = 0; i < chevron.length; i++) {
    chevron[i].addEventListener("click", (e) => {
      new filter().init(e);

      // newListRecipes.forEach((newRecipe) => {
      //   const recipeModel = recipesFactory(newRecipe);
      //   const recipeCardDOM = recipeModel.getRecipesCardDOM();
      //   listRecipes.appendChild(recipeCardDOM);
      // });
    });
  }

  recipes.forEach((recipe) => {
    const recipeModel = recipesFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipesCardDOM();
    listRecipes.appendChild(recipeCardDOM);
  });
}
