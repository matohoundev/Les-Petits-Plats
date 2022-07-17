import { recipes } from "../../data/recipes.js";

export default class ApiServices {
  getRecipes() {
    return recipes;
  }

  searchRecipes(searchValue, tags) {
    let searchRecipes = recipes;
    let RecupAppliance = [];
    let RecupIngredient = [];
    let RecupUstensil = [];

    if (searchValue && searchValue.length >= 3) {
      for (let i = 0; i < searchRecipes.length; i++) {
        if (
          !searchRecipes[i].name
            .toLowerCase()
            .includes(searchValue.toLowerCase()) &&
          !searchRecipes[i].description
            .toLowerCase()
            .includes(searchValue.toLowerCase()) &&
          !searchRecipes[i].ingredients.some((i) =>
            i.ingredient.toLowerCase().includes(searchValue.toLowerCase())
          )
        ) {
          searchRecipes.splice(i, 1);
          i--;
        }
      }
    }

    if (tags.appliance) {
      for (let i = 0; i < searchRecipes.length; i++) {
        if (searchRecipes[i].appliance.includes(tags.appliance)) {
          RecupAppliance.push(searchRecipes[i]);
        }
      }
      if (RecupAppliance.length > 0) {
        searchRecipes = RecupAppliance;
      }
    }
    if (tags.ingredient) {
      for (let i = 0; i < searchRecipes.length; i++) {
        for (let o = 0; o < searchRecipes[i].ingredients.length; o++) {
          if (
            searchRecipes[i].ingredients[o].ingredient.includes(tags.ingredient)
          ) {
            RecupIngredient.push(searchRecipes[i]);
          }
        }
      }

      if (tags.ingredient.length === 0) {
        RecupIngredient = [];
      }

      if (RecupIngredient.length > 0) {
        searchRecipes = RecupIngredient;
      }
    }
    if (tags.ustensil) {
      for (let i = 0; i < searchRecipes.length; i++) {
        for (let o = 0; o < searchRecipes[i].ustensils.length; o++) {
          if (searchRecipes[i].ustensils[o].includes(tags.ustensil)) {
            RecupUstensil.push(searchRecipes[i]);
          }
        }
      }
      if (tags.ustensil.length === 0) {
        RecupUstensil = [];
      }
      if (RecupUstensil.length > 0) {
        searchRecipes = RecupUstensil;
      }
    }

    return searchRecipes;
  }

  searchTag(textValue, allTags) {
    const TagList = [];

    for (let i = 0; i < allTags.length; i++) {
      const allTagsCopy = [];

      allTagsCopy.push(allTags[i].toLowerCase());

      if (allTagsCopy.find((el) => el.includes(textValue.toLowerCase()))) {
        TagList.push(allTags[i]);
      }
    }
    return TagList;
  }

  getIngredients() {
    const ingredients = [];

    for (let i = 0; i < recipes.length; i++) {
      // on ne récupère pas les doublons
      let RecupIngredients = [...recipes[i].ingredients];
      for (let o = 0; o < RecupIngredients.length; o++) {
        if (!ingredients.includes(RecupIngredients[o].ingredient)) {
          ingredients.push(RecupIngredients[o].ingredient);
        }
      }
    }

    ingredients.sort();

    // console.log("ingredient", ingredients);
    return ingredients;
  }

  getAppliance() {
    const appliance = [];

    for (let i = 0; i < recipes.length; i++) {
      // on ne récupère pas les doublons
      if (!appliance.includes(recipes[i].appliance)) {
        appliance.push(recipes[i].appliance);
      }
    }

    appliance.sort();

    return appliance;
  }

  getUstensils() {
    const ustensils = [];

    for (let i = 0; i < recipes.length; i++) {
      // on ne récupère pas les doublons
      for (let o = 0; o < recipes[i].ustensils.length; o++) {
        if (!ustensils.includes(recipes[i].ustensils[o])) {
          ustensils.push(recipes[i].ustensils[o]);
        }
      }
    }

    ustensils.sort();

    return ustensils;
  }
}
