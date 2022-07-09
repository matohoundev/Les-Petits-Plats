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

  displayAllTag(tag, liste) {
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
        if (!researchTagAppliance.includes(e.target.textContent)) {
          onClickTagAppliance(e.target.textContent);
        }
      });
    } else if (tag === "ustensil-chevron") {
      allUstensils = new ApiServices().getUstensils();
      liste.addEventListener("click", (e) => {
        if (!researchTagUstensils.includes(e.target.textContent)) {
          onClickTagUstensils(e.target.textContent);
        }
      });
    }
  }

  styleAddTagIngredients(
    researchTagIngredients,
    researchTagAppliance,
    researchTagUstensils,
    newTag,
    boxTag
  ) {
    if (
      researchTagIngredients.length > 0 ||
      researchTagAppliance != "" ||
      researchTagUstensils.length > 0
    ) {
      boxTag.classList.add("mt-5");
    }

    if (researchTagIngredients.length > 0) {
      boxTag.insertAdjacentHTML(
        "beforeend",
        `<span class="tag tag-ingredient">` +
          newTag +
          `<i class="fas fa-times border-2 rounded-xl pr-1 pl-1"></i
            ></span>`
      );
    }
  }

  styleAddTagAppliance(
    researchTagIngredients,
    researchTagAppliance,
    researchTagUstensils,
    newTag,
    boxTag
  ) {
    if (
      researchTagIngredients.length > 0 ||
      researchTagAppliance != "" ||
      researchTagUstensils.length > 0
    ) {
      boxTag.classList.add("mt-5");
    }

    if (researchTagAppliance != "") {
      if (document.getElementById("tag-appliance") === null) {
        boxTag.insertAdjacentHTML(
          "beforeend",
          `<span id="tag-appliance" class="tag tag-appliance">` +
            newTag +
            `<i class="fas fa-times border-2 rounded-xl pr-1 pl-1"></i
            ></span>`
        );
      } else {
        let tagAppliance = document.getElementById("tag-appliance");
        tagAppliance.remove();
        boxTag.insertAdjacentHTML(
          "beforeend",
          `<span id="tag-appliance" class="tag tag-appliance">` +
            newTag +
            `<i class="fas fa-times border-2 rounded-xl pr-1 pl-1"></i
            ></span>`
        );
      }
    }
  }

  styleAddTagUstensils(
    researchTagIngredients,
    researchTagAppliance,
    researchTagUstensils,
    newTag,
    boxTag
  ) {
    if (
      researchTagIngredients.length > 0 ||
      researchTagAppliance != "" ||
      researchTagUstensils.length > 0
    ) {
      boxTag.classList.add("mt-5");
    }

    if (researchTagUstensils.length > 0) {
      boxTag.insertAdjacentHTML(
        "beforeend",
        `<span class="tag tag-ustensil">` +
          newTag +
          `<i class="fas fa-times border-2 rounded-xl pr-1 pl-1"></i
          ></span>`
      );
    }
  }

  deleteTag(e, boxTag, researchTag) {
    const tagSelect = e.target.localName;
    let tagDelete = "";
    if (tagSelect === "span") {
      tagDelete = e.target.textContent;
      for (let i = 0; i < researchTag.ingredient.length; i++) {
        const ingredient = researchTag.ingredient[i];
        if (ingredient === tagDelete) {
          researchTag.ingredient.splice(i, 1);
          e.target.remove();
        }
      }
      if (researchTag.appliance === tagDelete) {
        researchTag.appliance = "";
        e.target.remove();
      }
      for (let i = 0; i < researchTag.ustensil.length; i++) {
        const ustensil = researchTag.ustensil[i];
        if (ustensil === tagDelete) {
          researchTag.ustensil.splice(i, 1);
          e.target.remove();
        }
      }
    } else if (tagSelect === "i") {
      tagDelete = e.target.parentElement.textContent;
      for (let i = 0; i < researchTag.ingredient.length; i++) {
        const ingredient = researchTag.ingredient[i];
        if (ingredient === tagDelete) {
          researchTag.ingredient.splice(i, 1);
          e.target.parentElement.remove();
        }
      }
      if (researchTag.appliance === tagDelete) {
        researchTag.appliance = "";
        e.target.parentElement.remove();
      }
      for (let i = 0; i < researchTag.ustensil.length; i++) {
        const ustensil = researchTag.ustensil[i];
        if (ustensil === tagDelete) {
          researchTag.ustensil.splice(i, 1);
          e.target.parentElement.remove();
        }
      }
    }
    if (
      researchTag.ingredient.length === 0 &&
      researchTag.appliance.length === 0 &&
      researchTag.ustensil.length === 0
    ) {
      boxTag.classList.remove("mt-5");
    }
  }
}
