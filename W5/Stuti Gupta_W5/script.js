// ==================================
// TUTORIAL 5: ARRAY METHODS FOR DATA
// From ONE element to MANY elements
// ==================================




// Restaurant data - this is what we'll work with
const restaurants = [
    {
        "id": 1,
        "name": "Milano's Italian Restaurant",
        "cuisine": "Italian",
        "rating": 4.5,
        "priceRange": "$$",
        "neighborhood": "College Park",
        "hours": "11am-10pm",
        "specialties": ["pasta", "pizza"],
        "phoneNumber": "(301) 555-0123"
    },
    {
        "id": 2,
        "name": "Sakura Sushi",
        "cuisine": "Japanese",
        "rating": 4.2,
        "priceRange": "$$$",
        "neighborhood": "Downtown",
        "hours": "5pm-11pm",
        "specialties": ["sushi", "ramen"],
        "phoneNumber": "(301) 555-0456"
    },
    {
        "id": 3,
        "name": "Border Café",
        "cuisine": "Mexican",
        "rating": 4.0,
        "priceRange": "$",
        "neighborhood": "University District",
        "hours": "10am-12am",
        "specialties": ["tacos", "burritos"],
        "phoneNumber": "(301) 555-0789"
    },
    {
        "id": 4,
        "name": "The Brass Elephant",
        "cuisine": "American",
        "rating": 4.8,
        "priceRange": "$$$$",
        "neighborhood": "Historic District",
        "hours": "5pm-10pm",
        "specialties": ["steaks", "seafood"],
        "phoneNumber": "(301) 555-0012"
    },
    {
        "id": 5,
        "name": "Pho Corner",
        "cuisine": "Vietnamese",
        "rating": 4.3,
        "priceRange": "$",
        "neighborhood": "College Park",
        "hours": "11am-9pm",
        "specialties": ["pho", "banh mi"],
        "phoneNumber": "(301) 555-0345"
    },
    {
        "id": 6,
        "name": "Tandoor Palace",
        "cuisine": "Indian",
        "rating": 4.1,
        "priceRange": "$$",
        "neighborhood": "Downtown",
        "hours": "12pm-10pm",
        "specialties": ["curry", "naan"],
        "phoneNumber": "(301) 555-0678"
    },
    {
        "id": 7,
        "name": "Le Petit Bistro",
        "cuisine": "French",
        "rating": 4.6,
        "priceRange": "$$$",
        "neighborhood": "Historic District",
        "hours": "6pm-10pm",
        "specialties": ["wine", "cheese"],
        "phoneNumber": "(301) 555-0901"
    },
    {
        "id": 8,
        "name": "Seoul Kitchen",
        "cuisine": "Korean",
        "rating": 4.4,
        "priceRange": "$$",
        "neighborhood": "University District",
        "hours": "11am-11pm",
        "specialties": ["bbq", "kimchi"],
        "phoneNumber": "(301) 555-0234"
    }
];




// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tutorial 5: Array methods ready!');
    console.log(`We have ${restaurants.length} restaurants to work with`);
    



    // ===============================================
    // METHOD 1: forEach - DO SOMETHING WITH EACH ITEM
    // ===============================================
    
    // Goal: Display all restaurants in the list area
    // forEach is like Tutorial 4's single element work, but for ALL items

    // Clear the existing content
    // Step 1: Use forEach to go through each restaurant
        // Hint: restaurants.forEach(function(restaurant) { })
    // Step 2: For each restaurant, create HTML and add it to the list
        // Hint: Create a div with restaurant.name and restaurant.cuisine
        // Hint: Use restaurantList.innerHTML += to add each one

    // MY CODE HERE:

    const displayButton = document.querySelector('#display-button');
    const restaurantList = document.querySelector('#restaurant-list');
    
    displayButton.addEventListener('click', function() {
        
        restaurantList.innerHTML = '';
        
        // STEP 1
        restaurants.forEach(function(restaurant) {
            
        // STEP 2
        restaurantList.innerHTML += `
                <div>
                    <p>${restaurant.name}</p>
                    <p>${restaurant.cuisine}</p>
                </div>
            `;
        });

        console.log('Displayed all restaurants using forEach');
    });
    



    // ================================================
    // METHOD 2: filter - GET ITEMS THAT MATCH CRITERIA
    // ================================================
    
    // Goal: Show only restaurants with "$" or "$$" price range
    // filter creates a NEW array with only items that match your condition

    // Clear the existing content
    // Step 1: Use filter to get only cheap restaurants
        // Hint: const cheapRestaurants = restaurants.filter(function(restaurant) {return condition;})
        // Hint: Check if restaurant.priceRange is "$" or "$$"
    // Step 2: Display the filtered results
        // Hint: Use forEach on the cheapRestaurants array

    // MY CODE HERE:
    
    const filterButton = document.querySelector('#filter-button');
    const filteredList = document.querySelector('#filtered-list');
    
    filterButton.addEventListener('click', function() {

        filteredList.innerHTML = '';
        
        // STEP 1
        const affordable = restaurants.filter(function(restaurant) {
            return restaurant.priceRange === '$' || restaurant.priceRange === '$$';
        });
        
        // STEP 2
        affordable.forEach(function(restaurant) {
            filteredList.innerHTML += `
                <div>
                    <p>${restaurant.name}</p>
                    <p>${restaurant.priceRange}</p>
                </div>
            `;
        });
        
        console.log('Showed cheap restaurants using filter');
    });
    



    // ========================================================
    // METHOD 3: map - TRANSFORM EACH ITEM TO GET SPECIFIC DATA
    // ========================================================
    
    // Goal: Get just the names of all restaurants
    // map creates a NEW array by transforming each item

    // Clear the existing content
    // Step 1: Use map to get just the restaurant names
        // Hint: const names = restaurants.map(function(restaurant) {return restaurant.name;})
    // Step 2: Display the names as a simple list
        // Hint: Create a <ul> and add <li> for each name
        // Hint: You can use forEach on the names array, or join() method

    // MY CODE HERE:

    const mapButton = document.querySelector('#map-button');
    const mappedList = document.querySelector('#mapped-list');
    
    mapButton.addEventListener('click', function() {
        
        mappedList.innerHTML = '';

        // STEP 1
        const names = restaurants.map(function(restaurant) {
            return restaurant.name;
        });

        // STEP 2
        names.forEach(function(name) {
            mappedList.innerHTML += `<p>${name}</p>`;
        });
        
        console.log('Showed restaurant names using map');
    });
    



    // ======================================
    // METHOD 4: find - GET ONE SPECIFIC ITEM
    // ======================================
    
    // Goal: Find the restaurant with the highest rating (4.8)
    // find returns the FIRST item that matches your condition

    // Clear the existing content
    // Step 1: Use find to get the restaurant with rating 4.8
        // Hint: const bestRestaurant = restaurants.find(function(restaurant) {return condition;})
        // Hint: Check if restaurant.rating === 4.8
    // Step 2: Display the found restaurant
        // Hint: Check if bestRestaurant exists first
        // Hint: Show the name, cuisine, and rating
        
    // MY CODE HERE:
    
    const findButton = document.querySelector('#find-button');
    const foundItem = document.querySelector('#found-item');
    
    findButton.addEventListener('click', function() {

        foundItem.innerHTML = '';

        // STEP 1
        const topRestaurant = restaurants.find(function(restaurant) {
            return restaurant.rating === 4.8;
        });
        
        // STEP 2
        if (topRestaurant) {
            foundItem.innerHTML += `
                <div>
                    <p>${topRestaurant.name}</p>
                    <p>${topRestaurant.cuisine}</p>
                    <p>Rating: ${topRestaurant.rating}</p>
                </div>
            `;
        } else {
            foundItem.innerHTML = '<p>No restaurant found with rating 4.8</p>';
        }
        
        console.log('Found best restaurant using find');
    });
});




// ==============================
// HELPER FUNCTIONS FOR DEBUGGING
// ==============================

// Show what each method returns
function demonstrateMethods() {
    console.log('=== Method Demonstrations ===');
    
    // forEach - does something to each item, returns nothing
    console.log('forEach example:');
    restaurants.forEach(function(restaurant) {
        console.log(`- ${restaurant.name} (${restaurant.cuisine})`);
    });
    
    // filter - returns new array with matching items
    const cheap = restaurants.filter(function(restaurant) {
        return restaurant.priceRange === '$' || restaurant.priceRange === '$$';
    });
    console.log('filter example (cheap restaurants):', cheap.length, 'found');
    
    // map - returns new array with transformed items
    const names = restaurants.map(function(restaurant) {
        return restaurant.name;
    });
    console.log('map example (names):', names);
    
    // find - returns first matching item
    const best = restaurants.find(function(restaurant) {
        return restaurant.rating === 4.8;
    });
    console.log('find example (best):', best ? best.name : 'not found');
}

// Clear all displays
function clearAllDisplays() {
    document.querySelector('#restaurant-list').innerHTML = '<p class="placeholder">Click button to display all restaurants</p>';

    document.querySelector('#filtered-list').innerHTML = '<p class="placeholder">Click button to show only affordable restaurants</p>';

    document.querySelector('#mapped-list').innerHTML = '<p class="placeholder">Click button to show just the restaurant names</p>';

    document.querySelector('#found-item').innerHTML = '<p class="placeholder">Click button to find the highest rated restaurant</p>';
    
    console.log('All displays cleared');
}




// Call these in the browser console:
// demonstrateMethods() - see what each method does
// clearAllDisplays() - reset all displays