

var typed = new Typed(".auto-typed", {
  strings: ["اليوم ما بحالو… على ما أظن", "Joyeux anniversaire, je te souhaite le meilleur", "متمنياتي لك النجاح والسعادة", "Je te souhaite une belle année à venir", "عام جديد، فرصة جديدة، بالتوفيق هدى"],
  typeSpeed: 20,
  backSpeed: 20,
  loop: true
});






//initialize particles js 




particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 300,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#f06292"
    },
    "shape": {
      "type": "image",
      "image": {
        "src": "../images/heart.png", // الرابط ديال الصورة
        "width": 100,
        "height": 100
      },
      "stroke": {
        "width": 0,
        "color": "#000000"
      }
    },
    "opacity": {
      "value": 0.6,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 14,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 2,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#eb1515",
      "opacity": 0.4,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 1.5,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": true,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 160,
        "line_linked": {
          "opacity": 1
        }
      },
      "push": {
        "particles_nb": 6
      }
    }
  },
  "retina_detect": true
});





document.addEventListener("DOMContentLoaded", () => {
  // نجيب جميع الصفحات
  const pages = document.querySelectorAll("section");
  let currentPage = 0;

  // نظهر الصفحة الأولى
  pages[currentPage].classList.add("active");

  // نجيب جميع الأزرار اللي فيهم class btn
  const buttons = document.querySelectorAll(".btn, .btn-page3, .btn-page4");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // نخفي الصفحة الحالية
      pages[currentPage].classList.remove("active");

      // ننتقل للصفحة التالية
      currentPage++;

      // إذا كاينة صفحة بعد
      if (currentPage < pages.length) {
        pages[currentPage].classList.add("active");
      }
    });
  });
});





let inputName = document.getElementById("name-input");
let btnPage4 = document.querySelector(".btn-page4");


// Au départ, le bouton est désactivé
btnPage4.disabled = true;

// Vérifier à chaque frappe si l'input est rempli
inputName.addEventListener("input", function () {

  if (inputName.value.trim() === "" ) {
    btnPage4.disabled = true; 
    btnPage4.style.backgroundColor='rgb(245, 146, 215)';
  } 
  else if (inputName.value.trim() == "Houda" || inputName.value.trim() == "houda" || inputName.value.trim() == "HOUDA") {
    btnPage4.disabled = false;
    btnPage4.style.backgroundColor = 'rgba(226, 56, 178, 1)'; // bouton activé si quelque chose est écrit
    
  }
 else if (inputName.value.trim() != "Houda" || inputName.value.trim() != "houda" || inputName.value.trim() != "HOUDA") {
    btnPage4.disabled = true;
    btnPage4.style.backgroundColor='rgb(245, 146, 215)';// bouton bloqué si vide
  }
});





// Gestion du clic
btnPage4.addEventListener("click", function () {
  let nom = inputName.value.trim();
  if (nom === "") {
    return; // sécurité supplémentaire
  }

  document.querySelector(".final-name").innerHTML = `
    
  <h2>🎉 Happy Birthday, <span> ${nom}</span> 🎂</h2>`;

  document.querySelector(".foryou").innerHTML = `
  
  <h2 class="foryou">For You, <span>${nom}</span></h2>`;

});



let playing = false;

function audioPlay() {
  if (playing) return; 

  const audio = new Audio('../audio/birthdayArabic.mp3');
  playing = true;
  audio.play();

  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
    playing = false;
  }, 39000); 
}


let finalbtn=document.querySelector(".btn-final");

finalbtn.addEventListener("click",function(){
  audioPlay();
  createConfetti();
  // createFirework();
});









        function createConfetti() {
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
            const confettiCount = 1000;
            
            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = Math.random() * 10 + 5 + 'px';
                confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
                confetti.style.animationDelay = Math.random() * 2 + 's';
                
                document.body.appendChild(confetti);
                
                // إزالة الكونفيتي بعد انتهاء الرسوم المتحركة
                setTimeout(() => {
                    confetti.remove();
                }, 39000);
            }
        }


let heartimg = document.querySelector(".heart-img");

function createHearts() {
    for (let i = 0; i < 30; i++) { // توليد 30 قلب دفعة وحدة
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.style.left = Math.random() * 80 + 'vw'; // توزيع عشوائي فالعرض
        heart.style.top = Math.random() * 80 + 'vh'; // ممكن تزيد شوية ارتفاع البداية
        heart.style.backgroundImage = `url(../images/heartEmoji.png)`;

        // حجم عشوائي
        const size = Math.random() * 20 + 20; // بين 20px و 40px
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;

        // مدة الطيران عشوائية
        heart.style.animationDuration = (Math.random() * 2 + 3) + 's';

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);
    }
}

heartimg.addEventListener("click", createHearts);







function createFirework() {
  const colors = ['#ff4081', '#f06292', '#f8bbd0', '#d81b60', '#ff80ab', '#ffcdd2'];

  // Centre de l'explosion
  const firework = document.createElement('div');
  firework.classList.add('firework');
  firework.style.background = colors[Math.floor(Math.random() * colors.length)];
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight * 0.7;
  firework.style.left = x + 'px';
  firework.style.top = y + 'px';
  document.body.appendChild(firework);

  // Particules
  setTimeout(() => {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('firework-particle');
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      document.body.appendChild(particle);

      const angle = (i / 30) * Math.PI * 2;
      const distance = 100 + Math.random() * 50;

      gsap.to(particle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: 0,
        duration: 1.5 + Math.random(),
        onComplete: () => particle.remove()
      });
    }
    firework.remove();
  }, 300);
}

// ✅ Lancer automatiquement plusieurs fireworks
setInterval(() => {
  if (Math.random() > 0.5) {
    createFirework();
  }
}, 500);






