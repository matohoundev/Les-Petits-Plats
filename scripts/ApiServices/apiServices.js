import { recipes } from "../../data/recipes.js";

export default class ApiServices {
  getRecipes() {
    return recipes;
  }

  searchRecipes(searchValue, tags) {
    let searchRecipes = recipes;

    if (searchValue && searchValue.length > 2) {
      searchRecipes = recipes.filter(
        (r) =>
          r.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          r.description.toLowerCase().includes(searchValue.toLowerCase()) ||
          r.ingredients.some((i) =>
            i.ingredient.toLowerCase().includes(searchValue.toLowerCase())
          )
      );
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

    allTags.forEach((tag) => {
      if (tag.toLowerCase().includes(textValue.toLowerCase())) {
        TagList.push(tag);
      }
    });

    return TagList;
  }

  getIngredients() {
    const ingredients = [];

    recipes.forEach((r) =>
      r.ingredients.forEach(
        (i) =>
          !ingredients.includes(i.ingredient) && ingredients.push(i.ingredient)
      )
    );

    ingredients.sort();

    return ingredients;
  }

  getAppliance() {
    const appliance = [];

    recipes.forEach(
      (r) => !appliance.includes(r.appliance) && appliance.push(r.appliance)
    );

    appliance.sort();

    return appliance;
  }

  getUstensils() {
    const ustensils = [];

    recipes.forEach((r) =>
      r.ustensils.forEach((i) => !ustensils.includes(i) && ustensils.push(i))
    );

    ustensils.sort();

    return ustensils;
  }
}
