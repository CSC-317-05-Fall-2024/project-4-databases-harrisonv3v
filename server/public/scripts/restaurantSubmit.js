const handleSubmit = async (event) => {
    event.preventDefault();  // Prevent the default form submission behavior
    
    // Create a FormData object to collect the form data
    const formData = new FormData(event.target);
    const restaurantData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        photo: formData.get('photo'),
    };

    try {
        // Send a POST request to the server to create a new restaurant
        const response = await fetch('/api/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(restaurantData),
        });
        
        if (!response.ok) {
            throw new Error('Failed to create new restaurant');
        }
        
        const result = await response.json();
        console.log('Restaurant created successfully:', result);

        // Optionally, redirect to the restaurants page to view the new entry
        window.location.href = '/restaurants';
        
    } catch (error) {
        console.error('Error creating restaurant:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('restaurantForm');
    
    // Assign the handleSubmit function to the form's submit event
    form.addEventListener('submit', handleSubmit);
});

