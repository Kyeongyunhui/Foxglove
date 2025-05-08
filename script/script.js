const container = document.querySelector('.container');
const sections = document.querySelectorAll('.section');
let currentSection = 0;
let isScrolling = false;
let isFullpage = true; // 현재 풀페이지 모드인지 여부

function checkScreenSize() {
    if (window.innerWidth <= 1920) {
        // 반응형 모드일 때
        isFullpage = false;
        container.style.transform = 'none';
        container.style.transition = 'none';
        document.body.style.overflow = 'auto';

        // 현재 섹션 위치로 자연 스크롤 이동
        sections[currentSection].scrollIntoView({ behavior: "auto" });

    } else {
        // 풀페이지 모드일 때
        isFullpage = true;
        container.style.transition = 'transform 0.7s ease-in-out';
        document.body.style.overflow = 'hidden';

        moveSection(); // 현재 섹션 위치 유지
    }
}

window.addEventListener('resize', checkScreenSize);
window.addEventListener('load', checkScreenSize);

// 휠로 섹션 이동 (풀페이지일 때만)
window.addEventListener('wheel', (e) => {
    if (!isFullpage || isScrolling) return;

    isScrolling = true;

    if (e.deltaY > 0 && currentSection < sections.length - 1) {
        currentSection++;
    } else if (e.deltaY < 0 && currentSection > 0) {
        currentSection--;
    }

    moveSection();

    setTimeout(() => {
        isScrolling = false;
    }, 700);
});

// 섹션 이동 함수
function moveSection() {
    const translateY = -(currentSection * 100);
    container.style.transform = `translateY(${translateY}vh)`;
}

// 버튼 이벤트 (GO IN + down_button)
document.addEventListener("DOMContentLoaded", function () {
    const goInButton = document.querySelector(".main button");
    const downButton = document.querySelector(".down_button");

    // 공통 함수: 다음 섹션으로 이동
    function scrollToNextSection() {
        if (currentSection < sections.length - 1) {
            if (!isFullpage) {
                sections[currentSection + 1].scrollIntoView({ behavior: "smooth" });
            } else {
                currentSection++;
                moveSection();
            }
        }
    }

    if (goInButton) {
        goInButton.addEventListener("click", scrollToNextSection);
    }

    if (downButton) {
        downButton.addEventListener("click", scrollToNextSection);
    }

    // 두 번째 섹션에서 휠 올릴 때 위로
    sections[1].addEventListener("wheel", function (e) {
        if (e.deltaY < 0) {
            if (!isFullpage) {
                sections[0].scrollIntoView({ behavior: "smooth" });
            } else {
                currentSection = 0;
                moveSection();
            }
        }
    });
});


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