document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const nameForm = document.getElementById('nameForm');
    const greetingDisplay = document.getElementById('greetingDisplay');
    const greetingText = document.querySelector('.greeting-text');
    const userNameDisplay = document.querySelector('.user-name');
    const userRoleDisplay = document.querySelector('.user-role');
    const resetBtn = document.getElementById('resetBtn');
    const shareBtn = document.getElementById('shareBtn');
    const currentYear = document.getElementById('currentYear');
    const confettiContainer = document.getElementById('confetti-container');

    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();

    // Greeting messages database
    const blessings = {
        student: [
            "May your pursuit of knowledge be blessed with wisdom and understanding,",
            "As you walk the path of learning, may the Guru's light illuminate your way,",
            "On this Guru Purnima, may you find inspiration in your studies,",
            "May your student life be filled with divine guidance and clarity,"
        ],
        disciple: [
            "With reverence on this sacred day, may you receive the Guru's boundless grace,",
            "As a devoted disciple, may you always feel the Guru's presence guiding you,",
            "On Guru Purnima, may your spiritual journey be blessed with enlightenment,",
            "May your devotion to the Guru bring you peace and spiritual growth,"
        ],
        seeker: [
            "On this auspicious day, may your spiritual quest be fulfilled,",
            "As you seek truth, may the Guru's wisdom light your path,",
            "May your seeking heart find what it truly longs for,",
            "On Guru Purnima, may you find the guidance you've been seeking,"
        ],
        devotee: [
            "With devotion in your heart, may you receive the Guru's divine blessings,",
            "May your devotion shine as brightly as the full moon on this Guru Purnima,",
            "As a true devotee, may you experience the Guru's boundless love,",
            "On this sacred day, may your devotion bring you closer to divine wisdom,"
        ]
    };

    // Form submission handler
    nameForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userName = document.getElementById('userName').value.trim();
        const userRole = document.getElementById('userRole').value;
        
        if (userName) {
            generateBlessing(userName, userRole);
            showGreeting();
            createConfetti();
        }
    });
    
    // Generate personalized blessing
    function generateBlessing(name, role) {
        const roleMessages = blessings[role] || blessings.student;
        const randomMessage = roleMessages[Math.floor(Math.random() * roleMessages.length)];
        
        greetingText.textContent = randomMessage;
        userNameDisplay.textContent = name;
        userRoleDisplay.textContent = `(${role.replace(/-/g, ' ')})`;
    }
    
    // Show greeting with animation
    function showGreeting() {
        const formSection = nameForm.closest('section');
        const displayCard = document.querySelector('.display-card');
        
        formSection.classList.add('animate__fadeOut');
        formSection.style.display = 'none';
        
        greetingDisplay.classList.add('active');
        greetingDisplay.style.display = 'block';
        displayCard.classList.add('animate__fadeIn');
    }
    
    // Reset button functionality
    resetBtn.addEventListener('click', function() {
        const formSection = nameForm.closest('section');
        const displayCard = document.querySelector('.display-card');
        
        greetingDisplay.classList.remove('active');
        displayCard.classList.remove('animate__fadeIn');
        displayCard.classList.add('animate__fadeOut');
        
        setTimeout(() => {
            greetingDisplay.style.display = 'none';
            formSection.style.display = 'block';
            formSection.classList.remove('animate__fadeOut');
            formSection.classList.add('animate__fadeIn');
            nameForm.reset();
        }, 500);
    });
    
    // Share button functionality
    shareBtn.addEventListener('click', function() {
        const greeting = `${greetingText.textContent} ${userNameDisplay.textContent} ${userRoleDisplay.textContent}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Guru Purnima Blessing',
                text: greeting,
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
                fallbackShare(greeting);
            });
        } else {
            fallbackShare(greeting);
        }
    });
    
    // Fallback for browsers that don't support Web Share API
    function fallbackShare(text) {
        const shareUrl = `whatsapp://send?text=${encodeURIComponent(text + '\n\n' + window.location.href)}`;
        window.open(shareUrl, '_blank');
    }
    
    // Create confetti effect
    function createConfetti() {
        // Clear previous confetti
        confettiContainer.innerHTML = '';
        
        // Create new confetti
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = getRandomColor();
            confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            confettiContainer.appendChild(confetti);
        }
        
        // Remove confetti after animation
        setTimeout(() => {
            confettiContainer.innerHTML = '';
        }, 5000);
    }
    
    function getRandomColor() {
        const colors = ['#FF9933', '#138808', '#8B4513', '#FFD700', '#FFFFFF'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Initialize - hide greeting section
    greetingDisplay.style.display = 'none';
});