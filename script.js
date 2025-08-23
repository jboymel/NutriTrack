// font size
let currentFontSize = parseInt(localStorage.getItem('fontSize')) || 100;
document.body.style.fontSize = currentFontSize + '%';

function increaseFontSize() {
  if (currentFontSize < 150) {
    currentFontSize += 10;
    document.body.style.fontSize = currentFontSize + '%';
    localStorage.setItem('fontSize', currentFontSize);
  }
}

function decreaseFontSize() {
  if (currentFontSize > 50) {
    currentFontSize -= 10;
    document.body.style.fontSize = currentFontSize + '%';
    localStorage.setItem('fontSize', currentFontSize);
  }
}

// theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// food database
const foodDatabase = [
  { name: "Apple (Medium)", emoji: "🍎", calories: 95, carbs: 25, sugar: 19, protein: 0.5, fat: 0.3, fiber: 4 },
  { name: "Chicken Breast", emoji: "🥗", calories: 165, carbs: 0, sugar: 0, protein: 31, fat: 3.6, fiber: 0 },
  { name: "Avocado", emoji: "🥑", calories: 160, carbs: 9, sugar: 1, protein: 2, fat: 15, fiber: 7 },
  { name: "Greek Yogurt", emoji: "🥛", calories: 100, carbs: 6, sugar: 6, protein: 17, fat: 0.4, fiber: 0 },
  { name: "Banana", emoji: "🍌", calories: 105, carbs: 27, sugar: 21, protein: 1.3, fat: 0.4, fiber: 3 },
  { name: "Salmon", emoji: "🐟", calories: 208, carbs: 0, sugar: 0, protein: 22, fat: 12, fiber: 0 },
  { name: "Broccoli", emoji: "🥦", calories: 34, carbs: 7, sugar: 1.5, protein: 3, fat: 0.4, fiber: 3 },
  { name: "Brown Rice", emoji: "🍚", calories: 112, carbs: 23, sugar: 0.4, protein: 2.6, fat: 0.9, fiber: 1.8 },
  { name: "Almonds", emoji: "🌰", calories: 579, carbs: 22, sugar: 4, protein: 21, fat: 50, fiber: 12 },
  { name: "Sweet Potato", emoji: "🍠", calories: 86, carbs: 20, sugar: 4.2, protein: 1.6, fat: 0.1, fiber: 3 }
];

function searchFoods(query) {
  if (!query) return foodDatabase;
  return foodDatabase.filter(food => 
      food.name.toLowerCase().includes(query.toLowerCase())
  );
}

function filterFoods(calorieFilter, proteinFilter, sugarFilter) {
  return foodDatabase.filter(food => {
      let passesCalorie = true, passesProtein = true, passesSugar = true;
      
      if (calorieFilter === 'Under 100') passesCalorie = food.calories < 100;
      else if (calorieFilter === '100-300') passesCalorie = food.calories >= 100 && food.calories <= 300;
      else if (calorieFilter === 'Over 300') passesCalorie = food.calories > 300;
      
      if (proteinFilter === 'High Protein (15g+)') passesProtein = food.protein >= 15;
      else if (proteinFilter === 'Medium (5-15g)') passesProtein = food.protein >= 5 && food.protein < 15;
      else if (proteinFilter === 'Low (Under 5g)') passesProtein = food.protein < 5;
      
      if (sugarFilter === 'Low Sugar (Under 5g)') passesSugar = food.sugar < 5;
      else if (sugarFilter === 'Medium (5-15g)') passesSugar = food.sugar >= 5 && food.sugar <= 15;
      else if (sugarFilter === 'High (Over 15g)') passesSugar = food.sugar > 15;
      
      return passesCalorie && passesProtein && passesSugar;
  });
}

function displayFoods(foods) {
  //const resultsContainer = document.querySelector('.content-section h3').parentElement.querySelector('.grid');
  const resultsContainer = document.getElementById('food-results');
  if (!resultsContainer) return;
  
  resultsContainer.innerHTML = foods.map(food => `
      <div class="card">
          <h4>${food.emoji} ${food.name}</h4>
          <p><strong>Calories:</strong> ${food.calories} | <strong>Protein:</strong> ${food.protein}g | <strong>Sugar:</strong> ${food.sugar}g</p>
          <button class="button" onclick="viewFoodDetails('${food.name}')">View Details</button>
          <button class="button" onclick="addToLog('${food.name}')">Add to Log</button>
      </div>
  `).join('');
}

function handleSearch() {
  const query = document.getElementById('food-search')?.value || '';
  const foods = searchFoods(query);
  displayFoods(foods);
}

function applyFilters() {
  const calorieFilter = document.getElementById('calorie-filter')?.value;
  const proteinFilter = document.getElementById('protein-filter')?.value;
  const sugarFilter = document.getElementById('sugar-filter')?.value;
  
  const filtered = filterFoods(calorieFilter, proteinFilter, sugarFilter);
  displayFoods(filtered);
}

// initialize food display when page loads
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('foodlibrary.html')) {
      displayFoods(foodDatabase);
  }
});

// meal logging system
let dailyLog = JSON.parse(localStorage.getItem('dailyLog')) || {
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: []
};

let nutritionGoals = JSON.parse(localStorage.getItem('nutritionGoals')) || {
  calories: 2000,
  protein: 80,
  sugar: 50,
  fat: 65
};

function addToLog(foodName) {
  const food = foodDatabase.find(f => f.name === foodName);
  if (!food) return;
  
  const mealType = prompt("Which meal? (breakfast/lunch/dinner/snack)");
  if (!mealType || !dailyLog[mealType]) return;
  
  const serving = parseFloat(prompt("How many servings? (e.g., 1, 0.5, 2)") || "1");
  
  const logEntry = {
      ...food,
      servings: serving,
      totalCalories: food.calories * serving,
      totalProtein: food.protein * serving,
      totalSugar: food.sugar * serving,
      totalFat: food.fat * serving,
      timestamp: new Date().toLocaleTimeString()
  };
  
  dailyLog[mealType].push(logEntry);
  localStorage.setItem('dailyLog', JSON.stringify(dailyLog));
  
  alert(`Added ${serving} serving(s) of ${foodName} to ${mealType}!`);
  
  if (window.location.pathname.includes('mealtracker.html')) {
      updateMealTracker();
  }
}

function updateMealTracker() {
  // calculate totals
  let totalCalories = 0, totalProtein = 0, totalSugar = 0, totalFat = 0;
  
  Object.values(dailyLog).forEach(meal => {
      meal.forEach(item => {
          totalCalories += item.totalCalories;
          totalProtein += item.totalProtein;
          totalSugar += item.totalSugar;
          totalFat += item.totalFat;
      });
  });
  
  // update dashboard stats
  const statBoxes = document.querySelectorAll('.stat-box h3');
  if (statBoxes[0]) statBoxes[0].textContent = Math.round(totalCalories);
  if (statBoxes[1]) statBoxes[1].textContent = Math.round(totalProtein) + 'g';
  if (statBoxes[2]) statBoxes[2].textContent = Math.round(totalSugar) + 'g';
  if (statBoxes[3]) statBoxes[3].textContent = Math.round(totalFat) + 'g';
  
  // update meal sections
  updateMealSection('breakfast', '🌅 Breakfast');
  updateMealSection('lunch', '🍽 Lunch');  
  updateMealSection('dinner', '🍽 Dinner');
  updateMealSection('snack', '🥙 Snack');
}

function updateMealSection(mealType, mealTitle) {
  const meals = dailyLog[mealType];
  const mealBoxes = document.querySelectorAll('.box h4');
  
  for (let box of mealBoxes) {
      if (box.textContent.includes(mealTitle.split(' ')[1])) {
          const mealBox = box.parentElement;
          if (meals.length === 0) {
              mealBox.innerHTML = `<h4>${mealTitle}</h4><p><em>No items logged</em></p>
                  <button class="button button-primary" onclick="promptAddFood('${mealType}')">Add Food</button>`;
          } else {
              const itemsList = meals.map(item => 
                  `<li>${item.name} (${item.servings} serving) - ${Math.round(item.totalCalories)} cal</li>`
              ).join('');
              const totalCals = meals.reduce((sum, item) => sum + item.totalCalories, 0);
              mealBox.innerHTML = `<h4>${mealTitle}</h4><ul>${itemsList}</ul>
                  <p><strong>Total:</strong> ${Math.round(totalCals)} calories</p>
                  <button class="button" onclick="promptAddFood('${mealType}')">Add More Food</button>`;
          }
      }
  }
}

function promptAddFood(mealType) {
  window.location.href = 'foodlibrary.html';
}

// initialize meal tracker when page loads
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('mealtracker.html')) {
      updateMealTracker();
  }
});

function addCustomFood() {
  const name = prompt("Food name:");
  if (!name) return;
  
  const calories = parseFloat(prompt("Calories per serving:") || "0");
  const protein = parseFloat(prompt("Protein (g):") || "0");
  const sugar = parseFloat(prompt("Sugar (g):") || "0");
  const fat = parseFloat(prompt("Fat (g):") || "0");
  
  const customFood = {
      name: name,
      emoji: "🍽",
      calories, protein, sugar, fat,
      carbs: 0, fiber: 0
  };
  
  foodDatabase.push(customFood);
  alert(`Added ${name} to food database!`);
}

function updateGoals() {
  const calories = parseInt(prompt("Daily calorie goal:", nutritionGoals.calories) || nutritionGoals.calories);
  const protein = parseInt(prompt("Daily protein goal (g):", nutritionGoals.protein) || nutritionGoals.protein);
  const sugar = parseInt(prompt("Daily sugar limit (g):", nutritionGoals.sugar) || nutritionGoals.sugar);
  const fat = parseInt(prompt("Daily fat goal (g):", nutritionGoals.fat) || nutritionGoals.fat);
  
  nutritionGoals = { calories, protein, sugar, fat };
  localStorage.setItem('nutritionGoals', JSON.stringify(nutritionGoals));
  
  // update goal displays
  const goalElements = document.querySelectorAll('.stat-box small');
  if (goalElements[0]) goalElements[0].textContent = `Goal: ${calories}`;
  if (goalElements[1]) goalElements[1].textContent = `Goal: ${protein}g`;
  if (goalElements[2]) goalElements[2].textContent = `Limit: ${sugar}g`;
  if (goalElements[3]) goalElements[3].textContent = `Goal: ${fat}g`;
  
  alert("Goals updated!");
}

function viewFoodDetails(foodName) {
  const food = foodDatabase.find(f => f.name === foodName);
  if (!food) return;
  
  alert(`${food.name}\nCalories: ${food.calories}\nProtein: ${food.protein}g\nCarbs: ${food.carbs}g\nSugar: ${food.sugar}g\nFat: ${food.fat}g\nFiber: ${food.fiber}g`);
}