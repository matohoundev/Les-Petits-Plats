"use strict";

import ApiServices from "./ApiServices/apiServices.js";
import filter from "./Dropdown/dropddown.js";
import recipesFactory from "./Factory/RecipesFactory.js";

(function init() {
  // new ApiServices().getAppliance();
  // new ApiServices().getIngredients();
  const AllRecipes = new ApiServices().getRecipes();

  Promise.all(AllRecipes)
    .then((AllRecipes) => {
      displayRecipes(AllRecipes);
    })
    .catch(() => {
      console.log("error Api");
    });
})();

function displayRecipes(recipes) {
  const listRecipes = document.querySelector("#box-recipes");
  const searchBar = document.querySelector("#search-bar");
  const chevron = document.querySelectorAll(".chevron");
  let boxTag = document.querySelector("#tag-select");
  let nothingResearch = document.querySelector("#nothing-in-research");

  const researchTag = {
    ingredient: [],
    appliance: "",
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
    listRecipes.replaceChildren();
    newListRecipes.forEach((newRecipe) => {
      const recipeModel = recipesFactory(newRecipe);
      const recipeCardDOM = recipeModel.getRecipesCardDOM();
      listRecipes.appendChild(recipeCardDOM);
    });
    if (newListRecipes.length === 0) {
      nothingResearch.style.display = "block";
    } else {
      nothingResearch.style.display = "none";
    }
  });

  for (let i = 0; i < chevron.length; i++) {
    chevron[i].addEventListener("click", (e) => {
      const chevronDOM = e.target;
      const labelDOM = e.target.parentNode.firstElementChild;
      const inputDOM = e.target.previousElementSibling;
      const listeDOM = e.target.parentNode.nextElementSibling;

      new filter().style(chevronDOM, labelDOM, listeDOM, inputDOM);
      new filter().displayAllTag(chevronDOM.id, listeDOM);
      new filter().inputSearchTag(chevronDOM.id, listeDOM, inputDOM);
      new filter().clickAddTag(
        chevronDOM.id,
        listeDOM,
        researchTag.ingredient,
        researchTag.appliance,
        researchTag.ustensil,
        function TagIngredients(ingredient) {
          researchTag.ingredient.push(ingredient);
          const newListRecipes = new ApiServices().searchRecipes(
            textInSearchBar,
            researchTag
          );
          new filter().styleAddTagIngredients(
            researchTag.ingredient,
            researchTag.appliance,
            researchTag.ustensil,
            ingredient,
            boxTag
          );
          listRecipes.replaceChildren();
          newListRecipes.forEach((newRecipe) => {
            const recipeModel = recipesFactory(newRecipe);
            const recipeCardDOM = recipeModel.getRecipesCardDOM();
            listRecipes.appendChild(recipeCardDOM);
          });
          if (newListRecipes.length === 0) {
            nothingResearch.style.display = "block";
          } else {
            nothingResearch.style.display = "none";
          }
        },
        function TagAppliance(appliance) {
          researchTag.appliance = appliance;
          const newListRecipes = new ApiServices().searchRecipes(
            textInSearchBar,
            researchTag
          );
          new filter().styleAddTagAppliance(
            researchTag.ingredient,
            researchTag.appliance,
            researchTag.ustensil,
            appliance,
            boxTag
          );
          listRecipes.replaceChildren();
          newListRecipes.forEach((newRecipe) => {
            const recipeModel = recipesFactory(newRecipe);
            const recipeCardDOM = recipeModel.getRecipesCardDOM();
            listRecipes.appendChild(recipeCardDOM);
          });
          if (newListRecipes.length === 0) {
            nothingResearch.style.display = "block";
          } else {
            nothingResearch.style.display = "none";
          }
        },
        function TagUstensils(ustensil) {
          researchTag.ustensil.push(ustensil);
          const newListRecipes = new ApiServices().searchRecipes(
            textInSearchBar,
            researchTag
          );
          new filter().styleAddTagUstensils(
            researchTag.ingredient,
            researchTag.appliance,
            researchTag.ustensil,
            ustensil,
            boxTag
          );
          listRecipes.replaceChildren();
          newListRecipes.forEach((newRecipe) => {
            const recipeModel = recipesFactory(newRecipe);
            const recipeCardDOM = recipeModel.getRecipesCardDOM();
            listRecipes.appendChild(recipeCardDOM);
          });
          if (newListRecipes.length === 0) {
            nothingResearch.style.display = "block";
          } else {
            nothingResearch.style.display = "none";
          }
        }
      );
    });
  }

  boxTag.addEventListener("click", (e) => {
    new filter().deleteTag(e, boxTag, researchTag);
    const updateListRecipes = new ApiServices().searchRecipes(
      textInSearchBar,
      researchTag
    );
    listRecipes.replaceChildren();
    updateListRecipes.forEach((newRecipe) => {
      const recipeModel = recipesFactory(newRecipe);
      const recipeCardDOM = recipeModel.getRecipesCardDOM();
      listRecipes.appendChild(recipeCardDOM);
    });
    if (updateListRecipes.length === 0) {
      nothingResearch.style.display = "block";
    } else {
      nothingResearch.style.display = "none";
    }
  });

  recipes.forEach((recipe) => {
    const recipeModel = recipesFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipesCardDOM();
    listRecipes.appendChild(recipeCardDOM);
  });
}
