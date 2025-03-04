document.addEventListener("DOMContentLoaded", function () {
    const testimonialsContainer = document.getElementById("testimonial-container");
    const form = document.getElementById("testimonial-form");
    let testimonials = [];

    // Fetch and display testimonials from the database
    async function fetchTestimonials() {
        try {
            const response = await fetch('backend/get_testimonials.php');
            testimonials = await response.json();

            if (!Array.isArray(testimonials) || testimonials.length === 0) {
                testimonialsContainer.innerHTML = '<p>No testimonials available yet.</p>';
                return;
            }

            displayTestimonials();
        } catch (error) {
            console.error("Error loading testimonials:", error);
            testimonialsContainer.innerHTML = '<p>Failed to load testimonials. Please try again later.</p>';
        }
    }

    // Display all testimonials dynamically
    function displayTestimonials() {
        testimonialsContainer.innerHTML = ""; // Clear previous testimonials

        testimonials.forEach((testimonial) => {
            const testimonialElement = `
                <div class="testimonial">
                    <p>Rating: ${"⭐".repeat(testimonial.rating)}</p>
                    <p>"${testimonial.message}"</p>
                    <h4>- ${testimonial.name}</h4>
                </div>
            `;
            testimonialsContainer.innerHTML += testimonialElement;
        });
    }

    // Submit new testimonial and refresh the list
    form?.addEventListener("submit", async function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        try {
            const response = await fetch('backend/submit_testimonial.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                form.reset();
                fetchTestimonials(); // Refresh testimonials after submission
            } else {
                throw new Error(result.message || 'Failed to submit testimonial.');
            }
        } catch (error) {
            console.error('Error submitting testimonial:', error.message);
            alert('Failed to submit testimonial. Please try again.');
        }
    });

    // Fetch testimonials every 10 seconds to keep the list updated
    fetchTestimonials();
    setInterval(fetchTestimonials, 10000); // Auto-refresh every 10 seconds
});
