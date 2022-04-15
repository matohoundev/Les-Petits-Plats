import { recipes } from "../../data/recipes.js";

export default class ApiServices {
  getRecipes() {
    for (let i = 0; i < recipes.length; i++) {
      const element = recipes[i];
      console.log(element);
    }
  }

  getIngredients() {
    const ingredients = [];

    for (let i = 0; i < recipes.length; i++) {
      const element = recipes[i].ingredients;
      ingredients.push(element);
    }

    console.log("ingredient", ingredients);
  }

  getAppliance() {
    const appliance = [];

    for (let i = 0; i < recipes.length; i++) {
      const element = recipes[i].appliance;
      appliance.push(element);
    }

    console.log("appliance", appliance);
  }

  getUstensils() {
    for (let i = 0; i < recipes.length; i++) {
      const element = recipes[i].appliance;
      console.log(element);
    }
  }
}
