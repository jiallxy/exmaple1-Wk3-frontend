document.getElementById('getFact').addEventListener('click', async () => {
    try {
        const response = await fetch('http://your-backend-vercel-url/random-fact');
        const data = await response.json();
        
        const factDisplay = document.getElementById('factDisplay');
        factDisplay.textContent = data.fact;
    } catch (error) {
        console.error('Error:', error);
    }
});