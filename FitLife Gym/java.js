// Get the navigation menu links
const navLinks = document.querySelectorAll("header nav ul li a");

// Add a click event listener to each link
navLinks.forEach(link => {
	link.addEventListener("click", function(event) {
		event.preventDefault(); // Prevent the default link behavior

		// Get the id of the target element from the link's href attribute
		const targetId = this.getAttribute("href");
		const targetElement = document.querySelector(targetId);

		// Scroll to the target element
		targetElement.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	});
});

// Get the contact form
const contactForm = document.querySelector("section#contact form");

// Add a submit event listener to the form
contactForm.addEventListener("submit", function(event) {
	event.preventDefault(); // Prevent the default form submission behavior

	// Get the form data
	const formData = new FormData(this);
	const name = formData.get("name");
	const email = formData.get("email");
	const message = formData.get("message");

	// Validate the form data
	if (name === "" || email === "" || message === "") {
		alert("Please fill out all fields");
		return;
	}

	// Send the form data to the server
	fetch("/send-form", {
		method: "POST",
		body: formData
	})
		.then(response => response.text())
		.then(responseText => {
			alert(responseText);
			if (responseText === "Form submitted successfully") {
				// Clear the form
				this.reset();
			}
		});
});

