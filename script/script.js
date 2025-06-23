const container  = document.querySelector('.container');
const sections   = document.querySelectorAll('.section');

let currentSection   = 0;   // 풀페이지 모드에서만 의미 있음
let isFullpage       = false;
let fullpageWheelRef = null;  // wheel 핸들러 참조 저장
let sec1WheelRef     = null;  // section[1] wheel 핸들러 참조 저장

/* ------------------------------------------------------------------
   풀페이지 모드 ON / OFF
------------------------------------------------------------------ */
function enableFullpage() {
  if (isFullpage) return;          // 이미 켜져 있으면 무시
  isFullpage = true;

  // 시각적·스크롤 세팅
  container.style.transition = 'transform 0.7s ease-in-out';
  document.body.style.overflow = 'hidden';
  moveSection();                   // 현재 섹션 위치 적용

  /* 풀페이지 전용 wheel 핸들러 */
  fullpageWheelRef = function (e) {
    e.preventDefault();            // 휠 스크롤 자체를 막음
    if (isScrolling) return;
    isScrolling = true;

    if (e.deltaY > 0 && currentSection < sections.length - 1) {
      currentSection++;
    } else if (e.deltaY < 0 && currentSection > 0) {
      currentSection--;
    }

    moveSection();
    setTimeout(() => (isScrolling = false), 700);
  };

  /* 두 번째 섹션 wheel↑ → 맨 위로 (풀페이지 전용) */
  sec1WheelRef = function (e) {
    if (e.deltaY < 0) {
      e.preventDefault();
      currentSection = 0;
      moveSection();
    }
  };

  window.addEventListener('wheel', fullpageWheelRef, { passive: false });
  sections[1].addEventListener('wheel', sec1WheelRef, { passive: false });
}

function disableFullpage() {
  if (!isFullpage) return;         // 이미 꺼져 있으면 무시
  isFullpage = false;

  // 시각적·스크롤 세팅
  container.style.transition = 'none';
  container.style.transform  = 'none';
  document.body.style.overflow = 'auto';

  // wheel 리스너 제거
  if (fullpageWheelRef) {
    window.removeEventListener('wheel', fullpageWheelRef);
    fullpageWheelRef = null;
  }
  if (sec1WheelRef) {
    sections[1].removeEventListener('wheel', sec1WheelRef);
    sec1WheelRef = null;
  }
}

/* ------------------------------------------------------------------
   창 크기 체크 → 모드 전환
------------------------------------------------------------------ */
function checkScreenSize() {
  if (window.innerWidth > 1920) {
    enableFullpage();
  } else {
    disableFullpage();
  }
}
window.addEventListener('resize', checkScreenSize);
window.addEventListener('load',   checkScreenSize);

/* ------------------------------------------------------------------
   공통 버튼 (GO IN, down_button) : 다음 섹션 이동
------------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  const goInBtn  = document.querySelector('.main button');
  const downBtn  = document.querySelector('.down_button');

  function goNext() {
    // 풀페이지 모드
    if (isFullpage) {
      if (currentSection < sections.length - 1) {
        currentSection++;
        moveSection();
      }
    }
    // 반응형 모드(자연 스크롤)
    else {
      const next = sections[currentSection + 1];
      if (next) next.scrollIntoView({ behavior: 'smooth' });
    }
  }

  goInBtn  && goInBtn.addEventListener('click', goNext);
  downBtn  && downBtn.addEventListener('click', goNext);
});

/* ------------------------------------------------------------------
   섹션 이동 (풀페이지 모드 한정)
------------------------------------------------------------------ */
let isScrolling = false;
function moveSection() {
  container.style.transform = `translateY(-${currentSection * 100}vh)`;
}


// 탭메뉴

document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab");
    const pages = document.querySelectorAll(".page");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            const tabNum = this.dataset.tab;

            // 탭 버튼 활성화/비활성화
            tabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");

            // 페이지 표시/숨김
            pages.forEach(p => {
                if (p.id === `tab_${tabNum}`) {
                    p.classList.add("active");
                } else {
                    p.classList.remove("active");
                }
            });
        });
    });
});


// 페이드인/아웃

document.addEventListener("DOMContentLoaded", function () {
    const stories = document.querySelectorAll(".story_div");
    let current = 0;

    function showSlide(index) {
        stories.forEach((el, i) => {
            el.classList.remove("active");
        });
        stories[index].classList.add("active");
    }

    setInterval(() => {
        current = (current + 1) % stories.length;
        showSlide(current);
    }, 7000); // 4초 간격 (1.5초 fade 포함 고려)
});


// 팝업창

const paragraphs = document.querySelectorAll(".text_div p");
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");
const popupContainer = document.getElementById("popupContentContainer");

paragraphs.forEach(p => {
    p.addEventListener("click", () => {
        const name = p.getAttribute("data-name");
        const content = document.getElementById(name);

        if (content) {
            // ✅ popup 안에 내용만 복사
            popupContainer.innerHTML = content.innerHTML;

            // ✅ 팝업 표시
            popup.style.display = "block";
            overlay.style.display = "block";
        }
    });
});

function closePopup() {
    popup.style.display = "none";
    overlay.style.display = "none";

    // 혹시나 나중에 필요 없을 경우 비워주기 (선택사항)
    // popupContainer.innerHTML = '';
}

// 슬라이드

const track = document.getElementById('track');
const items = Array.from(track.children);

// 최소 2배 분량 이상 복제 (자연스러운 반복을 위해)
items.forEach(item => {
  const clone = item.cloneNode(true);
  track.appendChild(clone);
});
items.forEach(item => {
  const clone = item.cloneNode(true);
  track.appendChild(clone);
});

// 글리치

function glitch(element) {
    setInterval(()=>{
        // element::before
        const top1 = Math.random() * 100
        const btm1 = Math.random() * 100
        // element::after
        const top2 = Math.random() * 100
        const btm2 = Math.random() * 100

        element.style.setProperty('--t1', `${top1}%`)
        element.style.setProperty('--bt1', `${btm1}%`)
        element.style.setProperty('--t2', `${top2}%`)
        element.style.setProperty('--b2', `${btm1}%`)
    },100)
}

const text = document.querySelector('.sec06_text')
glitch(text)