
// let allMeals = {};
let allMeals = [];

//  fatching data from the API
const loadMeals = () => {

  const loader = document.getElementById("loader");
  //  this will show the loader while fetching data
  loader.classList.add("flex");
  loader.classList.remove("hidden");

  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
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
                <div onclick="foodCardClick(${meals.idMeal})" class="w-full cursor-pointer shadow-2xl rounded-2xl">
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
    <h2 class="text-2xl font-bold mb-3">${meals.strMeal}</h2>
    <img src="${meals.strMealThumb}" alt="${meals.strMeal}" class="w-full h-64 object-cover rounded-lg mb-4">
    <p class="mb-2"><strong>Category:</strong> ${meals.strCategory}</p>
    <p class="mb-2"><strong>Area:</strong> ${meals.strArea}</p>
    <p class="mb-4">${meals.strInstructions}</p>
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