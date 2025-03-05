document.addEventListener("DOMContentLoaded", function () {
    const testimonialsContainer = document.getElementById("testimonial-container");
    const form = document.getElementById("testimonial-form");
    let testimonials = [];
    let currentIndex = 0;

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

    // Display only three testimonials at a time and cycle through them
    function displayTestimonials() {
        testimonialsContainer.innerHTML = ""; // Clear previous testimonials
        let displayedTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

        // If not enough testimonials at the end, loop back
        if (displayedTestimonials.length < 3) {
            displayedTestimonials = [
                ...displayedTestimonials,
                ...testimonials.slice(0, 3 - displayedTestimonials.length)
            ];
        }

        displayedTestimonials.forEach((testimonial) => {
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

    // Cycle through testimonials every 3 seconds
    function cycleTestimonials() {
        if (testimonials.length > 3) {
            currentIndex = (currentIndex + 3) % testimonials.length;
            displayTestimonials();
        }
    }

    setInterval(cycleTestimonials, 3000); // Change every 3 seconds

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
