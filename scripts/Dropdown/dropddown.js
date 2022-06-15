import ApiServices from "../ApiServices/apiServices.js";

let toggleIndex;

export default class filter {
  style(chevronDOM, labelDOM, listeDOM, inputDOM) {
    if (!toggleIndex) {
      chevronDOM.style.transform = "rotate(180deg)";
      labelDOM.parentNode.firstElementChild.classList.add("hidden");
      inputDOM.classList.remove("hidden");
      listeDOM.classList.remove("hidden");
      toggleIndex = true;
    } else {
      chevronDOM.style.transform = "rotate(0deg)";
      labelDOM.parentNode.firstElementChild.classList.remove("hidden");
      inputDOM.classList.add("hidden");
      listeDOM.classList.add("hidden");
      toggleIndex = false;
    }
  }

  displayAllTag(tag, liste, input) {
    let allIngredients;
    let allAppliance;
    let allUstensils;

    if (tag === "ingredient-chevron") {
      liste.replaceChildren();
      allIngredients = new ApiServices().getIngredients();
      allIngredients.forEach((ingredient) =>
        liste.insertAdjacentHTML(
          "beforeend",
          `<li class="py-1.5">` + ingredient + `</li>`
        )
      );
    } else if (tag === "appliance-chevron") {
      liste.replaceChildren();
      allAppliance = new ApiServices().getAppliance();
      allAppliance.forEach((ingredient) =>
        liste.insertAdjacentHTML(
          "beforeend",
          `<li class="py-1.5">` + ingredient + `</li>`
        )
      );
    } else if (tag === "ustensil-chevron") {
      liste.replaceChildren();
      allUstensils = new ApiServices().getUstensils();
      allUstensils.forEach((ingredient) =>
        liste.insertAdjacentHTML(
          "beforeend",
          `<li class="py-1.5">` + ingredient + `</li>`
        )
      );
    } else {
      return;
    }
  }

  inputSearchTag(tag, liste, input) {
    let allIngredients;
    let allAppliance;
    let allUstensils;

    if (tag === "ingredient-chevron") {
      allIngredients = new ApiServices().getIngredients();
      input.addEventListener("input", (e) => {
        const newListeIngredients = new ApiServices().searchTag(
          e.target.value,
          allIngredients
        );
        if (e.target.value.length > 0) {
          liste.replaceChildren();
          newListeIngredients.forEach((ingredient) =>
            liste.insertAdjacentHTML(
              "beforeend",
              `<li class="py-1.5">` + ingredient + `</li>`
            )
          );
        } else {
          this.displayAllTag(tag, liste, input);
        }
      });
    } else if (tag === "appliance-chevron") {
      allAppliance = new ApiServices().getAppliance();
      input.addEventListener("input", (e) => {
        const newListeAppliance = new ApiServices().searchTag(
          e.target.value,
          allAppliance
        );
        if (e.target.value.length > 0) {
          liste.replaceChildren();
          newListeAppliance.forEach((appliance) =>
            liste.insertAdjacentHTML(
              "beforeend",
              `<li class="py-1.5">` + appliance + `</li>`
            )
          );
        } else {
          this.displayAllTag(tag, liste, input);
        }
      });
    } else if (tag === "ustensil-chevron") {
      allUstensils = new ApiServices().getUstensils();
      input.addEventListener("input", (e) => {
        const newListeUstensils = new ApiServices().searchTag(
          e.target.value,
          allUstensils
        );
        if (e.target.value.length > 0) {
          liste.replaceChildren();
          newListeUstensils.forEach((ustensil) =>
            liste.insertAdjacentHTML(
              "beforeend",
              `<li class="py-1.5">` + ustensil + `</li>`
            )
          );
        } else {
          this.displayAllTag(tag, liste, input);
        }
      });
    } else {
      return;
    }
  }

  clickAddTag(
    tag,
    liste,
    onClickTagIngredient,
    onClickTagAppliance,
    onClickTagUstensils
  ) {
    let allIngredients;
    let allAppliance;
    let allUstensils;

    let clickTagIngredient = [];
    let clickTagAppliance = [];
    let clickTagUstensils = [];

    if (tag === "ingredient-chevron") {
      allIngredients = new ApiServices().getIngredients();
      liste.addEventListener("click", (e) => {
        clickTagIngredient.push(e.target.textContent);
        onClickTagIngredient(clickTagIngredient);
      });
    } else if (tag === "appliance-chevron") {
      allAppliance = new ApiServices().getAppliance();
      liste.addEventListener("click", (e) => {
        clickTagAppliance.push(e.target.textContent);
        onClickTagAppliance(clickTagAppliance);
      });
    } else if (tag === "ustensil-chevron") {
      allUstensils = new ApiServices().getUstensils();
      liste.addEventListener("click", (e) => {
        clickTagUstensils.push(e.target.textContent);
        onClickTagUstensils(clickTagUstensils);
      });
    }
  }

  styleAddTag(researchTag) {
    let boxTag = document.querySelector("#tag-select");

    if (
      researchTag.ingredient.length === 0 &&
      researchTag.appliance.length === 0 &&
      researchTag.ustensil.length === 0
    ) {
      boxTag.classList.remove("mt-5");
    } else {
      boxTag.classList.add("mt-5");
    }

    if (researchTag.ingredient.length > 0) {
      for (let i = 0; i < researchTag.ingredient.length; i++) {
        boxTag.insertAdjacentHTML(
          "beforeend",
          `<span class="tag tag-ingredient">` +
            researchTag.ingredient[i] +
            `<i class="fas fa-times border-2 rounded-xl pr-1 pl-1"></i
          ></span>`
        );
      }
    }
    if (researchTag.appliance.length > 0) {
      for (let i = 0; i < researchTag.appliance.length; i++) {
        boxTag.insertAdjacentHTML(
          "beforeend",
          `<span class="tag tag-appliance">` +
            researchTag.appliance[i] +
            `<i class="fas fa-times border-2 rounded-xl pr-1 pl-1"></i
          ></span>`
        );
      }
    }
    if (researchTag.ustensil.length > 0) {
      for (let i = 0; i < researchTag.ustensil.length; i++) {
        boxTag.insertAdjacentHTML(
          "beforeend",
          `<span class="tag tag-ustensil">` +
            researchTag.ustensil[i] +
            `<i class="fas fa-times border-2 rounded-xl pr-1 pl-1"></i
          ></span>`
        );
      }
    }
  }

  // deleteTag() {

  // }
}
