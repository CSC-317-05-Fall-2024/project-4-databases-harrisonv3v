document.addEventListener('DOMContentLoaded', () => {
    // Add header
    const header = document.createElement('header');
    header.innerHTML = `
        <h1>San Francisco</h1>
    `;
    document.body.prepend(header); // Insert the header at the top

    // Add navbar
    const navbar = document.createElement('nav');
    navbar.classList.add('navbar');
    navbar.innerHTML = `
        <a href="/home">Home</a> 
        <a href="/attractions">Attractions</a> 
        <a href="/restaurants">Restaurants</a>
        <a href="/newrestaurant">New Restaurant</a>
    `;
    header.insertAdjacentElement('afterend', navbar); // Insert navbar after header

    // Add footer
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <p>Contact Info: ychan@sfsu.edu</p>
    `;
    document.body.append(footer); // Append the footer at the end
});
