
// let allMeals = {};
let allMeals = [];

//  fatching data from the API
const loadMeals = (query = "")  => {    // if i want to search for a specific meal then i can pass the query as an argument or if i dont want it then simpilly i have to erase queary and the () stays and i have to remove ${query} from fatch api link

  const loader = document.getElementById("loader");
  //  this will show the loader while fetching data
  loader.classList.add("flex");
  loader.classList.remove("hidden");

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then((res) => res.json())
    .then((data) => {
      // displayMeals(data.meals)
      allMeals = data.meals;
      // displayMeals(allMeals);

      setTimeout(() => {
        // this is do the main data card display
        displayMeals(allMeals);
        //  this will hide the loader after 2 seconds or when the data is fetched
        loader.classList.add("hidden");
        loader.classList.remove("flex");
      }, 1000);
    })
    .catch((error) => console.log("Fetch error:", error));
};
loadMeals();

const displayMeals = (meals) => {

  console.log(allMeals);
  // console.log(meals);

  const mealContainer = document.getElementById("mealContainer");
  mealContainer.innerHTML = "";

  meals.forEach((meals) => {
    const mealCard = document.createElement("div");
    mealCard.className = "w-full shadow-2xl rounded-2xl";
    // mealContainer.innerHTML = ""; // Clear previous meals
    mealCard.innerHTML = `
                <div onclick="foodCardClick(${meals.idMeal})" class="w-full h-full cursor-pointer shadow-2xl rounded-2xl">
                    <img src=${meals.strMealThumb} alt="image" class="w-full h-64 object-cover rounded-t-2xl">
                    <div class="text-2xl font-semibold py-3 px-4">${meals.strMeal}</div>
                    <div class="pb-6 px-4 line-clamp-3 overflow-hidden">${meals.strInstructions}</div>
                    <div class="flex justify-end">
                        <div class="my-3.5 mx-3.5 px-4 py-2.5 text-white font-semibold bg-yellow-500 rounded-xl">View Details</div>
                    </div>
                 </div>
        `;

    mealContainer.append(mealCard);
  });
}

// function foodCardClick() {
//   alert("You clicked a meal!");


// }

// modal function
function foodCardClick(mealId) {
  // Find the meal from allMeals
  const meals = allMeals.find((m) => m.idMeal.toString() === mealId.toString());

  document.getElementById("modal").classList.remove("hidden");

  document.getElementById("modalCard").innerHTML = `
    <h2 class="text-3xl font-bold mb-3">${meals.strMeal}</h2>
    <img src="${meals.strMealThumb}" alt="${meals.strMeal}" class="w-full object-cover rounded-lg mb-4">
    <p class="mb-2"><strong>Food ID:</strong> ${meals.idMeal}</p>
    <p class="mb-2"><strong>Category:</strong> ${meals.strCategory}</p>
    <p class="mb-2"><strong>Area:</strong> ${meals.strArea}</p>
    <p class="mb-2"><strong>Details:</strong></p>
    <p class="mb-4 indent-10 text-justify mr-3">${meals.strInstructions}</p>
    <div class="flex justify-end">
        <div onclick="closeModal()" class="my-3.5 mx-3.5 px-4 py-2.5 cursor-pointer text-white font-semibold bg-yellow-500 rounded-xl">Close</div>
    </div>
  `;
}



// Function is to close the modal
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}
// this function closes the modal if clicked outside of that modal box
document.getElementById("modal").addEventListener("click", function (eventClose) {
  if (eventClose.target === this) {
    closeModal();
  }
});


// Input Search function
function searchBtnClick() {
  const searchText = document.getElementById("searchInput").value.trim();

  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");
  loader.classList.add("flex");

  if (!searchText) {
    // If input is empty, load all meals
    loadMeals();
    return;
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      const meals = data.meals;

      const mealContainer = document.getElementById("mealContainer");

      if (!meals) {
        mealContainer.innerHTML = `<p class="text-center text-xl mt-10">No meals found for "${searchText}".</p>`;
      } else {
        allMeals = meals; // optional: update global meals
        displayMeals(meals);
      }

      loader.classList.add("hidden");
      loader.classList.remove("flex");
    })
    .catch((error) => {
      console.error("Search fetch error:", error);
    });
}


// this is a function for search bar that will work when enter key will be pressed
document.getElementById("searchInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchBtnClick();
  }
});




// Scroll to Top Button functionality
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show the button when the user scrolls down 20px from the top of the document
window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollToTopBtn.classList.remove("hidden");
    scrollToTopBtn.classList.add("block");
  } else {
    scrollToTopBtn.classList.add("hidden");
    scrollToTopBtn.classList.remove("block");
  }
};

// Scroll to the top of the document when the button is clicked
scrollToTopBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });













  //   meals.forEach((meal) => {
  //     mealContainer.innerHTML += `
  //       <div class="card">
  //         <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
  //         <h3>${meal.strMeal}</h3>
  //         <p><strong>Category:</strong> ${meal.strCategory}</p>
  //       </div>
  //     `;
  //   });




  // function foodCardClick() {

  // }
};