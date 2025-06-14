document.addEventListener('DOMContentLoaded', () => {
    const office = document.querySelector('.rotating-office');
    const autoRotateBtn = document.getElementById('autoRotate');
    const rotateLeftBtn = document.getElementById('rotateLeft');
    const rotateRightBtn = document.getElementById('rotateRight');
    let currentRotation = 0;
    let isAutoRotating = false;
    let startX = 0;
    let currentX = 0;

    // Touch events for mobile rotation
    office.addEventListener('touchstart', (e) => {
        if (!isAutoRotating) {
            startX = e.touches[0].clientX;
            currentX = startX;
        }
    });

    office.addEventListener('touchmove', (e) => {
        if (!isAutoRotating) {
            e.preventDefault();
            currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            const rotation = (diff / window.innerWidth) * 360;
            office.style.transform = `rotate(${currentRotation + rotation}deg)`;
        }
    });

    office.addEventListener('touchend', (e) => {
        if (!isAutoRotating) {
            const diff = currentX - startX;
            currentRotation += (diff / window.innerWidth) * 360;
        }
    });

    // Auto rotation toggle
    autoRotateBtn.addEventListener('click', () => {
        isAutoRotating = !isAutoRotating;
        office.classList.toggle('rotating');
        autoRotateBtn.textContent = isAutoRotating ? 'Stop' : 'Auto Rotate';
    });

    // Manual rotation controls
    rotateLeftBtn.addEventListener('click', () => {
        if (!isAutoRotating) {
            currentRotation -= 90;
            office.style.transform = `rotate(${currentRotation}deg)`;
        }
    });

    rotateRightBtn.addEventListener('click', () => {
        if (!isAutoRotating) {
            currentRotation += 90;
            office.style.transform = `rotate(${currentRotation}deg)`;
        }
    });
}); 