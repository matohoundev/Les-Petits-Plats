import ApiServices from "../ApiServices/apiServices.js";

let toggleIndex;
let tagList;

export default class filter {
  init(e) {
    const chevronDOM = e.target;
    const labelDOM = e.target.parentNode.firstElementChild;
    const inputDOM = e.target.previousElementSibling;
    const listeDOM = e.target.parentNode.nextElementSibling;

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
    this.displayAllTag(chevronDOM.id, listeDOM);
  }

  displayAllTag(tag, liste) {
    let time
    console.log(liste)
    if (tag === "ingredient-chevron") {
      time = new ApiServices().getIngredients(); 
      time.forEach((ingredient) => liste.insertAdjacentHTML(
        'beforeend',
        `<li>` + ingredient + `</li>`
      ))
    } else if (tag === "appliance-chevron") {
      console.log("appliance");
    } else if (tag === "ustensil-chevron") {
      console.log("ustensil");
    } else {
      return;
    }
  }
}
