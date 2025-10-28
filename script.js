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

// ⚠️ 把 “你的APIKEY” 替换为你自己的 key
const API_URL = 'https://apis.tianapi.com/joke/index?key=你的APIKEY&num=1';

async function fetchJoke() {
    jokeButton.disabled = true;
    jokeButton.textContent = '加载中...';
    jokeSetup.textContent = '获取笑话中...';
    jokePunchline.textContent = '';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const jokeData = await response.json();

        // 🌟 天行API返回结构示例：
        // {
        //   "code":200,
        //   "msg":"success",
        //   "result":[{"content":"你知道程序员为什么喜欢喝咖啡吗？因为Java！"}]
        // }

        const jokeText = jokeData?.result?.[0]?.content || '未获取到笑话内容';
        
        // 如果你想模仿 setup / punchline 的形式，可以这样：
        const [setup, punchline] = jokeText.split('？');
        jokeSetup.textContent = setup + (punchline ? '？' : '');
        
        setTimeout(() => {
            jokePunchline.textContent = punchline || '';
        }, 2000);
    } catch (error) {
        jokeSetup.textContent = '😬 获取笑话失败，请查看控制台。';
        console.error('Failed to fetch joke:', error);
    } finally {
        jokeButton.disabled = false;
        jokeButton.textContent = '再来一个';
    }
}

jokeButton.addEventListener('click', fetchJoke);
window.onload = fetchJoke;