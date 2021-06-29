"use strict";

function fetchData(url) {
  return fetch(url).then((response) => {
    return response.json();
  });
 
}

const generateRandomId = () => {
  const randomId = Math.floor(Math.random() * 10) + 52771;
  console.log("randomId", randomId);
  return randomId;
};

function renderLandingImg(randomMealData) {
  
  const landingImg = document.createElement("img");
  landingImg.classList.add("landingImg");
  landingImg.src = randomMealData.meals[0].strMealThumb;

  return landingImg;
}

function renderRandomMeals(randomMealData) {
  const randomMealContainer = document.createElement("div");
  randomMealContainer.classList.add("randomMealContainer");

  const randomMealName = document.createElement("h2");
  randomMealName.classList.add("randomMealName");
  randomMealName.innerHTML = randomMealData.meals[0].strMeal;

  const randomMealImgContainer = document.createElement("div");
  randomMealImgContainer.classList.add("randomMealImgContainer");

  const randomMealImg = document.createElement("img");
  randomMealImg.classList.add("randomMealImg");
  randomMealImg.src = randomMealData.meals[0].strMealThumb;
  randomMealImgContainer.appendChild(randomMealImg);

  const randomMealShortDescription = document.createElement("p");
  randomMealShortDescription.classList.add("random-short-description");
  randomMealShortDescription.innerHTML =
    randomMealData.meals[0].strInstructions;

  randomMealContainer.appendChild(randomMealName);
  randomMealContainer.appendChild(randomMealImgContainer);
  randomMealContainer.appendChild(randomMealShortDescription);

  return randomMealContainer;
}

function renderSearchedResult(jsonData) {
  const allSearchedResultsContainer = document.createElement("div");
  allSearchedResultsContainer.classList.add("allSearchedResultsContainer");
  allSearchedResultsContainer.id = "allSearchedResultsContainer";

  jsonData.meals.forEach((element) => {
    const searchedResultContainer = document.createElement("div");
    searchedResultContainer.classList.add("searchedResultContainer");
    searchedResultContainer.setAttribute("data-mealid", element.idMeal);

    const mealNameAndDescriptionContainer = document.createElement("div");
    mealNameAndDescriptionContainer.classList.add(
      "mealNameAndDescriptionContainer"
    );

    const mealName = document.createElement("h2");
    mealName.classList.add("mealName");
    mealName.innerHTML = element.strMeal;

    const mealShortDescription = document.createElement("p");
    mealShortDescription.classList.add("short-description");
    mealShortDescription.innerHTML = element.strInstructions;

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("imgContainer");

    const mealImg = document.createElement("img");
    mealImg.classList.add("mealImg");
    mealImg.src = element.strMealThumb;

    mealNameAndDescriptionContainer.appendChild(mealName);
    mealNameAndDescriptionContainer.appendChild(mealShortDescription);
    searchedResultContainer.appendChild(mealNameAndDescriptionContainer);

    imgContainer.appendChild(mealImg);
    searchedResultContainer.appendChild(imgContainer);

    allSearchedResultsContainer.appendChild(searchedResultContainer);
  });

  return allSearchedResultsContainer;
}

function showMealDetails(selectedMealData) {
  const selectedMealDetailsContainer = document.getElementById(
    "allSearchedResultsContainer"
  );
  if (selectedMealDetailsContainer) {
    selectedMealDetailsContainer.innerHTML = "";
  }

  const selectedMealName = document.createElement("h2");
  selectedMealName.classList.add("selectedMealName");
  selectedMealName.innerHTML = selectedMealData.meals[0].strMeal;

  const selectedMealImgAndIngredientsContainer = document.createElement("div");
  selectedMealImgAndIngredientsContainer.classList.add(
    "selectedMealImgAndIngredientsContainer"
  );

  const selectedMealImgContainer = document.createElement("div");
  selectedMealImgContainer.classList.add("selectedMealImgContainer");

  const selectedMealImg = document.createElement("img");
  selectedMealImg.classList.add("selectedMealImg");
  selectedMealImg.src = selectedMealData.meals[0].strMealThumb;
  selectedMealImgContainer.appendChild(selectedMealImg);

  const ingredientContainer = document.createElement("div");
  ingredientContainer.classList.add("ingredientContainer");

  const ingredientTitle = document.createElement("h3");
  ingredientTitle.classList.add("ingredientTitle");
  ingredientTitle.innerHTML = "The ingredients";

  const selectedMealIngredientsContainer = document.createElement("div");
  selectedMealIngredientsContainer.classList.add(
    "selectedMealIngredientsContainer"
  );

  for (let i = 1; i <= 25; i++) {
    if (selectedMealData.meals[0][`strIngredient${i}`]) {
      const selectedMealIngredients = document.createElement("p");
      selectedMealIngredients.classList.add("selectedMealIngredients");
      selectedMealIngredients.innerHTML = `${
        selectedMealData.meals[0][`strIngredient${i}`]
      }  ${selectedMealData.meals[0][`strMeasure${i}`]}`;

      selectedMealIngredientsContainer.appendChild(selectedMealIngredients);
    }
  }

  ingredientContainer.appendChild(ingredientTitle);
  ingredientContainer.appendChild(selectedMealIngredientsContainer);
  selectedMealImgAndIngredientsContainer.appendChild(ingredientContainer);
  selectedMealImgAndIngredientsContainer.appendChild(selectedMealImgContainer);

  const descriptionTitle = document.createElement("h3");
  descriptionTitle.classList.add("descriptionTitle");
  descriptionTitle.innerHTML = "The instructions";

  const selectedMealDescription = document.createElement("p");
  selectedMealDescription.classList.add("selectedMealDescription");
  selectedMealDescription.innerHTML = selectedMealData.meals[0].strInstructions;

  const selectedMealVideo = document.createElement("iframe");
  selectedMealVideo.classList.add("selectedMealVideo");
  let refusedUrl = `${selectedMealData.meals[0].strYoutube}`
  let embedUrl = refusedUrl.replace("watch?v=", "embed/");
  selectedMealVideo.src = embedUrl;
  

  selectedMealDetailsContainer.appendChild(selectedMealName);
  selectedMealDetailsContainer.appendChild(
    selectedMealImgAndIngredientsContainer
  );
  selectedMealDetailsContainer.appendChild(descriptionTitle);
  selectedMealDetailsContainer.appendChild(selectedMealDescription);
  selectedMealDetailsContainer.appendChild(selectedMealVideo);

  return selectedMealDetailsContainer;
}

function main() {
  let DOMSearchedResultsContainer = document.createElement("div");
  DOMSearchedResultsContainer.id = "DOMSearchedResultsContainer";
  document.body.appendChild(DOMSearchedResultsContainer);

  const navBar = document.createElement("div");
  navBar.classList.add("navBar");
  DOMSearchedResultsContainer.appendChild(navBar);

  const landingImgContainer = document.createElement("div");
  landingImgContainer.classList.add("landingImgContainer");
  for (let i = 1; i <= 5; i++) {
    //const randomImgId = generateRandomId();
    let randomImgUrl = `https://www.themealdb.com/api/json/v1/1/random.php`;
    fetchData(randomImgUrl)
      .then((randomMealData) => {
        let landingImg = renderLandingImg(randomMealData);
        landingImgContainer.appendChild(landingImg);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  DOMSearchedResultsContainer.appendChild(landingImgContainer);
 

  const searchBoxContainer = document.createElement("div");
  searchBoxContainer.classList.add("searchBoxContainer");
  const searchBox = document.createElement("input");
  searchBox.classList.add("searchBox");
  searchBox.id = "meal-name";
  searchBox.placeholder = "type your meal";
  searchBox.type = "text";
  searchBoxContainer.appendChild(searchBox);
  DOMSearchedResultsContainer.appendChild(searchBoxContainer);

  const randomMealsContainer = document.createElement("div");
  randomMealsContainer.classList.add("randomMealsContainer");
  for (let i = 0; i <= 1; i++) {
    //const randomId = generateRandomId();
    let randomUrl = `https://www.themealdb.com/api/json/v1/1/random.php`;
    fetchData(randomUrl)
      .then((randomMealData) => {
        let randomMeal = renderRandomMeals(randomMealData);
        console.log("randomMeal", randomMeal);
        randomMealsContainer.appendChild(randomMeal);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  DOMSearchedResultsContainer.appendChild(randomMealsContainer);

  let searchedMeal = document.getElementById("meal-name");
  searchedMeal.onfocus = () => {
    searchedMeal.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  searchedMeal.onkeyup = () => {
    let searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal.value}`;
    fetchData(searchUrl)
      .then((jsonData) => {
        let renderResult = renderSearchedResult(jsonData);
        DOMSearchedResultsContainer.appendChild(renderResult);
        console.log("data", jsonData);
        const results = jsonData.meals.map((element) => {
          return element.strMeal;
        });
        console.log(results);
      })

      .then(() => {
        let selectedMeal = document.querySelectorAll(
          "div.searchedResultContainer"
        );
        console.log(selectedMeal);

        if (selectedMeal) {
          selectedMeal.forEach((element) => {
            element.addEventListener("click", function () {
              let mealId = this.getAttribute("data-mealid");
              console.log(mealId);

              let selectedMealUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
              fetchData(selectedMealUrl)
                .then((selectedMealData) => {
                  let MealDetails = showMealDetails(selectedMealData);
                  DOMSearchedResultsContainer.appendChild(MealDetails);
                  console.log("selectedMealData", selectedMealData);
                })
                .catch((error) => {
                  console.log(error);
                });
            });
          });
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };
  DOMSearchedResultsContainer.addEventListener("click", function (event){
    let unRequiredPage = document.getElementById("allSearchedResultsContainer");
    var isClickInsideUnRequiredPageunRequiredPage = unRequiredPage.contains(event.target)
     if(unRequiredPage && !isClickInsideUnRequiredPageunRequiredPage ){
         location.reload();
         DOMSearchedResultsContainer.classList.remove("Dom-Hover")
     }
  })

  DOMSearchedResultsContainer.addEventListener("mouseenter", function (event){
    let unRequiredPage = document.getElementById("allSearchedResultsContainer");
    var isClickInsideUnRequiredPageunRequiredPage = unRequiredPage.contains(event.target)
     if(unRequiredPage && !isClickInsideUnRequiredPageunRequiredPage ){
         DOMSearchedResultsContainer.classList.add("Dom-Hover")
     }
     DOMSearchedResultsContainer.classList.remove("Dom-Hover")

  })


}

window.onload = main();


