function validateForm() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const phonePattern = /^\+?\d+$/;

    if (!/^[a-zA-Z]+$/.test(firstName)) {
        alert("First name must be a single word with no numbers.");
        return false;
    }

    if (!/^[a-zA-Z]+$/.test(lastName)) {
        alert("Last name must be a single word with no numbers.");
        return false;
    }

    if (!phonePattern.test(phone)) {
        alert("Phone number can only contain numbers and a + sign at the beginning.");
        return false;
    }

    if (message.length < 10 || message.length > 200) {
        alert("Message must be between 10 and 200 characters.");
        return false;
    }

    // Display form data
    document.getElementById('formDataDisplay').innerHTML = `
        <ul>
            <li>First Name: ${firstName}</li>
            <li>Last Name: ${lastName}</li>
            <li>Phone: ${phone}</li>
            <li>Message: ${message}</li>
        </ul>`;
}

let currentIndex = 0;

function scrollLeft() {
    const expansions = document.querySelectorAll('.expansion-card');
    if (currentIndex > 0) {
        expansions[currentIndex].classList.remove('visible');
        currentIndex--;
        expansions[currentIndex].classList.add('visible');
    }
}

function scrollRight() {
    const expansions = document.querySelectorAll('.expansion-card');
    if (currentIndex < expansions.length - 1) {
        expansions[currentIndex].classList.remove('visible');
        currentIndex++;
        expansions[currentIndex].classList.add('visible');
    }
}

let scrollPosition = 0;

function scrollLeft() {
    const container = document.querySelector('.expansions-container');
    scrollPosition -= 300; // Adjust scroll amount as needed
    container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

function scrollRight() {
    const container = document.querySelector('.expansions-container');
    scrollPosition += 300; // Adjust scroll amount as needed
    container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

/// Function to toggle service details
function toggleServiceDetails(serviceItem) {
    // Check if the item is already expanded
    if (serviceItem.classList.contains('expanded')) {
        serviceItem.classList.remove('expanded');
    } else {
        // Collapse any other expanded service items
        document.querySelectorAll('.service-item.expanded').forEach(item => item.classList.remove('expanded'));
        // Expand the clicked service item
        serviceItem.classList.add('expanded');
    }
}

// Existing JavaScript for other functionalities...

