import { recipes } from "../../data/recipes.js";

export default class ApiServices {
  getRecipes() {
    return recipes;
  }

  searchRecipes(searchValue, tags) {
    let searchRecipes = recipes;
    let searchRecipesCopy = [...recipes];
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
      searchRecipes = searchRecipes.filter((r) =>
        r.appliance.includes(tags.appliance)
      );
    }
    if (tags.ingredient) {
      searchRecipes = searchRecipes.filter((r) =>
        tags.ingredient.every((i) =>
          r.ingredients.some((ing) => ing.ingredient.includes(i))
        )
      );
    }
    if (tags.ustensil) {
      searchRecipes = searchRecipes.filter((r) =>
        tags.ustensil.every((i) => r.ustensils.some((ing) => ing.includes(i)))
      );
    }

    // if (searchRecipes.length === 0) {
    //   searchRecipesCopy = recipes;
    // }

    console.log(searchRecipesCopy);

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
