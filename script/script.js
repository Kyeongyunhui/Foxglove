const container = document.querySelector('.container');
const sections = document.querySelectorAll('.section');
let currentSection = 0;
let isScrolling = false;
let isFullpage = true; // 현재 풀페이지 모드인지 여부

function checkScreenSize() {
    if (window.innerWidth <= 1920) {
        // 1920px 이하일 때 풀페이지 기능 꺼짐
        isFullpage = false;
        container.style.transform = 'none';
        container.style.transition = 'none';
        document.body.style.overflow = 'auto'; // 자연 스크롤 활성화
    } else {
        // 1920px 초과일 때 풀페이지 기능 켬
        isFullpage = true;
        container.style.transition = 'transform 0.7s ease-in-out';
        document.body.style.overflow = 'hidden'; // 스크롤 막기
        moveSection(); // 현재 섹션 위치 유지
    }
}

window.addEventListener('resize', checkScreenSize);
window.addEventListener('load', checkScreenSize);

window.addEventListener('wheel', (e) => {
    if (!isFullpage) return; // 풀페이지 모드 아닐 때 휠 무시
    if (isScrolling) return;
    isScrolling = true;

    if (e.deltaY > 0) {
        // 휠 내릴 때
        if (currentSection < sections.length - 1) {
            currentSection++;
        }
    } else {
        // 휠 올릴 때
        if (currentSection > 0) {
            currentSection--;
        }
    }

    moveSection();

    setTimeout(() => {
        isScrolling = false;
    }, 700); // 애니메이션 시간
});

function moveSection() {
    const translateY = -(currentSection * 100);
    container.style.transform = `translateY(${translateY}vh)`;
}