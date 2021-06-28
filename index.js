'use strict';
//document.body.style.color="#fff";

function fetchData(url) {
    
    return fetch(url)
    .then((response) => {
    //console.log('step1', response);
    return response.json();
    });
//     .then((jsonData)=>{
//         console.log('data', jsonData)
//     })
//     .catch((error) => {
//         console.log(error);
//         });
}
//fetchData("https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian");

const generateRandomId = ()=>{
    const randomId = (Math.floor(Math.random() * 100)+52771)
    console.log("randomId",randomId );
    return randomId;
}
generateRandomId();

function renderLandingImg(randomMealData){


    const landingImgContainer = document.createElement("div")
    landingImgContainer.classList.add("landingImgContainer");

    const landingImg = document.createElement("img")
    landingImg.classList.add("landingImg");
    landingImg.src=randomMealData.meals[0].strMealThumb;
    landingImgContainer.appendChild(landingImg);

  return landingImgContainer
}



function renderRandomMeals(randomMealData){

   

    const randomMealsContainer = document.createElement("div")
    randomMealsContainer.classList.add("randomMealsContainer");

    const randomMealName = document.createElement("h2")
    randomMealName.classList.add("randomMealName");
    randomMealName.innerHTML=randomMealData.meals[0].strMeal;

    const randomMealImgContainer = document.createElement("div")
    randomMealImgContainer.classList.add("randomMealImgContainer");

    const randomMealImg = document.createElement("img")
    randomMealImg.classList.add("randomMealImg");
    randomMealImg.src=randomMealData.meals[0].strMealThumb;
    randomMealImgContainer.appendChild(randomMealImg);

    const randomMealShortDescription = document.createElement("p")
    randomMealShortDescription.classList.add("short-description");
    randomMealShortDescription.innerHTML=randomMealData.meals[0].strInstructions;

    randomMealsContainer.appendChild(randomMealName)
    randomMealsContainer.appendChild(randomMealImgContainer)
    randomMealsContainer.appendChild(randomMealShortDescription)

    return randomMealsContainer;

    

}

function renderSearchedResult(jsonData){

    const previousSearch = document.getElementById("DOMSearchedResultsContainer");
    if(previousSearch){
         previousSearch.innerHTML="";
        }
    

    const allSearchedResultsContainer = document.createElement("div");
    allSearchedResultsContainer.id = "allSearchedResultsContainer";

    
    jsonData.meals.forEach(element => {


        const searchedResultContainer = document.createElement("div");
        searchedResultContainer.classList.add("searchedResultContainer");
        searchedResultContainer.setAttribute("data-mealid", element.idMeal)

        const mealNameAndDescriptionContainer = document.createElement("div")
        mealNameAndDescriptionContainer.classList.add("mealNameAndDescriptionContainer");

        const mealName = document.createElement("h2")
        mealName.classList.add("mealName");
        mealName.innerHTML=element.strMeal;

        const mealShortDescription = document.createElement("p")
        mealShortDescription.classList.add("short-description");
        mealShortDescription.innerHTML=element.strInstructions;

        const imgContainer = document.createElement("div")
        imgContainer.classList.add("imgContainer");

        const mealImg = document.createElement("img")
        mealImg.classList.add("mealImg");
        mealImg.src=element.strMealThumb;

        mealNameAndDescriptionContainer.appendChild(mealName);
        mealNameAndDescriptionContainer.appendChild(mealShortDescription);
        searchedResultContainer.appendChild(mealNameAndDescriptionContainer);

        imgContainer.appendChild(mealImg);
        searchedResultContainer.appendChild(imgContainer);

        allSearchedResultsContainer.appendChild(searchedResultContainer);

    });

     return allSearchedResultsContainer;

}

function showMealDetails(selectedMealData){

    const previousSearch = document.getElementById("DOMSearchedResultsContainer");
    if(previousSearch){
         previousSearch.innerHTML="";
        }

        const selectedMealDetailsContainer = document.createElement("div")
        selectedMealDetailsContainer.classList.add("selectedMealDetailsContainer");

        const selectedMealName = document.createElement("h2")
        selectedMealName.classList.add("selectedMealName");
        selectedMealName.innerHTML=selectedMealData.meals[0].strMeal;

        const selectedMealImgContainer = document.createElement("div")
        selectedMealImgContainer.classList.add("selectedMealImgContainer");

        const selectedMealImg = document.createElement("img")
        selectedMealImg.classList.add("selectedMealImg");
        selectedMealImg.src = selectedMealData.meals[0].strMealThumb;
        selectedMealImgContainer.appendChild(selectedMealImg);

        const ingredientTitle = document.createElement("h3")
        ingredientTitle.classList.add("ingredientTitle");
        ingredientTitle.innerHTML="The ingredients";

        const selectedMealIngredientsContainer = document.createElement("div")
        selectedMealIngredientsContainer.classList.add("selectedMealIngredientsContainer");

        for(let i=1; i<=25; i++){

            if(selectedMealData.meals[0][`strIngredient${i}`]){

                const selectedMealIngredients = document.createElement("p")
                selectedMealIngredients.classList.add("selectedMealIngredients");
                selectedMealIngredients.innerHTML=`${selectedMealData.meals[0][`strIngredient${i}`]}  ${selectedMealData.meals[0][`strMeasure${i}`]}`;

                selectedMealIngredientsContainer.appendChild(selectedMealIngredients)

            }

            
        }

        const descriptionTitle = document.createElement("h3")
        descriptionTitle.classList.add("descriptionTitle");
        descriptionTitle.innerHTML="The instructions";

        const selectedMealDescription = document.createElement("p")
        selectedMealDescription.classList.add("selectedMealDescription");
        selectedMealDescription.innerHTML=selectedMealData.meals[0].strInstructions;
        

        const selectedMealVideo = document.createElement("iframe")
        selectedMealVideo.classList.add("selectedMealVideo");
        selectedMealVideo.src=selectedMealData.meals[0].strYoutube;
        console.log(selectedMealData.meals[0].strYoutube)

        selectedMealDetailsContainer.appendChild(selectedMealName);
        selectedMealDetailsContainer.appendChild(selectedMealImgContainer);
        selectedMealDetailsContainer.appendChild(ingredientTitle);
        selectedMealDetailsContainer.appendChild(selectedMealIngredientsContainer);
        selectedMealDetailsContainer.appendChild(descriptionTitle);
        selectedMealDetailsContainer.appendChild(selectedMealDescription);
        selectedMealDetailsContainer.appendChild(selectedMealVideo);



        return selectedMealDetailsContainer;

}


function main (){
    
    let DOMSearchedResultsContainer = document.createElement("div");
     DOMSearchedResultsContainer.id = "DOMSearchedResultsContainer";
     document.body.appendChild(DOMSearchedResultsContainer)

     const randomImgId = generateRandomId();
            let randomImgUrl = `https://themealdb.com/api/json/v1/1/lookup.php?i=${randomImgId}`
            fetchData(randomImgUrl)
            .then((randomMealData)=>{
                let landingImg= renderLandingImg(randomMealData);
                DOMSearchedResultsContainer.appendChild(landingImg);  
                })
            .then(()=>{

               for(let i=0; i<=1; i++){
                    const randomId = generateRandomId();
                    let randomUrl = `https://themealdb.com/api/json/v1/1/lookup.php?i=${randomId}`
                    fetchData(randomUrl)
                    .then((randomMealData)=>{
                        let randomMeal= renderRandomMeals(randomMealData);
                        console.log('randomMeal', randomMeal)
                        DOMSearchedResultsContainer.appendChild(randomMeal);  
                        })
                    .catch((error) => {
                        console.log(error)
                        }); 
                }
   
            })

            .then(()=>{
                let searchedMeal = document.getElementById("meal-name");
                searchedMeal.onkeyup = ()=>{
                    let searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal.value}`
                    fetchData(searchUrl)
                    .then((jsonData)=>{
                        let renderResult= renderSearchedResult(jsonData) 
                        DOMSearchedResultsContainer.appendChild(renderResult);
                        console.log('data', jsonData)
                        const results = jsonData.meals.map((element)=>{
                        return element.strMeal
                        })
                        console.log(results);
                        })

                    .then(()=>{
                        let selectedMeal = document.querySelectorAll("div.searchedResultContainer");
                        console.log(selectedMeal)
                        
                        if(selectedMeal){
                            selectedMeal.forEach((element)=>{
                                element.addEventListener("click",
                                function(){
                                    let mealId = this.getAttribute("data-mealid")
                                    console.log(mealId)
                                
                                    let selectedMealUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
                                    fetchData(selectedMealUrl)
                                    .then((selectedMealData)=>{
                                        let MealDetails= showMealDetails(selectedMealData) 
                                        DOMSearchedResultsContainer.appendChild(MealDetails);
                                        console.log('selectedMealData', selectedMealData)
                                        })
                                    .catch((error) => {
                                    console.log(error)
                                    });
                                })
            
                            })
                            
                        }
                    })


                    .catch((error) => {
                        console.log(error)
                        });
                }
            })

            
    
            .catch((error) => {
                console.log(error)
                });
     
    } 



    window.onload = main ()

    //${selectedMeal[data-mealId]