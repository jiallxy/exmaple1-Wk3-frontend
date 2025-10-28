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