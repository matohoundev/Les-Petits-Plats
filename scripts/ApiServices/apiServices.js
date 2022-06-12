import { recipes } from "../../data/recipes.js";

export default class ApiServices {
  getRecipes() {
    const allRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
      allRecipes.push(recipes[i]);
    }

    return allRecipes;
  }

  searchRecipes(value, tag) {
    const allRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
      const allTextInRecipe = [];

      allTextInRecipe.push(recipes[i].name.toLowerCase());
      allTextInRecipe.push(recipes[i].description.toLowerCase());
      // faire les ingredients
      for (let o = 0; o < recipes[i].ingredients.length; o++) {
        allTextInRecipe.push(
          recipes[i].ingredients[o].ingredient.toLowerCase()
        );
      }

      if (allTextInRecipe.find((el) => el.includes(value.toLowerCase()))) {
        allRecipes.push(recipes[i]);
      }
    }

    return allRecipes;
  }

  searchTagsForDisplayRecipes(value, tag) {
    const allRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
      const allIngredients = [];

      // faire les ingredients
      for (let o = 0; o < recipes[i].ingredients.length; o++) {
        allIngredients.push(recipes[i].ingredients[o].ingredient);
      }

      if (allIngredients.find((el) => el.includes(tag.ingredient))) {
        allRecipes.push(recipes[i]);
      }
    }

    return allRecipes;
  }

  getIngredients() {
    const ingredients = [];

    for (let i = 0; i < recipes.length; i++) {
      // on ne récupère pas les doublons
      let allIngredients = [...recipes[i].ingredients];
      for (let o = 0; o < allIngredients.length; o++) {
        if (!ingredients.includes(allIngredients[o].ingredient)) {
          ingredients.push(allIngredients[o].ingredient);
        }
      }
    }

    ingredients.sort();

    // console.log("ingredient", ingredients);
    return ingredients;
  }

  searchTag(value, allIngredients) {
    const TagIngredients = [];

    for (let i = 0; i < allIngredients.length; i++) {
      const allIngredientsCopy = [];

      allIngredientsCopy.push(allIngredients[i].toLowerCase());

      if (allIngredientsCopy.find((el) => el.includes(value.toLowerCase()))) {
        TagIngredients.push(allIngredients[i]);
      }
    }
    return TagIngredients;
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
