document.addEventListener('DOMContentLoaded', function() {
    fetch('../pages/navbar.html')
        .then(res => res.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;

            const hamburger = document.getElementById('hamburger');
            const navLinks = document.querySelector('.nav-links');

            if (!navLinks) return; // safeguard

            const links = navLinks.querySelectorAll('a');

            // Set active based on current URL
            const currentPath = window.location.pathname.split("/").pop();
            links.forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('active');
                }
            });

            // Hamburger toggle
            if (hamburger) {
                hamburger.addEventListener('click', () => {
                    navLinks.classList.toggle('show');
                });

                // Click on link → update active + close menu
                links.forEach(link => {
                    link.addEventListener('click', () => {
                        navLinks.classList.remove('show');
                        links.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    });
                });

                // Click outside → close menu
                document.addEventListener('click', (event) => {
                    if (!event.target.closest('#navbar')) {
                        navLinks.classList.remove('show');
                    }
                });
            }
        })
        .catch(err => console.error('Failed to load navbar:', err));
});
