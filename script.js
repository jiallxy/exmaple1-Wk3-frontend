document.getElementById('getFact').addEventListener('click', async () => {
    try {
        const response = await fetch('https://exmaple1-wk3-backend-ggno.vercel.app/random-fact');
        const data = await response.json();
        
        const factDisplay = document.getElementById('factDisplay');
        factDisplay.textContent = data.fact;
    } catch (error) {
        console.error('Error:', error);
    }
});

// script.js

// ** IMPORTANT: Ensure the base URL matches your backend link from vercel **
const API_BASE_URL = 'https://exmaple1-wk3-backend-ggno.vercel.app';

const itemForm = document.getElementById('item-form');
const itemIdInput = document.getElementById('itemId');
const itemTextInput = document.getElementById('itemText');
const listButton = document.getElementById('list-button');
const itemListDisplay = document.getElementById('item-list-display');
const formMessage = document.getElementById('form-message');

// --- 1. Function to ADD an Item (POST Request) ---
itemForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Stop the form from submitting the traditional way

    const itemId = itemIdInput.value.trim();
    const itemText = itemTextInput.value.trim();
    
    if ( !itemId || !itemText) return;

    try {
        const response = await fetch(`${API_BASE_URL}/item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Convert JavaScript object to a JSON string for the body
            body: JSON.stringify({ itemId, itemText }),
        });

        // Check if the request was successful
        if (response.ok) {
            const data = await response.json();
            formMessage.textContent = data.message;
            formMessage.style.color = 'green';
            itemIdInput.value = ''; // Clear the input field
            itemTextInput.value = ''; // Clear the input field
            
        } else {
            formMessage.textContent = 'Error adding item.';
            formMessage.style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        formMessage.textContent = 'Network error. Is the server running?';
        formMessage.style.color = 'red';
    }
});


// --- 2. Function to LIST Items (GET Request) ---
async function listItems() {
    try {
        const response = await fetch(`${API_BASE_URL}/items`);
        
        if (response.ok) {
            const data = await response.json();
            
            // Clear the existing list
            itemListDisplay.innerHTML = ''; 

            // Loop through the items and add them to the list display
            if (data.items && data.items.length > 0) {
                data.items.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `Item ${item.id} - ${item.text}`;
                    itemListDisplay.appendChild(li);
                });
            } else {
                itemListDisplay.innerHTML = '<li>No items yet.</li>';
            }
        } else {
            itemListDisplay.innerHTML = '<li>Error fetching items.</li>';
        }

    } catch (error) {
        console.error('Error:', error);
        itemListDisplay.innerHTML = '<li>Network error. Could not connect to the API.</li>';
    }
}

// Event listener for the List button
listButton.addEventListener('click', listItems);

// Initial call to populate the list when the page loads
listItems();
// DOM Element references
const jokeButton = document.getElementById('joke-button');
const jokeSetup = document.getElementById('joke-setup');
const jokePunchline = document.getElementById('joke-punchline');

// The URL for the public API
const API_URL = 'https://apis.tianapi.com/joke/index?key=你的APIKEY&num=10';

// Function to fetch and display the joke
async function fetchJoke() {
    // 1. Setup - Disable button, show loading state
    jokeButton.disabled = true;
    jokeButton.textContent = '加载...';
    jokeSetup.textContent = '笑话头...';
    jokePunchline.textContent = ''; // Clear previous punchline    

    try {
        // 2. Fetch the data (Network Request)
        // This is the core of consuming the API
        const response = await fetch(API_URL);

        // Check if the response was successful (e.g., HTTP status 200)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 3. Parse the data (Convert JSON to a JavaScript object)
        const jokeData = await response.json();

        // 4. Update the DOM (Display the results)
        jokeSetup.textContent = jokeData.setup; // Display the first part

        // Delay displaying the punchline for dramatic effect!
        setTimeout(() => {
            jokePunchline.textContent = jokeData.punchline;            
        }, 3000); // Wait 3 seconds

    } catch (error) {
        // 5. Error Handling
        jokeSetup.textContent = '😬 Error fetching joke. Check console for details.';
        console.error('Failed to fetch joke:', error);
    } finally {
        // 6. Cleanup (Runs regardless of success or failure)
        // Re-enable the button
        jokeButton.textContent = '另一个笑话';
        jokeButton.disabled = false;
    }
}

// Event Listener: Start fetching a joke when the button is clicked
jokeButton.addEventListener('click', fetchJoke);

// Fetch a joke immediately when the page loads for the first time
window.onload = fetchJoke;