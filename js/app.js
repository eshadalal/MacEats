// Select input and button
const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('button');

// Add event listener for search
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (query) {
        // Filter data based on the query
        const results = data.filter(item =>
            item.name.toLowerCase().includes(query) || 
            item.tags.some(tag => tag.toLowerCase().includes(query))
        );

        // Display results
        displayResults(results);
    } else {
        console.log('No results found.');
    }
});

// Display search results
function displayResults(results) {
    const container = document.querySelector('.container');

    // Remove old results
    const oldResults = document.querySelector('.results');
    if (oldResults) oldResults.remove();

    // Create results container
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'results';

    if (results.length > 0) {
        results.forEach(result => {
            const item = document.createElement('div');
            item.className = 'result-item';

            // Add name
            const name = document.createElement('h3');
            name.textContent = result.name;
            item.appendChild(name);

            // Add tags
            const tags = document.createElement('p');
            tags.textContent = `${result.tags.join(", ")}`;
            item.appendChild(tags);

            resultsDiv.appendChild(item);
        });
    } else {
        resultsDiv.textContent = 'No results found.';
    }

    container.appendChild(resultsDiv);
}

const data = [
    { name: "Local Striploin Steak", tags: ["halal", "Bistro@MKR"] },
    { name: "Grilled Chicken Breast", tags: ["halal", "Bistro@MKR"] },
    { name: "Grilled Caprese Sandwich", tags: ["halal", "Bistro@MKR"] },
    { name: "Rigatoni Bolognese", tags: ["halal", "Bistro@MKR"] },
    { name: "Bistro Classic Burger", tags: ["halal", "Bistro@MKR"] },
    { name: "Beyond Classic Burger", tags: ["vegan", "Bistro@MKR"] },
    { name: "Spinach & Mushroom Fettuccine", tags: ["vegan", "Bistro@MKR"] },
    { name: "Mac and Cheese", tags: ["vegetarian", "Bistro@MKR"] },
    { name: "Enchiladas", tags: ["vegan", "Bistro@MKR"] },
    { name: "Black Bean Quesadilla", tags: ["vegan", "Bistro@MKR"] },
    { name: "Mexican Pulled Chicken Quesadilla", tags: ["halal", "Bistro@MKR"] },
    { name: "Bruschetta & Arugula Pizza", tags: ["vegetarian", "Bistro@MKR"] },
    { name: "BBQ Chicken Pizza", tags: ["halal", "Bistro@MKR"] },
    { name: "Basil Pesto Pizza", tags: ["vegetarian", "Bistro@MKR"] },
    { name: "Build Your Own Pizza", tags: ["vegetarian", "Bistro@MKR"] },
    { name: "Teriyaki Chicken or Tofu", tags: ["vegan", "halal", "Bistro@MKR"] },
    { name: "General Tso Chicken or Tofu", tags: ["vegan", "halal", "Bistro@MKR"] },
    { name: "Bulgogi", tags: ["halal", "Bistro@MKR"] },
    { name: "Japanese Udon Stir Fry", tags: ["halal", "vegan", "Bistro@MKR"] },
    { name: "Wok Fried Rice", tags: ["vegetarian", "halal", "Bistro@MKR"] },
    { name: "Wonton Soup", tags: ["Bistro@MKR"] },
    { name: "Black Pepper Beef", tags: ["halal", "Bistro@MKR"] },
    { name: "Wok Stir Fry", tags: ["halal", "vegan", "Bistro@MKR"] },
    { name: "Chow Mein", tags: ["vegetarian", "Bistro@MKR"] },
    { name: "Mapo Tofu", tags: ["Bistro@MKR"] },
    { name: "Bibimbap", tags: ["Bistro@MKR"] },
    { name: "Kimchi Jjigae", tags: ["vegan", "Bistro@MKR"] },
    { name: "Kimchi Fried Rice", tags: ["halal", "vegan", "Bistro@MKR"] },
    { name: "Adobo Chicken", tags: ["halal", "Bistro@MKR"] },
    { name: "Pancit Canton", tags: ["vegan", "halal", "Bistro@MKR"] },
    { name: "Kare-Kare", tags: ["Bistro@MKR"] },
    { name: "Pangang Curry", tags: ["Bistro@MKR"] },
    { name: "Mango Chicken", tags: ["halal", "Bistro@MKR"] },
    { name: "Thai Spicy Noodle", tags: ["halal", "Bistro@MKR"] },
    { name: "Bami Goreng", tags: ["halal", "Bistro@MKR"] },
    { name: "Satay Style Beef", tags: ["halal", "Bistro@MKR"] },
    { name: "Chicken Katsu Curry", tags: ["halal", "Bistro@MKR"] },
    { name: "Ramen Style Chicken Soup", tags: ["halal", "Bistro@MKR"] },
    { name: "Poke Bowl", tags: ["Bistro@MKR"] },
    { name: "Mediterranean Salad", tags: ["vegan", "Bistro@MKR"] },
    { name: "Garden Salad", tags: ["vegan", "Bistro@MKR"] },
    { name: "Pork Carnitas Burrito Bowl", tags: ["Bistro@MKR"] },
    { name: "Malibu Bowl", tags: ["vegan", "Bistro@MKR"] },
    { name: "1/4 Rotisserie Chicken Feature", tags: ["halal", "Bistro@MKR"] },
    { name: "Roast Dish", tags: ["Bistro@MKR"] },
    { name: "Veggie Dish", tags: ["Bistro@MKR"] },
    { name: "Braise Dish", tags: ["Bistro@MKR"] },
    { name: "Fruit Smoothie", tags: ["Bistro@MKR, Booster Juice"] },
    { name: "Milkshakes", tags: ["Bistro@MKR"] },
    { name: "Sweet Treats", tags: ["Bistro@MKR, Booster Juice"] },
    { name: "Gourmet Desserts", tags: ["Bistro@MKR"] },
    { name: "Waffles", tags: ["Bistro@MKR"] },
    { name: "Bubble Tea", tags: ["Bistro@MKR"] },
    { name: "Mac Breakfast", tags: ["Bistro-2-Go", "halal"] },
    { name: "Basic Breakfast", tags: ["Bistro-2-Go"] },
    { name: "Avocado Toast", tags: ["Bistro-2-Go", "vegan"] },
    { name: "Egg and Cheese Bagel", tags: ["Bistro-2-Go"] },
    { name: "Bagel B.E.L.T", tags: ["Bistro-2-Go"] },
    { name: "Pancakes", tags: ["Bistro-2-Go", "vegetarian"] },
    { name: "Mac Wrap", tags: ["Bistro-2-Go"] },
    { name: "OG Mash Burger", tags: ["Bistro-2-Go", "halal"] },
    { name: "Grilled Chicken BLT", tags: ["Bistro-2-Go"] },
    { name: "Plant-based Burger", tags: ["Bistro-2-Go", "vegan"] },
    { name: "Plant-based Chili", tags: ["Bistro-2-Go", "vegetarian"] },
    { name: "Chicken Tenders", tags: ["Bistro-2-Go", "halal"] },
    { name: "Basic Perogies", tags: ["Bistro-2-Go", "vegetarian"] },
    { name: "Basic Gyoza", tags: ["Bistro-2-Go", "vegan"] },
    { name: "Chicken Caesar Wrap", tags: ["Bistro-2-Go"] },
    { name: "Pulled Pork", tags: ["Bistro-2-Go", "vegetarian"] },
    { name: "Traditional Poutine", tags: ["Bistro-2-Go", "vegetarian"] },
    { name: "Basic Perogy", tags: ["Bistro-2-Go", "vegetarian"] },
    { name: "Basic Gyoza", tags: ["Bistro-2-Go", "vegan"] },
    { name: "Chicken Shawarma", tags: ["Bistro-2-Go", "halal"] },
    { name: "Pulled Pork", tags: ["Bistro-2-Go"] },
    { name: "Chili", tags: ["Bistro-2-Go", "vegetarian"] },
    { name: "BGC", tags: ["Bistro-2-Go"] },
    { name: "Pulled Pork", tags: ["Bistro-2-Go"] },
    { name: "Santa Fe", tags: ["Bistro-2-Go", "vegan"] },
    { name: "Nashville Chicken", tags: ["Bistro-2-Go", "halal"] },
    { name: "Falafel", tags: ["Bistro-2-Go", "vegetarian"] },
    { name: "Nashville Chicken", tags: ["Bistro-2-Go", "halal"] },
    { name: "Shawarma Chicken", tags: ["Bistro-2-Go", "halal"] },
    { name: "Juice", tags: ["Booster Juice"] },
    { name: "Turkey Bacon Egg Mac", tags: ["Cafe One", "halal"] },
    { name: "Chicken Quesadilla", tags: ["Cafe One"] },
    { name: "Turkey Bacon Melt", tags: ["Cafe One"] },
    { name: "Grilled Cheese", tags: ["Cafe One", "vegetarian"] },
    { name: "Beef Burrito", tags: ["Cafe One"] },
    { name: "Soup of the Day Combo", tags: ["Cafe One"] },
    { name: "Coffee", tags: ["Cafe One", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Tea", tags: ["Cafe One", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Hot Chocolate", tags: ["Cafe One", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Cappuccino", tags: ["Cafe One", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Assorted Breakfast Pastry", tags: ["Cafe One", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Assorted Savoury Pastry", tags: ["Cafe One", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Cinnamon Bun", tags: ["Cafe One", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Butter Croissant", tags: ["Cafe One", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Specialty Croissant", tags: ["Cafe One", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Assorted Muffin", tags: ["Cafe One", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Assorted Cookie", tags: ["Cafe One", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Assorted Donut (Regular)", tags: ["Cafe One", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Assorted Donut (Premium)", tags: ["Cafe One", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Assorted Danish", tags: ["Cafe One", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Coffee", tags: ["Caffeine the Elements", "Fireball Cafe", "Starbucks", "Tim Hortons", "Second Cup"] },
    { name: "Tea", tags: ["Caffeine the Elements", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Hot Chocolate", tags: ["Caffeine the Elements", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Americano", tags: ["Caffeine the Elements", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Cappuccino", tags: ["Caffeine the Elements", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Hot Latte", tags: ["Caffeine the Elements", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Mocha", tags: ["Caffeine the Elements", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Espresso", tags: ["Caffeine the Elements", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Cold Brewed Iced Tea", tags: ["Caffeine the Elements", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Iced Coffee", tags: ["Caffeine the Elements", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Infused Lemonade", tags: ["Caffeine the Elements", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Handcrafted Soda", tags: ["Caffeine the Elements", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Iced Latte", tags: ["Caffeine the Elements", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Green Tea Matcha", tags: ["Caffeine the Elements", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "London Fog Latte", tags: ["Caffeine the Elements", "Tim Hortons", "Second Cup", "Starbucks"] },
    { name: "Pumpkin Spice", tags: ["Caffeine the Elements", "Tim Hortons", "Second Cup", "Starbucks"] },     
    { name: "Salad", tags: ["Chopped Leaf"] },
    { name: "Wrap", tags: ["Chopped Leaf"] },
    { name: "Soup", tags: ["Chopped Leaf"] },
    { name: "Honey Garlic Pork Bites", tags: ["TASTE OF HOME", "CENTRO@Commons"] },
    { name: "Oh My Cod", tags: ["TASTE OF HOME", "CENTRO@Commons"] },
    { name: "Jerk Chicken", tags: ["TASTE OF HOME", "halal", "gluten free", "CENTRO@Commons"] },
    { name: "Wonton Soup", tags: ["TASTE OF HOME", "CENTRO@Commons"] },
    { name: "Chicken Noodle Bowl", tags: ["TASTE OF HOME", "CENTRO@Commons"] },
    { name: "Rice", tags: ["TASTE OF HOME", "CENTRO@Commons"] },
    { name: "Naan Bread", tags: ["TASTE OF HOME", "CENTRO@Commons"] },
    { name: "Vegetables", tags: ["TASTE OF HOME", "CENTRO@Commons"] },
    { name: "Honey Garlic Pork Bites", tags: ["TASTE OF HOME", "CENTRO@Commons"] },
    { name: "Crispy Tempura Shrimp", tags: ["TASTE OF HOME", "CENTRO@Commons"] },
    { name: "Roasted Char Sui Pork", tags: ["TASTE OF HOME", "gluten free", "CENTRO@Commons"] },
    { name: "General Tso", tags: ["TASTE OF HOME", "gluten free", "halal", "CENTRO@Commons"] },
    { name: "Crispy Basa", tags: ["TASTE OF HOME", "gluten free", "CENTRO@Commons"] },
    { name: "Butter Chicken", tags: ["TASTE OF HOME", "gluten free", "halal", "CENTRO@Commons"] },
    { name: "Chana and Rice", tags: ["TASTE OF HOME", "vegetarian", "gluten free", "Signature Meal", "CENTRO@Commons"] },
    { name: "Jerk Chicken", tags: ["TASTE OF HOME", "halal", "gluten free", "CENTRO@Commons"] },
    { name: "Pork and Kimchi Dumplings", tags: ["TASTE OF HOME", "CENTRO@Commons"] },
    { name: "Wonton Soup", tags: ["TASTE OF HOME", "CENTRO@Commons"] },
    { name: "Chicken Noodle Bowl", tags: ["TASTE OF HOME", "CENTRO@Commons"] },
    { name: "Lo Mein Noodles", tags: ["TASTE OF HOME", "vegetarian", "CENTRO@Commons"] },
    { name: "Steamed White Rice", tags: ["TASTE OF HOME", "vegetarian", "gluten free", "CENTRO@Commons"] },
    { name: "Brown Basmati Rice", tags: ["TASTE OF HOME", "vegetarian", "gluten free", "CENTRO@Commons"] },
    { name: "Market Vegetables", tags: ["TASTE OF HOME", "gluten free", "CENTRO@Commons"] },
    { name: "Naan Bread", tags: ["TASTE OF HOME", "vegetarian", "CENTRO@Commons"] },
    { name: "Mashed Potatoes", tags: ["TASTE OF HOME", "vegetarian", "gluten free", "CENTRO@Commons"] },
    { name: "The Steeltown", tags: ["TASTE OF HOME", "halal", "CENTRO@Commons"] },
    { name: "Beyond Burger", tags: ["TASTE OF HOME", "vegetarian", "CENTRO@Commons"] },
    { name: "Local Chicken Tenders", tags: ["TASTE OF HOME", "halal", "CENTRO@Commons"] },
    { name: "Poutine", tags: ["TASTE OF HOME", "vegetarian", "CENTRO@Commons"] },
    { name: "Fresh Cut Fries", tags: ["TASTE OF HOME", "vegetarian", "CENTRO@Commons"] },
    { name: "Build Your Own MEAL", tags: ["PARAMOUNT", "CENTRO@Commons"] },
    { name: "Build Your Own Salad", tags: ["PARAMOUNT", "CENTRO@Commons"] },
    { name: "Build Your Own Yalla Special", tags: ["PARAMOUNT", "CENTRO@Commons"] },
    { name: "Build Your Own Poutine", tags: ["PARAMOUNT", "CENTRO@Commons"] },
    { name: "Wraps", tags: ["PARAMOUNT", "CENTRO@Commons"] },
    { name: "Chicken Shawarma", tags: ["PARAMOUNT", "CENTRO@Commons"] },
    { name: "Shish Tawouk", tags: ["PARAMOUNT", "CENTRO@Commons"] },
    { name: "Falafel", tags: ["PARAMOUNT", "CENTRO@Commons"] },
    { name: "Mushroom Shawarma", tags: ["PARAMOUNT", "CENTRO@Commons"] },
    { name: "Plant-based Shawarma", tags: ["PARAMOUNT", "CENTRO@Commons"] },
    { name: "Piri Piri Chicken Leg Dinner", tags: ["PARAMOUNT", "CENTRO@Commons"] },
    { name: "Baklawa Desserts", tags: ["PARAMOUNT", "CENTRO@Commons"] },
    { name: "Strawberry Juice", tags: ["PARAMOUNT", "CENTRO@Commons"] },
    { name: "Mango Juice", tags: ["PARAMOUNT", "CENTRO@Commons"] },
    { name: "Breakfast Skillet", tags: ["PAS NOODLE", "vegetarian", "CENTRO@Commons"] },
    { name: "Build Your Own Omelette", tags: ["PAS NOODLE", "CENTRO@Commons"] },
    { name: "Build Your Own Pasta With Vegetables", tags: ["PAS NOODLE", "CENTRO@Commons"] },
    { name: "Build Your Own Pasta with Vegetables and One Protein", tags: ["PAS NOODLE", "CENTRO@Commons"] },
    { name: "Build Your Own Pasta With Vegetables and Two Proteins", tags: ["PAS NOODLE", "CENTRO@Commons"] },
    { name: "Baked Chicken Parmesan With Pasta", tags: ["PAS NOODLE", "halal", "CENTRO@Commons"] },
    { name: "Garlic Bread", tags: ["PAS NOODLE", "vegetarian", "CENTRO@Commons"] },
    { name: "Garlic Bread with Cheese", tags: ["PAS NOODLE", "vegetarian", "CENTRO@Commons"] },
    { name: "Cheese Pizza", tags: ["PAS NOODLE", "vegetarian", "CENTRO@Commons"] },
    { name: "BBQ Chicken Pizza", tags: ["PAS NOODLE", "halal", "CENTRO@Commons"] },
    { name: "Mediterranean Veggie Pizza", tags: ["PAS NOODLE", "vegetarian", "CENTRO@Commons"] },
    { name: "Mediterranean Chicken Pizza", tags: ["PAS NOODLE", "halal", "CENTRO@Commons"] },
    { name: "Pepperoni Pizza", tags: ["PAS NOODLE", "halal", "CENTRO@Commons"] },
    { name: "Spicy Chicken Sandwich", tags: ["CRAVE", "CENTRO@Commons"] },
    { name: "Cauliflower Wings", tags: ["CRAVE", "vegetarian", "CENTRO@Commons"] },
    { name: "Chicken Quesadilla", tags: ["CRAVE", "CENTRO@Commons"] },
    { name: "Chicken Caesar Wrap", tags: ["CRAVE", "CENTRO@Commons"] },
    { name: "Beef Enchiladas", tags: ["CRAVE", "CENTRO@Commons"] },
    { name: "Turkey Bacon Melt", tags: ["CRAVE", "CENTRO@Commons"] },
    { name: "Not Your Average Grilled Cheese", tags: ["CRAVE", "vegetarian", "CENTRO@Commons"] },
    { name: "WOWZA! Chicken and Tater Tots", tags: ["CRAVE", "CENTRO@Commons"] },
    { name: "Side Tater Tots", tags: ["CRAVE", "vegan", "CENTRO@Commons"] },
    { name: "Mexican Churros", tags: ["CRAVE", "vegetarian", "CENTRO@Commons"] },
    { name: "Burrito Bowl", tags: ["CRAVE", "vegetarian", "gluten free", "CENTRO@Commons"] },
    { name: "Fries", tags: ["CRAVE", "vegan", "CENTRO@Commons"] },
    { name: "Sweet Potato Fries", tags: ["CRAVE", "vegan", "CENTRO@Commons"] },
    { name: "Daily Soup 12 oz", tags: ["CRAVE", "CENTRO@Commons"] },
    { name: "Full Fruit Waffle", tags: ["CRAVE", "vegetarian", "CENTRO@Commons"] },
    { name: "Half Fruit Waffle", tags: ["CRAVE", "vegetarian", "CENTRO@Commons"] },
    { name: "Plain Waffle", tags: ["CRAVE", "vegetarian", "CENTRO@Commons"] },
    { name: "Gluten-free, vegan waffles", tags: ["CRAVE", "gluten free", "CENTRO@Commons"] },
    { name: "Build Your Own Smoothie", tags: ["CRAVEABLES", "CENTRO@Commons"] },
    { name: "Belgian Waffle", tags: ["CRAVEABLES", "CENTRO@Commons"] },
    { name: "Full Fruit Waffle", tags: ["CRAVEABLES", "vegetarian", "CENTRO@Commons"] },
    { name: "Half Waffle with Fruit", tags: ["CRAVEABLES", "vegetarian", "CENTRO@Commons"] },
    { name: "Full Waffle with Syrup", tags: ["CRAVEABLES", "vegetarian", "CENTRO@Commons"] },
    { name: "Milkshakes", tags: ["CRAVEABLES", "CENTRO@Commons"] },
    { name: "Sundaes", tags: ["CRAVEABLES", "CENTRO@Commons"] },
    { name: "Good Morning Classic", tags: ["STEELTOWN GRILLE", "CENTRO@Commons"] },
    { name: "Plant-based Breakfast Burrito", tags: ["STEELTOWN GRILLE", "vegan", "CENTRO@Commons"] },
    { name: "Hungry Marauder", tags: ["STEELTOWN GRILLE", "CENTRO@Commons"] },
    { name: "Breakfast Wrap", tags: ["STEELTOWN GRILLE", "CENTRO@Commons"] },
    { name: "Two Egg Breakfast", tags: ["STEELTOWN GRILLE", "vegetarian", "CENTRO@Commons"] },
    { name: "Korean Street Toast", tags: ["STEELTOWN GRILLE", "CENTRO@Commons"] },
    { name: "Chipotle Steak and Egg Wrap", tags: ["STEELTOWN GRILLE", "halal", "CENTRO@Commons"] },
    { name: "Extra egg", tags: ["STEELTOWN GRILLE", "vegetarian", "gluten free", "CENTRO@Commons"] },
    { name: "Extra hashbrown", tags: ["STEELTOWN GRILLE", "vegan", "CENTRO@Commons"] },
    { name: "Sausage", tags: ["STEELTOWN GRILLE", "gluten free", "CENTRO@Commons"] },
    { name: "Bacon", tags: ["STEELTOWN GRILLE", "gluten free", "CENTRO@Commons"] },
    { name: "Turkey Bacon", tags: ["STEELTOWN GRILLE", "gluten free", "CENTRO@Commons"] },
    { name: "Tater Tots Beef Supreme", tags: ["STEELTOWN GRILLE", "CENTRO@Commons"] },
    { name: "Traditional Poutine", tags: ["STEELTOWN GRILLE", "vegetarian", "CENTRO@Commons"] },
    { name: "Plant-based Poutine", tags: ["STEELTOWN GRILLE", "vegan", "CENTRO@Commons"] },
    { name: "Mac Chicken", tags: ["STEELTOWN GRILLE", "halal", "CENTRO@Commons"] },
    { name: "Local Chicken Tenders", tags: ["STEELTOWN GRILLE", "halal", "CENTRO@Commons"] },
    { name: "Buffalo Chicken Wrap", tags: ["STEELTOWN GRILLE", "halal", "CENTRO@Commons"] },
    { name: "Beyond Burger", tags: ["STEELTOWN GRILLE", "vegan", "CENTRO@Commons"] },
    { name: "Beyond Ghost Pepper Crunch", tags: ["STEELTOWN GRILLE", "vegetarian", "CENTRO@Commons"] },
    { name: "The Steeltown", tags: ["STEELTOWN GRILLE", "halal", "CENTRO@Commons"] },
    { name: "New York Steak Sandwich", tags: ["STEELTOWN GRILLE", "halal", "CENTRO@Commons"] },
    { name: "Ontario Cheddar cheese", tags: ["STEELTOWN GRILLE", "vegetarian", "gluten free", "CENTRO@Commons"] },
    { name: "Vegan cheese", tags: ["STEELTOWN GRILLE", "vegan", "gluten free", "CENTRO@Commons"] },
    { name: "Bacon", tags: ["STEELTOWN GRILLE", "gluten free", "CENTRO@Commons"] },
    { name: "Fresh Cut Fries", tags: ["STEELTOWN GRILLE", "vegan", "CENTRO@Commons"] },
    { name: "Sweet Potato Fries", tags: ["STEELTOWN GRILLE", "vegan", "CENTRO@Commons"] },
    { name: "House-made Gravy", tags: ["STEELTOWN GRILLE", "vegan", "gluten free", "CENTRO@Commons"] },
    { name: "Side Tater Tots", tags: ["STEELTOWN GRILLE", "vegan", "CENTRO@Commons"] },
    { name: "Coffee", tags: ["E-Cafe"] },
    { name: "Tea", tags: ["E-Cafe"] },
    { name: "Hot Chocolate", tags: ["E-Cafe"] },
    { name: "Flavoured Cappuccino", tags: ["E-Cafe"] },
    { name: "French Vanilla", tags: ["E-Cafe"] },
    { name: "Assorted Muffins", tags: ["E-Cafe"] },
    { name: "Assorted Cookies", tags: ["E-Cafe"] },
    { name: "Croissant", tags: ["E-Cafe"] },
    { name: "Cheese Croissant", tags: ["E-Cafe"] },
    { name: "Chocolate Croissant", tags: ["E-Cafe"] },
    { name: "Cinnamon Buns", tags: ["E-Cafe"] },
    { name: "Assorted Danish", tags: ["E-Cafe"] },
    { name: "Savoury Pastry", tags: ["E-Cafe"] },
    { name: "Strudel", tags: ["E-Cafe"] },
    { name: "Assorted Donut Regular", tags: ["E-Cafe"] },
    { name: "Premium", tags: ["E-Cafe"] }, 
    { name: "Chicken Quesadilla", tags: ["IAHS Cafe"] },
    { name: "Grilled Cheese", tags: ["IAHS Cafe", "vegetarian"] },
    { name: "Pretzel Reuben Melt", tags: ["IAHS Cafe"] },
    { name: "Turkey B.L.T.A", tags: ["IAHS Cafe"] },
    { name: "Smashed Chickpea Sandwich", tags: ["IAHS Cafe", "vegan"] },
    { name: "Crispy Buffalo Cauli Wrap", tags: ["IAHS Cafe", "vegetarian"] },
    { name: "Chicken Pesto Sandwich", tags: ["IAHS Cafe", "halal"] },
    { name: "Weekly Feature", tags: ["IAHS Cafe"] },
    { name: "Southwest Rice Bowl", tags: ["IAHS Cafe", "gluten free"] },
    { name: "Chicken Shawarma Rice Bowl", tags: ["IAHS Cafe", "halal"] },
    { name: "Mediterranean Rice Bowl", tags: ["IAHS Cafe", "gluten free", "halal"] },
    { name: "Coffee", tags: ["IAHS Cafe"] },
    { name: "Tea", tags: ["IAHS Cafe"] },
    { name: "Cappuccino", tags: ["IAHS Cafe"] },
    { name: "Hot Chocolate", tags: ["IAHS Cafe"] },
    { name: "Ultimate Egg Breakfast Sandwich", tags: ["IAHS Cafe"] },
    { name: "Ultimate Tofu Breakfast Sandwich", tags: ["IAHS Cafe", "vegan"] },
    { name: "Toasted Western", tags: ["IAHS Cafe"] },
    { name: "Toasted Tofu Western", tags: ["IAHS Cafe", "vegan"] },
    { name: "Double Blueberry Shortstack", tags: ["IAHS Cafe", "vegan"] },
    { name: "Peaches ‘n Cream Waffles", tags: ["IAHS Cafe", "vegan"] },
    { name: "Spiced Banana and Honey French Toast", tags: ["IAHS Cafe", "vegan"] },
    { name: "Hoisin Chicken Rice Bowl", tags: ["IAHS Cafe", "halal"] },
    { name: "Hoisin Tofu Rice Bowl", tags: ["IAHS Cafe", "vegan"] },
    { name: "Butter Chicken Rice Bowl", tags: ["IAHS Cafe", "halal"] },
    { name: "Chana Masala Rice Bowl", tags: ["IAHS Cafe", "vegan"] },
    { name: "Shawarma Rice Bowl", tags: ["IAHS Cafe", "halal"] },
    { name: "Falafel Rice Bowl", tags: ["IAHS Cafe", "vegan"] },
    { name: "Teriyaki Salmon Rice Bowl", tags: ["IAHS Cafe"] },
    { name: "Teriyaki Tofu Rice Bowl", tags: ["IAHS Cafe", "vegan"] },
    { name: "Roasted Red Pepper Rigatoni", tags: ["IAHS Cafe", "vegan"] },
    { name: "Famous Teriyaki", tags: ["Teriyaki"] },
    { name: "Hot and Spicy Chicken Teriyaki", tags: ["Teriyaki"] },
    { name: "Pan Asian Shrimp Teriyaki", tags: ["Teriyaki"] },
    { name: "Teriyaki Protein Bowl", tags: ["Teriyaki"] },
    { name: "Bento Box", tags: ["Teriyaki"] },
    { name: "Ramen Soup", tags: ["Teriyaki"] },
    { name: "Spicy Salmon Sushi Bowl", tags: ["Teriyaki"] },
    { name: "Dynamite Sushi Bowl", tags: ["Teriyaki"] },
    { name: "Salmon Poke Bowl", tags: ["Teriyaki"] },
    { name: "Coffee", tags: ["Math Cafe"] },
    { name: "Tea", tags: ["Math Cafe"] },
    { name: "Hot Chocolate", tags: ["Math Cafe"] },
    { name: "Cappuccino", tags: ["Math Cafe"] },
    { name: "Ice London Fog", tags: ["Math Cafe"] },
    { name: "Iced Matcha Tea", tags: ["Math Cafe"] },
    { name: "Iced Chai Latte", tags: ["Math Cafe"] },
    { name: "Iced Coffee", tags: ["Math Cafe"] },
    { name: "Assorted Muffins", tags: ["Math Cafe"] },
    { name: "Assorted Cookies", tags: ["Math Cafe"] },
    { name: "Croissant", tags: ["Math Cafe"] },
    { name: "Cheese Croissant", tags: ["Math Cafe"] },
    { name: "Chocolate Croissant", tags: ["Math Cafe"] },
    { name: "Cinnamon Buns", tags: ["Math Cafe"] },
    { name: "Assorted Danish", tags: ["Math Cafe"] },
    { name: "Savoury Pastry", tags: ["Math Cafe"] },
    { name: "Strudel", tags: ["Math Cafe"] },
    { name: "Assorted Donut (Regular)", tags: ["Math Cafe"] },
    { name: "Assorted Donuts (Premium)", tags: ["Math Cafe"] },
    { name: "Coffee | Medium, Dark Roast", tags: ["The Reactor Cafe"] },
    { name: "Tea | English Breakfast, Earl Grey, Green, Mint, Lemon, Chai", tags: ["The Reactor Cafe"] },
    { name: "Hot Chocolate | Dark, White", tags: ["The Reactor Cafe"] },
    { name: "Cappuccino | French Vanilla", tags: ["The Reactor Cafe"] },
    { name: "Americano", tags: ["The Reactor Cafe"] },
    { name: "Cappuccino", tags: ["The Reactor Cafe"] },
    { name: "Latte", tags: ["The Reactor Cafe"] },
    { name: "Tea Latte | Green, Chai", tags: ["The Reactor Cafe"] },
    { name: "London Fog", tags: ["The Reactor Cafe"] },
    { name: "Mocha | Dark, White", tags: ["The Reactor Cafe"] },
    { name: "Espresso | Single, Double", tags: ["The Reactor Cafe"] },
    { name: "Iced Coffee | Vanilla, Hazelnut, Caramel", tags: ["The Reactor Cafe"] },
    { name: "Iced Latte", tags: ["The Reactor Cafe"] },
    { name: "Iced Tea Latte | Green, Chai", tags: ["The Reactor Cafe"] },
    { name: "Dasani", tags: ["The Reactor Cafe"] },
    { name: "Smart Water", tags: ["The Reactor Cafe"] },
    { name: "Vitamin Water", tags: ["The Reactor Cafe"] },
    { name: "Juice", tags: ["The Reactor Cafe"] },
    { name: "Pop", tags: ["The Reactor Cafe"] },
    { name: "2% or Chocolate Milk", tags: ["The Reactor Cafe"] },
    { name: "Pizza | Pepperoni, Vegetarian, Chicken", tags: ["The Reactor Cafe", "halal", "vegetarian"] },
    { name: "Jamaican Patty | Mild, Spicy, Vegetable, Chicken", tags: ["The Reactor Cafe", "halal", "vegetarian"] },
    { name: "Bagel With Cream Cheese (Herb & Garlic; Plain Cream)", tags: ["The Reactor Cafe", "vegetarian"] },
    { name: "Bagel With Peanut Butter Jelly", tags: ["The Reactor Cafe", "vegan"] },
    { name: "Grilled Cheese Sandwich", tags: ["The Reactor Cafe", "vegetarian"] },
    { name: "Samosas", tags: ["The Reactor Cafe", "vegan"] },
    { name: "Garlic Sticks", tags: ["The Reactor Cafe", "vegetarian"] },
    { name: "Reactor Chicken Quesadilla", tags: ["The Reactor Cafe", "halal"] },
    { name: "Reactor Veggie Quesadilla", tags: ["The Reactor Cafe", "vegetarian"] },
    { name: "Egg, Bacon, Spinach & Avocado Bagel", tags: ["Williams Fresh Cafe", "halal"] },
    { name: "Toasted Western", tags: ["Williams Fresh Cafe"] },
    { name: "Bacon, Egg & Cheese Bagel", tags: ["Williams Fresh Cafe"] },
    { name: "Egg, Tomato, Spinach & Avocado Bagel", tags: ["Williams Fresh Cafe", "vegetarian"] },
    { name: "Cheesy Egg & Bacon Wrap", tags: ["Williams Fresh Cafe"] },
    { name: "Toasted Bagel", tags: ["Williams Fresh Cafe"] },
    { name: "Classic Turkey Clubhouse", tags: ["Williams Fresh Cafe"] },
    { name: "Turkey Apple Cranberry", tags: ["Williams Fresh Cafe"] },
    { name: "Chicken Pesto Panini", tags: ["Williams Fresh Cafe"] },
    { name: "Roasted Vegetable and Goat Cheese Panini", tags: ["Williams Fresh Cafe", "vegetarian"] },
    { name: "B.L.T. & Avocado", tags: ["Williams Fresh Cafe"] },
    { name: "Chicken Caesar Wrap", tags: ["Williams Fresh Cafe", "halal"] },
    { name: "Albacore Tuna & Swiss Wrap", tags: ["Williams Fresh Cafe"] },
    { name: "Fresh Vegetable & Swiss Wrap", tags: ["Williams Fresh Cafe", "vegetarian"] },
    { name: "Williams Power Bowl", tags: ["Williams Fresh Cafe"] },
    { name: "Classic Chicken Caesar Salad", tags: ["Williams Fresh Cafe"] },
    { name: "Sunshine Salad", tags: ["Williams Fresh Cafe", "vegetarian"] },
    { name: "Williams Signature House Salad", tags: ["Williams Fresh Cafe", "vegetarian"] },
    { name: "Classic Caesar Salad", tags: ["Williams Fresh Cafe"] },
    { name: "Bacon & Tomato Grilled Cheese", tags: ["Williams Fresh Cafe"] },
    { name: "Jalapeno Popper Grilled Cheese", tags: ["Williams Fresh Cafe", "vegetarian"] },
    { name: "Classic Grilled Cheese", tags: ["Williams Fresh Cafe", "vegetarian"] },
    { name: "Mango Chipotle Chicken", tags: ["Williams Fresh Cafe", "halal"] },
    { name: "Vegetarian", tags: ["Williams Fresh Cafe", "vegetarian"] },
    { name: "Roasted Red Pepper & Tomato Bisque", tags: ["Williams Fresh Cafe", "vegetarian"] },
    { name: "Soup of the day", tags: ["Williams Fresh Cafe"] },
    { name: "Williams Signature Blend Coffee", tags: ["Williams Fresh Cafe"] },
    { name: "Tea (Black, Green, Herbal)", tags: ["Williams Fresh Cafe"] },
    { name: "Espresso", tags: ["Williams Fresh Cafe"] },
    { name: "Americano", tags: ["Williams Fresh Cafe"] },
    { name: "Cappuccino / Caffe Latte", tags: ["Williams Fresh Cafe"] },
    { name: "Hot Chocolate / Steamer", tags: ["Williams Fresh Cafe"] },
    { name: "Flavoured Latte", tags: ["Williams Fresh Cafe"] },
    { name: "Mocha", tags: ["Williams Fresh Cafe"] },
    { name: "Chai Latte/Matcha Latte/London Fog/Apple Cider", tags: ["Williams Fresh Cafe"] },
    { name: "Fresh Brewed Iced Coffee", tags: ["Williams Fresh Cafe"] },
    { name: "Cold Brewed Iced Tea", tags: ["Williams Fresh Cafe"] },
    { name: "Iced Cappuccino/Iced Latte", tags: ["Williams Fresh Cafe"] },
    { name: "Iced Vanilla Chai Latte", tags: ["Williams Fresh Cafe"] },
    { name: "Italian Soda", tags: ["Williams Fresh Cafe"] },
    { name: "Fresh Squeezed Lemonade", tags: ["Williams Fresh Cafe"] },
    { name: "Frozen Mint Matcha", tags: ["Williams Fresh Cafe"] },
    { name: "Smoothie", tags: ["Williams Fresh Cafe"] },
    { name: "Slam Dunk", tags: ["La Piazza"] },
    { name: "Two Egg Breakfast", tags: ["La Piazza"] },
    { name: "Pancakes", tags: ["La Piazza"] },
    { name: "Waffles", tags: ["La Piazza"] },
    { name: "Three Egg Omelette", tags: ["La Piazza", "vegetarian"] },
    { name: "Three Egg Omelette Wrap", tags: ["La Piazza", "vegetarian"] },
    { name: "Two Egg Breakfast", tags: ["La Piazza"] },
    { name: "Extra Egg", tags: ["La Piazza"] },
    { name: "Extra Hashbrown", tags: ["La Piazza"] },
    { name: "Extra Cheese", tags: ["La Piazza"] },
    { name: "Extra Toast", tags: ["La Piazza"] },
    { name: "Bacon or Ham", tags: ["La Piazza"] },
    { name: "Extra Topping", tags: ["La Piazza"] },
    { name: "Mac & Cheese", tags: ["La Piazza", "vegetarian"] },
    { name: "Chicken of the Week", tags: ["La Piazza", "halal"] },
    { name: "Mac & Cheese Cup", tags: ["La Piazza", "vegetarian"] },
    { name: "Vegetable of the day", tags: ["La Piazza"] },
    { name: "Potato of the day", tags: ["La Piazza"] },
    { name: "Beef Pho", tags: ["La Piazza", "Noodle Bar", "gluten free"] },
    { name: "Shoyu Pork Ramen", tags: ["La Piazza", "Noodle Bar"] },
    { name: "Dumpling and Udon", tags: ["La Piazza", "Noodle Bar"] },
    { name: "Chow Mein Noodle", tags: ["La Piazza", "Noodle Bar", "vegetarian"] },
    { name: "Gyoza", tags: ["La Piazza", "Noodle Bar", "vegan"] },
    { name: "Veggie Spring Rolls", tags: ["La Piazza", "Noodle Bar", "vegan"] },
    { name: "Extra Meat", tags: ["La Piazza", "Noodle Bar"] },
    { name: "Egg McMaster with Cheese", tags: ["La Piazza", "Hammertown", "vegetarian"] },
    { name: "Big Breakfast Crunch", tags: ["La Piazza", "Hammertown"] },
    { name: "Egg Mac with Tomato", tags: ["La Piazza", "Hammertown", "vegetarian"] },
    { name: "Bacon Breakfast Wrap", tags: ["La Piazza", "Hammertown"] },
    { name: "Egg Mac With Meat", tags: ["La Piazza", "Hammertown"] },
    { name: "Toasted Bagel with Cream Cheese", tags: ["La Piazza", "Hammertown", "vegetarian"] },
    { name: "Sausage Breakfast Wrap", tags: ["La Piazza", "Hammertown"] },
    { name: "Breakfast Bagel", tags: ["La Piazza", "Hammertown"] },
    { name: "Farmer’s Breakfast Wrap", tags: ["La Piazza", "Hammertown"] },
    { name: "Southwest Breakfast Wrap", tags: ["La Piazza", "Hammertown", "vegetarian"] },
    { name: "Spinach Feta Wrap", tags: ["La Piazza", "Hammertown", "vegetarian"] },
    { name: "Farmer’s Breakfast Wrap", tags: ["La Piazza", "Hammertown"] },
    { name: "Meatball Sub", tags: ["La Piazza", "Hammertown", "halal"] },
    { name: "Pesto Chicken", tags: ["La Piazza", "Hammertown", "halal"] },
    { name: "Grilled Cheese", tags: ["La Piazza", "Hammertown", "vegetarian"] },
    { name: "Reuben", tags: ["La Piazza", "Hammertown"] },
    { name: "Turkey Bacon Club", tags: ["La Piazza", "Hammertown"] },
    { name: "Ultimate Ham n’ Cheese", tags: ["La Piazza", "Hammertown"] },
    { name: "Daily soup", tags: ["La Piazza", "Hammertown"] },
    { name: "Pita Pocket with Falafel", tags: ["La Piazza", "Tazij", "vegan"] },
    { name: "Pita Pocket with Chicken", tags: ["La Piazza", "Tazij", "halal"] },
    { name: "Salad Bowl with Falafel", tags: ["La Piazza", "Tazij", "vegan"] },
    { name: "Salad Bowl with Chicken", tags: ["La Piazza", "Tazij", "halal"] },
    { name: "Rice Bowl with Falafel", tags: ["La Piazza", "Tazij", "vegan"] },
    { name: "Rice Bowl with Chicken", tags: ["La Piazza", "Tazij", "halal"] },
    { name: "Tazij Loaded Veggie Pocket", tags: ["La Piazza", "Tazij"] },
    { name: "Tazij Shawarma Poutine", tags: ["La Piazza", "Tazij", "halal"] },
    { name: "Tazij Chicken Platter", tags: ["La Piazza", "Tazij", "halal"] },
    { name: "Tazij Falafel Platter", tags: ["La Piazza", "Tazij", "vegan"] },
    { name: "Fries", tags: ["La Piazza", "Tazij", "gluten free"] },
    { name: "4 Falafel", tags: ["La Piazza", "Tazij", "vegan"] },
    { name: "Chipotle Steak and Egg", tags: ["La Piazza", "Steeltown Grille", "halal"] },
    { name: "Southwest Vegan Chorizo", tags: ["La Piazza", "Steeltown Grille", "vegan"] },
    { name: "Rise & Shine", tags: ["La Piazza", "Steeltown Grille", "vegetarian"] },
    { name: "Lumberjack", tags: ["La Piazza", "Steeltown Grille"] },
    { name: "The Steeltown Burger", tags: ["La Piazza", "Steeltown Grille", "halal"] },
    { name: "Grilled Chicken Sandwich", tags: ["La Piazza", "Steeltown Grille", "halal"] },
    { name: "Buffalo Chicken Wrap", tags: ["La Piazza", "Steeltown Grille"] },
    { name: "Local Chicken Tenders", tags: ["La Piazza", "Steeltown Grille"] },
    { name: "Plant Based Chick’n Nugget", tags: ["La Piazza", "Steeltown Grille", "vegan"] },
    { name: "Plant Based Buffalo Wrap", tags: ["La Piazza", "Steeltown Grille", "vegan"] },
    { name: "Ontario Cheddar Cheese", tags: ["La Piazza", "Steeltown Grille"] },
    { name: "Vegan Cheese", tags: ["La Piazza", "Steeltown Grille"] },
    { name: "Buddy Burgers", tags: ["La Piazza", "Steeltown Grille"] },
    { name: "Beef Buddy", tags: ["La Piazza", "Steeltown Grille", "halal"] },
    { name: "Chicken Buddy", tags: ["La Piazza", "Steeltown Grille", "halal"] },
    { name: "Buddy Combo", tags: ["La Piazza", "Steeltown Grille", "halal"] },
    { name: "Fresh Cut Fries", tags: ["La Piazza", "Steeltown Grille", "vegan"] },
    { name: "Sweet Potato Fries", tags: ["La Piazza", "Steeltown Grille", "vegetarian"] },
    { name: "Side Caesar Salad", tags: ["La Piazza", "Steeltown Grille", "vegetarian"] },
    { name: "Vegan Gravy", tags: ["La Piazza", "Steeltown Grille"] },
    { name: "House-made Gravy", tags: ["La Piazza", "Steeltown Grille"] },
    { name: "Chicken Quesadillas", tags: ["La Piazza", "Guacamole", "halal"] },
    { name: "Black Bean Quesadillas", tags: ["La Piazza", "Guacamole", "vegetarian"] },
    { name: "Cheese Quesadillas", tags: ["La Piazza", "Guacamole", "vegetarian"] },
    { name: "Vegan Chili", tags: ["La Piazza", "Guacamole", "vegan"] },
    { name: "Guacamole & Chips", tags: ["La Piazza", "Guacamole", "vegan"] },
    { name: "Tacos", tags: ["La Piazza", "Guacamole", "halal"] },
    { name: "Side Guacamole", tags: ["La Piazza", "Guacamole", "vegan"] },
    { name: "Burrito Bowls with Beef Barbacoa", tags: ["La Piazza", "Burrito Bowls", "halal", "gluten free"] },
    { name: "Burrito Bowls with Tex-Mex Chicken", tags: ["La Piazza", "Burrito Bowls", "halal"] },
    { name: "Burrito Bowls with Pork Carnitas", tags: ["La Piazza", "Burrito Bowls", "gluten free"] },
    { name: "Burrito Bowls with Guacamole", tags: ["La Piazza", "Burrito Bowls", "vegan", "gluten free"] },
    { name: "Burrito Salad with Beef Barbacoa", tags: ["La Piazza", "Burrito Salad", "halal", "gluten free"] },
    { name: "Burrito Salad with Tex-Mex Chicken", tags: ["La Piazza", "Burrito Salad", "halal"] },
    { name: "Burrito Salad with Pork Carnitas", tags: ["La Piazza", "Burrito Salad", "gluten free"] },
    { name: "Burrito Salad with Guacamole", tags: ["La Piazza", "Burrito Salad", "vegetarian", "gluten free"] },
    { name: "Burrito with Beef Barbacoa", tags: ["La Piazza", "Burritos", "halal"] },
    { name: "Burrito with Tex-Mex Chicken", tags: ["La Piazza", "Burritos", "halal"] },
    { name: "Burrito with Pork Carnitas", tags: ["La Piazza", "Burritos"] },
    { name: "Burrito with Guacamole", tags: ["La Piazza", "Burritos", "vegan"] },
    { name: "Cured Salmon Bowl", tags: ["La Piazza", "Indigenous Bannock Bowls"] },
    { name: "Blueberry Chicken Bowl", tags: ["La Piazza", "Indigenous Bannock Bowls", "halal"] },
    { name: "Three Sisters Bowl", tags: ["La Piazza", "Indigenous Bannock Bowls"] }
    
]; 


    
