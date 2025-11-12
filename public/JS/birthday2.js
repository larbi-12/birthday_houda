


 // اختيار العناصر
let mailBox = document.querySelector('.mail a'); // الرابط داخل .mail
let boxMail = document.querySelector('.boxMail');
let closeBtn = boxMail.querySelector('.fa-xmark');

// fadeIn animation CSS لازم تكون موجودة
// مثال CSS:
/*
.fadeIn {
    opacity: 0;
    animation: fadeInAnim 0.7s forwards;
}

@keyframes fadeInAnim {
    to {
        opacity: 1;
    }
}
*/

// عند الضغط على "Click Here Houda"
mailBox.addEventListener('click', function(e) {
    e.preventDefault(); // مهم باش الرابط ما يحملش الصفحة

    // Toggle class 'active' على الزر (اختياري للستايل)
    mailBox.parentElement.classList.toggle('active');

    // عرض صندوق الرسالة مع animation
    boxMail.classList.add('active');

    // animation للبطاقات
    let card1 = boxMail.querySelector('.card1');
    let card2 = boxMail.querySelector('.card2');

    card1.classList.add('fadeIn');
    setTimeout(() => {
        card2.classList.add('fadeIn');
    }, 500); // البطاقة الثانية تبان شوية من بعد
});

// إغلاق الصندوق
closeBtn.addEventListener('click', function() {
    boxMail.classList.remove('active');

    // نحيد الأنيميشن ديال البطاقات باش يرجعو ليهم استعداد للفتح من جديد
    let card1 = boxMail.querySelector('.card1');
    let card2 = boxMail.querySelector('.card2');

    card1.classList.remove('fadeIn');
    card2.classList.remove('fadeIn');

    // كذلك نحيد class active من الزر
    mailBox.parentElement.classList.remove('active');
});





         fetch('pages/navbar.html')
    .then(res => res.text())
    .then(html => document.getElementById('navbar').innerHTML = html);
