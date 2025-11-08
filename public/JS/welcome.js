
document.addEventListener("DOMContentLoaded", () => {
  // نجيب جميع الصفحات
  const pages = document.querySelectorAll(".page");
  let currentPage = 0;

  // نظهر الصفحة الأولى
  pages[currentPage].classList.add("active");

  // نجيب جميع الأزرار اللي فيهم class btn
  const buttons = document.querySelectorAll(".btn");

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






let playing = false;

function audioPlay() {
  if (playing) return; // يمنع التشغيل المتكرر

  const audio = new Audio('../audio/Audio1.mp3');
  playing = true;
  audio.play();

  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
    playing = false;
  }, 40000); 
}


let finalbtn = document.querySelector(".final-btn");

finalbtn.addEventListener("click",function(){
  audioPlay();

});

fetch('pages/navbar.html')
    .then(res => res.text())
    .then(html => document.getElementById('navbar').innerHTML = html);