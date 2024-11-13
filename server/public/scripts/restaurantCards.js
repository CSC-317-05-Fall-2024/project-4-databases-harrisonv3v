document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Retrieve the restaurant ID from the card's data-id attribute
            const card = event.target.closest('.restaurant-item');
            const restaurantId = card.getAttribute('data-id');  // Get the ID from data-id

            // Send DELETE request to server
            fetch(`/api/restaurants/${restaurantId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Optionally remove the card from the DOM (if server-side delete was successful)
                card.remove();  // This is redundant if you re-render the list after deletion
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    });
});
