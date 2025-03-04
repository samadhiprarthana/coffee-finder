document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("testimonial-form");
    const testimonialsContainer = document.getElementById("testimonials-container2");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        try {
            const response = await fetch('backend/submit_testimonial.php', {
                method: 'POST',
                body: formData
            });
            
            
            const result = await response.json();

            if (response.ok && result.status === 'success') {
                // Create new testimonial element
                const name = formData.get('name');
                const message = formData.get('message');
                const rating = formData.get('rating');

                const testimonial = document.createElement("div");
                testimonial.classList.add("testimonial");
                testimonial.innerHTML = `
                    <p>Rating: ${"⭐".repeat(rating)}</p>
                    <p>"${message}"</p>
                    <p>- ${name}</p>
                `;

                // Add testimonial to the container
                testimonialsContainer.appendChild(testimonial);

                // Show Thank You Message
                const thankYouMessage = document.createElement("p");
                thankYouMessage.classList.add("thank-you");
                thankYouMessage.textContent = "Thank you for your support! Your testimonial has been added.";
                form.after(thankYouMessage);

                // Clear form
                form.reset();

                // Remove Thank You message after 5 seconds
                setTimeout(() => {
                    thankYouMessage.remove();
                }, 5000);
            } else {
                throw new Error(result.message || 'Failed to submit testimonial. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error.message);
            alert('Failed to submit testimonial. Please try again.');
        }
    });
});
