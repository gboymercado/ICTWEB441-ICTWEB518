// Wait for the window to load completely before executing the script
window.onload = function() {
    // Fetch the 'menu.xml' file that contains navigation items
    fetch('xml/nav.xml')
        .then(response => {
            // Check if the response is OK (status 200)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); // Throw an error if the response is not OK
            }
            return response.text(); // Return the response text if it's OK
        })
        .then(data => {
            // Create a new DOMParser instance to parse the XML data
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml"); // Parse the XML string into a document
            const items = xmlDoc.getElementsByTagName("item"); // Get all <item> elements from the XML

            let navbarHtml = ''; // Initialize an empty string to hold the HTML for the navbar
            for (let i = 0; i < items.length; i++) {
                // Extract the 'name' and 'url' for each item
                const name = items[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
                const url = items[i].getElementsByTagName("url")[0].childNodes[0].nodeValue;
                
                // Append the HTML for each nav item to the navbarHtml string
                navbarHtml += `<li class="nav-item me-5"><a class="nav-link" href="${url}">${name}</a</li>`;
                
            }

            // Insert the constructed HTML into the element with ID 'navbar-items'
            document.getElementById('navbar-items').innerHTML = navbarHtml;
        })
        .catch(error => {
            // Log any errors that occur during the fetch or parsing process
            console.error('Error fetching or parsing XML:', error);
        });
};
