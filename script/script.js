let currentSection = 0;
let isScrolling = false;
let isFullpage = false;

const sections = document.querySelectorAll(".section");
const container = document.querySelector(".container");
const totalSections = sections.length;

// =============================
// 섹션 이동 함수
// =============================
function moveToSection(index) {
    if (!isFullpage) return; // 풀페이지 아닐 땐 실행 X
    if (index < 0 || index >= totalSections) return;

    isScrolling = true;
    currentSection = index;

    container.style.transform = `translateY(${-index * 100}vh)`;

    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

// =============================
// 휠 이벤트 핸들러 (풀페이지 전용)
// =============================
function fullpageWheel(e) {
    if (!isFullpage) return;
    if (isScrolling) return;

    if (e.deltaY > 0) moveToSection(currentSection + 1);
    else moveToSection(currentSection - 1);
}

// =============================
// 버튼 이동
// =============================
function setupButtons() {
    const goInBtn = document.querySelector(".first button");
    const downBtn = document.querySelector(".down_button");

    if (goInBtn) {
        goInBtn.onclick = () => {
            if (isFullpage) moveToSection(1);
        };
    }

    if (downBtn) {
        downBtn.onclick = () => {
            if (isFullpage) moveToSection(2);
        };
    }
}

setupButtons();

// =============================
// 풀페이지 활성화
// =============================
function enableFullpage() {
    if (isFullpage) return;

    isFullpage = true;
    document.body.style.overflow = "hidden";
    container.style.transition = "transform 0.8s ease";
    moveToSection(currentSection);

    window.addEventListener("wheel", fullpageWheel, { passive: true });
}

// =============================
// 풀페이지 비활성화
// =============================
function disableFullpage() {
    if (!isFullpage) return;

    isFullpage = false;
    document.body.style.overflow = "auto";
    container.style.transition = "none";
    container.style.transform = "none";

    window.removeEventListener("wheel", fullpageWheel);
}

// =============================
// 화면 크기 체크 → 모드 전환
// =============================
function checkScreenSize() {
    if (window.innerWidth >= 1920) {
        enableFullpage();
    } else {
        disableFullpage();
    }
}

window.addEventListener("resize", checkScreenSize);
window.addEventListener("load", checkScreenSize);






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

// 페이드인/아웃_모바일

document.addEventListener("DOMContentLoaded", function () {
    const stories = document.querySelectorAll(".story_div_m");
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