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
  const researchTag = {
    ingredient: [],
    appliance: [],
    ustensil: [],
  };

  // let newListRecipes;
  let textInSearchBar;

  searchBar.addEventListener("input", (e) => {
    textInSearchBar = e.target.value;
    const newListRecipes = new ApiServices().searchRecipes(
      textInSearchBar,
      researchTag
    );
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
      const chevronDOM = e.target;
      const labelDOM = e.target.parentNode.firstElementChild;
      const inputDOM = e.target.previousElementSibling;
      const listeDOM = e.target.parentNode.nextElementSibling;

      new filter().style(chevronDOM, labelDOM, listeDOM, inputDOM);
      new filter().displayAllTag(chevronDOM.id, listeDOM, inputDOM);
      new filter().inputSearchTag(chevronDOM.id, listeDOM, inputDOM);
      new filter().clickAddTag(
        chevronDOM.id,
        listeDOM,
        function TagIngredients(ingredient) {
          // console.log("ingredient", ingredient);
          researchTag.ingredient.push(...ingredient);
          const newListRecipes = new ApiServices().searchTagsForDisplayRecipes(
            textInSearchBar,
            researchTag
          );
          listRecipes.replaceChildren();
          newListRecipes.forEach((newRecipe) => {
            const recipeModel = recipesFactory(newRecipe);
            const recipeCardDOM = recipeModel.getRecipesCardDOM();
            listRecipes.appendChild(recipeCardDOM);
          });
        },
        function TagAppliance(appliance) {
          // console.log("appliance", appliance);
          researchTag.appliance.push(...appliance);
        },
        function TagUstensils(ustensil) {
          // console.log("ustensil", ustensil);
          researchTag.ustensil.push(...ustensil);
        }
      );
      new filter().styleAddTag(researchTag);

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
