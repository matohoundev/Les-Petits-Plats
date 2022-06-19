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
    researchTagIngredients,
    researchTagAppliance,
    researchTagUstensils,
    onClickTagIngredient,
    onClickTagAppliance,
    onClickTagUstensils
  ) {
    let allIngredients;
    let allAppliance;
    let allUstensils;

    if (tag === "ingredient-chevron") {
      allIngredients = new ApiServices().getIngredients();
      liste.addEventListener("click", (e) => {
        if (!researchTagIngredients.includes(e.target.textContent)) {
          onClickTagIngredient(e.target.textContent);
        }
      });
    } else if (tag === "appliance-chevron") {
      allAppliance = new ApiServices().getAppliance();
      liste.addEventListener("click", (e) => {
        onClickTagAppliance(e.target.textContent);
      });
    } else if (tag === "ustensil-chevron") {
      allUstensils = new ApiServices().getUstensils();
      liste.addEventListener("click", (e) => {
        onClickTagUstensils(e.target.textContent);
      });
    }
  }

  styleAddTag(
    researchTagIngredients,
    researchTagAppliance,
    researchTagUstensils,
    newTag,
    boxtag
  ) {
    if (
      researchTagIngredients.length === 0 &&
      researchTagAppliance.length === 0 &&
      researchTagUstensils.length === 0
    ) {
      boxtag.classList.remove("mt-5");
    } else {
      boxtag.classList.add("mt-5");
    }

    if (researchTagIngredients.length > 0) {
      for (let i = 0; i < researchTagIngredients.length; i++) {
        boxtag.insertAdjacentHTML(
          "beforeend",
          `<span class="tag tag-ingredient">` +
            researchTagIngredients[i] +
            `<i class="fas fa-times border-2 rounded-xl pr-1 pl-1"></i
            ></span>`
        );
      }
    }
    if (researchTagAppliance.length > 0) {
      for (let i = 0; i < researchTagAppliance.length; i++) {
        boxtag.insertAdjacentHTML(
          "beforeend",
          `<span class="tag tag-appliance">` +
            researchTagAppliance[i] +
            `<i class="fas fa-times border-2 rounded-xl pr-1 pl-1"></i
          ></span>`
        );
      }
    }
    if (researchTagUstensils.length > 0) {
      for (let i = 0; i < researchTagUstensils.length; i++) {
        boxtag.insertAdjacentHTML(
          "beforeend",
          `<span class="tag tag-ustensil">` +
            researchTagUstensils[i] +
            `<i class="fas fa-times border-2 rounded-xl pr-1 pl-1"></i
          ></span>`
        );
      }
    }
  }

  deleteTag(e, researchTag) {
    const tagSelect = e.target.localName;
    let tagDelete = "";
    console.log("what", researchTag);
    if (tagSelect === "span") {
      tagDelete = e.target.textContent;
      for (let i = 0; i < researchTag.ingredient.length; i++) {
        const ingredient = researchTag.ingredient[i];
        if (ingredient === tagDelete) {
          researchTag.ingredient.pop();
        }
      }
      for (let i = 0; i < researchTag.appliance.length; i++) {
        const appliance = researchTag.appliance[i];
        if (appliance === tagDelete) {
          researchTag.appliance.pop();
        }
      }
      for (let i = 0; i < researchTag.ustensil.length; i++) {
        const ustensil = researchTag.ustensil[i];
        if (ustensil === tagDelete) {
          researchTag.ustensil.pop();
        }
      }
    } else if (tagSelect === "i") {
      tagDelete = e.target.parentElement.textContent;
      for (let i = 0; i < researchTag.ingredient.length; i++) {
        const ingredient = researchTag.ingredient[i];
        if (ingredient === tagDelete) {
          researchTag.ingredient.pop();
        }
      }
      for (let i = 0; i < researchTag.appliance.length; i++) {
        const appliance = researchTag.appliance[i];
        if (appliance === tagDelete) {
          researchTag.appliance.pop();
        }
      }
      for (let i = 0; i < researchTag.ustensil.length; i++) {
        const ustensil = researchTag.ustensil[i];
        if (ustensil === tagDelete) {
          researchTag.ustensil.pop();
        }
      }
    }
    console.log("whatFIn", researchTag);
  }
}
