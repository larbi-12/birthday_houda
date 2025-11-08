let box = document.querySelector('.box');
let rotateY = 0;
let isDragging = false;
let startX = 0;
let currentRotate = 0;


const items = document.querySelectorAll('.box span');
const overlay = document.querySelector('.overlay');
const previewImg = document.getElementById('preview-img');
const previewVideo = document.getElementById('preview-video');

// === Drag start
box.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  box.style.cursor = 'grabbing';
});

box.addEventListener('mouseup', () => {
  isDragging = false;
  currentRotate = rotateY;
  box.style.cursor = 'grab';
});

box.addEventListener('mouseleave', () => {
  isDragging = false;
  currentRotate = rotateY;
  box.style.cursor = 'grab';
});

// === Drag move
box.addEventListener('mousemove', (e) => {
  if(!isDragging) return;
  let diff = e.clientX - startX;
  rotateY = currentRotate + diff / 2;
  box.style.transform = `perspective(1000px) rotateY(${rotateY}deg)`;
});

// === Touch support
box.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
});

box.addEventListener('touchend', () => {
  isDragging = false;
  currentRotate = rotateY;
});

box.addEventListener('touchmove', (e) => {
  if(!isDragging) return;
  let diff = e.touches[0].clientX - startX;
  rotateY = currentRotate + diff / 2;
  box.style.transform = `perspective(1000px) rotateY(${rotateY}deg)`;
});

// === Arrows still working
document.querySelector('.right').addEventListener('click', () => {
  rotateY += 45;
  currentRotate = rotateY;
  box.style.transform = `perspective(1000px) rotateY(${rotateY}deg)`;
});

document.querySelector('.left').addEventListener('click', () => {
  rotateY -= 45;
  currentRotate = rotateY;
  box.style.transform = `perspective(1000px) rotateY(${rotateY}deg)`;
});





items.forEach(item => {
  item.addEventListener('click', () => {
    const type = item.dataset.type;

    if(type === 'image'){
      previewVideo.pause();
      previewVideo.classList.remove('active');
      previewImg.src = item.querySelector('img').src;
      previewImg.classList.add('active');
    } else if(type === 'video'){
      previewImg.classList.remove('active');
      previewVideo.src = item.dataset.src;
      previewVideo.classList.add('active');
      previewVideo.play();
    }

    overlay.classList.add('active');
  });
});

// Close overlay on click
overlay.addEventListener('click', () => {
  overlay.classList.remove('active');
  previewVideo.pause();
});

fetch('pages/navbar.html')
    .then(res => res.text())
    .then(html => document.getElementById('navbar').innerHTML = html);
