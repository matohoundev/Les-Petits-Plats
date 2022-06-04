import { recipes } from "../../data/recipes.js";

export default class ApiServices {
  getRecipes() {
    const allRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
      allRecipes.push(recipes[i]);
    }

    return allRecipes;
  }

  searchRecipes(value) {
    const allRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
      const allTextInRecipe = [];
      // allRecipes.push(recipes[i]);
      // console.log(recipes[i]);
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

    console.log("ingredient", ingredients);
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

    console.log("appliance", appliance);
    return appliance;
  }

  getUstensils() {
    const ustensils = [];

    for (let i = 0; i < recipes.length; i++) {
      // on ne récupère pas les doublons
      if (!ustensils.includes(...recipes[i].ustensils)) {
        ustensils.push(...recipes[i].ustensils);
      }
    }

    console.log("ustensils", ustensils);
    return ustensils;
  }
}
