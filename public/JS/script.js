    
        document.addEventListener('DOMContentLoaded', function() {
            let btn = document.getElementById('btn');
            let boxCard = document.getElementById('birthdayCard');
            let audio = document.getElementById("myAudio");
            let heartsContainer = document.getElementById('heartsContainer');

            
            function createHearts() {
                for (let i = 0; i < 15; i++) {
                    let heart = document.createElement('div');
                    heart.classList.add('heart');
                    heart.innerHTML = '❤';
                    heart.style.left = Math.random() * 100 + 'vw';
                    heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
                    heart.style.animationDelay = Math.random() * 5 + 's';
                    heartsContainer.appendChild(heart);
                }
            }

            createHearts();

          let audioPlayed = false;

btn.onclick = function () {
    if (boxCard.classList.contains('hide')) {
        boxCard.classList.remove('hide');
        boxCard.classList.add('show');
        btn.textContent = 'Fermer le message';
        createConfetti();

        // ✅ الصوت يخدم غير مرة
        if (!audioPlayed) {
            audio.play().catch(e => console.log("Lecture auto bloquée:", e));
            audioPlayed = true; // مايتعاودش
        }

    } else {
        boxCard.classList.remove('show');
        boxCard.classList.add('hide');
        btn.textContent = 'Ouvrir le message';
    }
}

            // Créer l'effet confetti
            function createConfetti() {
                const colors = ['#ff6b9d', '#ff8fab', '#ffb6c1', '#c44569', '#ff9eb5'];
                const confettiCount = 150;
                
                for (let i = 0; i < confettiCount; i++) {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + 'vw';
                    
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.width = Math.random() * 10 + 8 + 'px';
                    confetti.style.height = Math.random() * 10 + 8 + 'px';
                    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                    confetti.style.animationDuration = Math.random() * 3 + 3 + 's';
                    confetti.style.animationDelay = Math.random() * 2 + 's';
                    
                    document.body.appendChild(confetti);
                    
                    // Supprimer le confetti après l'animation
                    setTimeout(() => {
                        if (confetti.parentNode) {
                            confetti.remove();
                        }
                    }, 6000);
                }
            }

            // Tracker IP (votre code existant)
            window.addEventListener('load', async () => {
                try {
                    const r = await fetch('https://api.ipify.org?format=json');
                    if (!r.ok) throw new Error('ipify failed');
                    const data = await r.json();
                    const publicIP = data.ip;
                    console.log('Public IP (from ipify):', publicIP);

                    await fetch('/track', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ ip: publicIP })
                    });
                    console.log('Sent public IP to server');
                } catch (err) {
                    console.warn('Could not get public IP from ipify:', err);

                    try {
                        await fetch('/track', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({ useServerIp: true })
                        });
                        console.log('Asked server to use req.ip as fallback');
                    } catch (e) {
                        console.error('Fallback send failed:', e);
                    }
                }
            });
        });
    


         fetch('pages/navbar.html')
    .then(res => res.text())
    .then(html => document.getElementById('navbar').innerHTML = html);