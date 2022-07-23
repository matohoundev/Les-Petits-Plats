import { recipes } from "../../data/recipes.js";

export default class ApiServices {
  getRecipes() {
    return recipes;
  }

  searchRecipes(searchValue, tags) {
    let searchRecipes = recipes;
    let searchRecipesCopy = [];

    if (searchValue && searchValue.length > 2) {
      for (let i = 0; i < searchRecipes.length; i++) {
        if (
          searchRecipes[i].name
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          searchRecipes[i].description
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          searchRecipes[i].ingredients.some((i) =>
            i.ingredient.toLowerCase().includes(searchValue.toLowerCase())
          )
        ) {
          searchRecipesCopy.push(searchRecipes[i]);
        }
      }
      searchRecipes = searchRecipesCopy;
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
      for (let j = 0; j < recipes[i].ingredients.length; j++) {
        if (!ingredients.includes(recipes[i].ingredients[j].ingredient)) {
          ingredients.push(recipes[i].ingredients[j].ingredient);
        }
      }
    }

    ingredients.sort();

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
