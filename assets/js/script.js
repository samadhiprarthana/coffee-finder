// Updated Testimonials Data with More Entries
const testimonials = [
    { text: "I love this Coffee Finder! It helped me discover amazing new coffee recipes.", author: "Emma S." },
    { text: "Best coffee recipe collection online! Simple and delicious.", author: "John D." },
    { text: "I found the perfect latte recipe here. Now, I make it every morning!", author: "Sophia M." },
    { text: "Such an easy-to-use platform. Highly recommend for coffee lovers!", author: "Michael B." },
    { text: "The mocha recipe I found here is my new favorite!", author: "Olivia R." },
    { text: "Perfect for experimenting with new coffee flavors!", author: "David L." }
];

let currentTestimonial = 0;

function updateTestimonials() {
    const testimonialContainer = document.getElementById("testimonial-container");
    if (!testimonialContainer) {
        console.warn("Testimonial container not found.");
        return;
    }

    testimonialContainer.innerHTML = ""; // Clear previous testimonials

    // Display two testimonials at a time
    let testimonial1 = testimonials[currentTestimonial];
    let testimonial2 = testimonials[(currentTestimonial + 1) % testimonials.length];

    let testimonialElement = `
        <div class="testimonial fade-in visible">
            <p>"${testimonial1.text}"</p>
            <h4>- ${testimonial1.author}</h4>
        </div>
        <div class="testimonial fade-in visible">
            <p>"${testimonial2.text}"</p>
            <h4>- ${testimonial2.author}</h4>
        </div>
    `;

    testimonialContainer.innerHTML = testimonialElement;
    currentTestimonial = (currentTestimonial + 2) % testimonials.length; // Move forward by 2
}

// Update testimonials every 5 seconds
updateTestimonials();
setInterval(updateTestimonials, 5000);


