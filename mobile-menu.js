document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;

    if (!mobileMenuBtn || !navLinks) {
        console.error('Required elements not found');
        return;
    }

    // Initialize menu button text
    mobileMenuBtn.innerHTML = '☰';

    // Toggle mobile menu with logging
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        isMenuOpen = !isMenuOpen;
        
        console.log('Menu button clicked'); // Debug log
        
        // Force display style update
        navLinks.style.display = isMenuOpen ? 'flex' : 'none';
        navLinks.classList.toggle('active');
        
        // Update button text
        mobileMenuBtn.innerHTML = isMenuOpen ? '✕' : '☰';
        
        console.log('Menu state:', isMenuOpen); // Debug log
        console.log('Nav links display:', navLinks.style.display); // Debug log
    });

    // Ensure menu works after resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = '';
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
            isMenuOpen = false;
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.style.display = 'none';
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
            isMenuOpen = false;
        }
    });
}); 