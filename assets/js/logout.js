async function logout() {
    let response = await fetch('/coffee-finder/backend/logout.php');
    let result = await response.json();

    if (result.status === "success") {
        window.location.href = "login.html";
    }
}
