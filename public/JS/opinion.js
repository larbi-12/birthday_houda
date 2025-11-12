
const input = document.getElementById('userInput');
const btn = document.getElementById('saveBtn');
const msg = document.getElementById('msg');

input.addEventListener('input', () => {
    btn.disabled = input.value.trim() === '';
});



btn.addEventListener('click', async () => {
    const text = input.value.trim();
    if (!text) return;

    const res = await fetch('/save-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });

    const data = await res.json();
    msg.textContent = data.message;

    input.value = '';
    btn.disabled = true;
});




