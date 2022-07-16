"use strict";

import ApiServices from "./ApiServices/apiServices.js";
import filter from "./Dropdown/dropddown.js";
import recipesFactory from "./Factory/RecipesFactory.js";

(function init() {
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

  // on récupère les tags
  const researchTag = {
    ingredient: [],
    appliance: "",
    ustensil: [],
  };

  let textInSearchBar;

  // recherche dans la barre de recherche
  searchBar.addEventListener("input", (e) => {
    textInSearchBar = e.target.value;
    const newListRecipes = new ApiServices().searchRecipes(
      textInSearchBar,
      researchTag
    );
    reDisplayRecipes(newListRecipes);
  });

  // recherche dans les tags
  chevron.forEach((chevronDOM) => {
    chevronDOM.addEventListener("click", (e) => {
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
          reDisplayRecipes(newListRecipes);
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
          reDisplayRecipes(newListRecipes);
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
          reDisplayRecipes(newListRecipes);
        }
      );
    });
  });

  // supprimer un tag
  boxTag.addEventListener("click", (e) => {
    new filter().deleteTag(e, boxTag, researchTag);
    const updateListRecipes = new ApiServices().searchRecipes(
      textInSearchBar,
      researchTag
    );
    reDisplayRecipes(updateListRecipes);
  });

  // ré-afficher les recettes si on ajoute un tag et qu'on recherche ou qu'on supprime un tag ou du texte dans la barre de recherche
  function reDisplayRecipes(newListRecipes) {
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

  // afficher toutes les recettes par défaut
  recipes.forEach((recipe) => {
    const recipeModel = recipesFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipesCardDOM();
    listRecipes.appendChild(recipeCardDOM);
  });
}
