document.getElementById('registerForm')?.addEventListener('submit', async function (event) {
    event.preventDefault();

    let formData = new FormData(this);
    let userData = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
    };

    try {
        let response = await fetch('/coffee-finder/backend/register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        let result = await response.json();
        document.getElementById('responseMessage').innerText = result.message;

        if (result.status === "success") {
            window.location.href = "login.html"; // Redirect to login after successful registration
        }
    } catch (error) {
        console.error("Registration Error:", error);
        document.getElementById('responseMessage').innerText = "Something went wrong. Please try again.";
    }
});

document.getElementById('loginForm')?.addEventListener('submit', async function (event) {
    event.preventDefault();

    let formData = new FormData(this);

    try {
        let response = await fetch('/coffee-finder/backend/login.php', {
            method: 'POST',
            body: formData
        });

        let result = await response.json();

        if (result.status === "success") {
            window.location.href = "recipe.html"; // Redirect to recipe page on successful login
        } else {
            document.getElementById("error-message").innerText = "Invalid credentials!";
        }
    } catch (error) {
        console.error("Login Error:", error);
        document.getElementById("error-message").innerText = "Something went wrong. Please try again.";
    }
});
