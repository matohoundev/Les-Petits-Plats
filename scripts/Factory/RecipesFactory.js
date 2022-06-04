export default function recipesFactory(data) {
  const { name, ingredients, time, description } = data;
  // console.log(ingredients);

  function getRecipesCardDOM() {
    const li = document.createElement("li");
    const background = document.createElement("div");
    const content = document.createElement("div");
    const contentNameIngredient = document.createElement("div");
    const h3Title = document.createElement("h3");
    const ulIngredients = document.createElement("ul");
    const divIngredientsAndDescrib = document.createElement("div");
    const spanIconAndTime = document.createElement("span");
    const iconTime = document.createElement("i");
    const bTime = document.createElement("b");
    const pDescription = document.createElement("p");

    li.setAttribute("class", "card rounded-md");
    background.setAttribute("class", "w-full h-48 card-firstBg");
    content.setAttribute("class", "p-5 h-56 card-secondBg");
    contentNameIngredient.setAttribute("class", "flex justify-between mb-2 ");
    h3Title.setAttribute("class", "text-lg w-9/12");
    spanIconAndTime.setAttribute("class", "w-3/12 text-right");
    h3Title.textContent = name;
    divIngredientsAndDescrib.setAttribute("class", "flex");
    iconTime.setAttribute("class", "far fa-clock");
    bTime.textContent = " " + time + " min";
    pDescription.setAttribute(
      "class",
      "w-1/2 max-h-24 text-xs text-ellipsis overflow-hidden ..."
    );
    pDescription.textContent = description;
    ulIngredients.setAttribute("class", "w-1/2");

    li.appendChild(background);
    li.appendChild(content);
    content.appendChild(contentNameIngredient);
    contentNameIngredient.appendChild(h3Title);
    contentNameIngredient.appendChild(spanIconAndTime);
    spanIconAndTime.appendChild(iconTime);
    spanIconAndTime.appendChild(bTime);

    ingredients.forEach((ingredient) =>
      ulIngredients.insertAdjacentHTML(
        "beforeend",
        `<li><b>` +
          ingredient.ingredient +
          ":  </b>" +
          (ingredient.quantity || ingredient.quantite || "") +
          " " +
          (ingredient.unit || "") +
          `</li>`
      )
    );

    content.appendChild(divIngredientsAndDescrib);
    divIngredientsAndDescrib.appendChild(ulIngredients);
    divIngredientsAndDescrib.appendChild(pDescription);
    return li;
  }
  return { getRecipesCardDOM };
}
