const mainImage = document.querySelector('.main-images img');
const caption = document.querySelector('.caption');
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const thumbs = document.querySelectorAll('.thumb img');

// array الصور الرئيسية
const mainImagesArray = [
    { src: '../images/houda0.jpg', caption: '😍 Looking amazing' },
    { src: '../images/houda2.jpg', caption: 'Cool and classy!' },

    { src: '../images/houda3.jpg', caption: 'Look parfait' },
    { src: '../images/houda4.jpg', caption: 'Beautiful' },
    { src: '../images/houda5.jpeg', caption: '😂واش عقلتي على هاد الفوضى؟ ' },
    { src: '../images/houda6.jpg', caption: 'Simply beautiful!' },
    { src: '../images/houda0.jpg', caption: 'Brille de mille feux' },
    { src: '../images/nous1.jpeg', caption: ' ذكريات جميلة' },
    { src: '../images/nous2.jpg', caption: 'Souvenirs de fous rires' },
    { src: '../images/nous3.jpg', caption: 'Des souvenirs inoubliables' },
    { src: '../images/nous4.jpg', caption: 'Moment parfait capturé' },
    { src: '../images/nous5.jpg', caption: 'hahhahahaha' },
    { src: '../images/nous6.jpg', caption: 'mabihash picture mzyana' },
    { src: '../images/nous7.jpg', caption: 'ذكريات صداقة زوينة' },
    { src: '../images/nous8.jpg', caption: 'ضحكنا بزاف هاد النهار' },
    { src: '../images/nous9.jpg', caption: 'عقلتي على هاد النهار؟' }




];

let currentIndex = 0;

function updateMainImage(index) {
    mainImage.src = mainImagesArray[index].src;
    caption.textContent = mainImagesArray[index].caption;
}

// الأسهم
rightBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= mainImagesArray.length) currentIndex = 0;
    updateMainImage(currentIndex);
});

leftBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = mainImagesArray.length - 1;
    updateMainImage(currentIndex);
});

// click على thumbnails
thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
        const src = thumb.src;
        const cap = thumb.dataset.caption; // ناخد caption من data-caption
        mainImage.src = src;
        caption.textContent = cap;
    });
});

// نبدأ بالصورة الأولى
updateMainImage(currentIndex);


fetch('pages/navbar.html')
    .then(res => res.text())
    .then(html => document.getElementById('navbar').innerHTML = html);