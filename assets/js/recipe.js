// recipe

const recipes = [
    { title: "Espresso", image: "assets/images/espresso.jpg", ingredients: "Coffee Beans, Water", instructions: `
        1. Grind coffee beans finely.
        2. Tamp into espresso machine.
        3. Brew for 25-30 seconds.
        4. Serve immediately.` },
    
    { title: "Cappuccino", image: "assets/images/cappuccino.jpg", ingredients: "Espresso, Steamed Milk, Milk Foam", instructions: `
        1. Prepare an espresso shot.
        2. Steam milk to create foam.
        3. Pour milk over espresso and top with foam.
        4. Optional: Sprinkle with cocoa or cinnamon.` },

    { title: "Latte", image: "assets/images/latte.jpg", ingredients: "Espresso, Steamed Milk", instructions: `
        1. Brew an espresso shot.
        2. Steam milk until creamy.
        3. Pour steamed milk over espresso.
        4. Serve and enjoy!` },

    { title: "Mocha", image: "assets/images/mocha.jpg", ingredients: "Espresso, Steamed Milk, Chocolate Syrup", instructions: `
        1. Brew espresso.
        2. Mix chocolate syrup with espresso.
        3. Steam milk and pour over espresso.
        4. Top with whipped cream if desired.` },

    { title: "Macchiato", image: "assets/images/macchiato.jpg", ingredients: "Espresso, Foamed Milk", instructions: `
        1. Brew a strong espresso shot.
        2. Add a small dollop of foamed milk.
        3. Serve immediately.` },

    { title: "Flat White", image: "assets/images/flatwhite.jpg", ingredients: "Espresso, Steamed Milk", instructions: `
        1. Brew an espresso shot.
        2. Steam milk until creamy.
        3. Pour over espresso with minimal foam.` },

    { title: "Affogato", image: "assets/images/affogato.png", ingredients: "Espresso, Vanilla Ice Cream", instructions: `
        1. Place a scoop of vanilla ice cream in a cup.
        2. Pour hot espresso over it.
        3. Serve immediately as dessert.` },

    { title: "Irish Coffee", image: "assets/images/irishcoffee.jpg", ingredients: "Coffee, Irish Whiskey, Sugar, Whipped Cream", instructions: `
        1. Brew hot coffee.
        2. Stir in whiskey and sugar.
        3. Top with whipped cream.` },

    { title: "Turkish Coffee", image: "assets/images/turkishcoffee.jpg", ingredients: "Finely Ground Coffee, Water, Sugar (Optional)", instructions: `
        1. Mix coffee, water, and sugar in a cezve.
        2. Heat on low until foamy.
        3. Pour into a cup without stirring.` },

    { title: "Doppio", image: "assets/images/doppio.jpg", ingredients: "Double Espresso", instructions: `
        1. Brew a double shot of espresso.
        2. Serve in a small cup.` }
];

// Generate recipe cards    
const recipeContainer = document.getElementById("recipe-list");

recipes.forEach(recipe => {
    let card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
    `;
    card.onclick = () => openModal(recipe.title, recipe.image, recipe.ingredients, recipe.instructions);
    recipeContainer.appendChild(card);
});

// Open Modal without Image
function openModal(title, image, ingredients, instructions) {
    document.getElementById("recipe-title").innerText = title;
    document.getElementById("recipe-ingredients").innerText = ingredients;
    document.getElementById("recipe-instructions").innerText = instructions;

    // Hide the image or remove its src
    let recipeImage = document.getElementById("recipe-image");
    recipeImage.style.display = "none"; // Hide the image
    recipeImage.src = ""; // Remove the image source

    document.getElementById("recipeModal").style.display = "flex";
}


// Close Modal
function closeModal() {
    document.getElementById("recipeModal").style.display = "none";
}

// Search
function searchRecipe() {
    let input = document.getElementById("search-box").value.toLowerCase();
    let cards = document.querySelectorAll(".recipe-card");

    cards.forEach(card => {
        let title = card.querySelector("h3").innerText.toLowerCase();
        card.style.display = title.includes(input) ? "block" : "none";
    });
}





//testominal 
document.addEventListener("DOMContentLoaded", () => {
    fetchTestimonials();

    document.getElementById("testimonial-form").addEventListener("submit", (e) => {
        e.preventDefault();

        let formData = new FormData(document.getElementById("testimonial-form"));

        fetch("submit_testimonial.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            document.getElementById("testimonial-form").reset();
            fetchTestimonials();
        });
    });
});

function fetchTestimonials() {
    fetch("fetch_testimonials.php")
        .then(response => response.json())
        .then(testimonials => {
            let container = document.getElementById("testimonial-container");
            container.innerHTML = "";

            testimonials.forEach(t => {
                let div = document.createElement("div");
                div.classList.add("testimonial");
                div.innerHTML = `<h4>${t.name}</h4><p>${t.message}</p><p>⭐ Rating: ${t.rating}</p>`;
                container.appendChild(div);
            });
        });
}
