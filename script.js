document.addEventListener('DOMContentLoaded', () => {
    // Determine which page we are on
    const isLoginPage = document.querySelector('.login-container');
    const isSurprisePage = document.querySelector('.cake-container');
    const isPhotosPage = document.querySelector('h1') && document.querySelector('h1').textContent.includes('Photos');
    const isVideosPage = document.querySelector('h1') && document.querySelector('h1').textContent.includes('Videos');

    if (isLoginPage) {
        initLogin();
    } else if (isSurprisePage) {
        initSurprise();
    } else if (isPhotosPage) {
        playMusic();
        popBirthdayStuff();
    } else if (isVideosPage) {
        initVideos();
    }
});


function initLogin() {
    const loginForm = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMsg');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.username.value.trim().toLowerCase();
            const password = loginForm.password.value.trim().toLowerCase();

            if (username === 'priya' && password === 'march52007') {
                // Determine if we are running locally or on a server, handling path
                window.location.href = 'surprise.html';
            } else {
                errorMsg.textContent = "Invalid username or password!";
                // Shake animation for visual feedback
                const container = document.querySelector('.login-container');
                container.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    container.style.animation = '';
                }, 500);
            }
        });
    }
}

function playMusic() {
    var audio = document.getElementById("myAudio");
    if (audio) {
        audio.play().catch(function (e) { console.log("Play failed", e); });
    }
}

function toggleMute() {
    var audio = document.getElementById("myAudio");
    var muteBtn = document.getElementById("muteBtn");
    if (audio) {
        audio.muted = !audio.muted;
        if (muteBtn) {
            muteBtn.innerHTML = audio.muted ? "🔈 Unmute" : "🔊 Mute";
            muteBtn.style.backgroundColor = audio.muted ? "#ff4d4d" : "#555";
        }
    }
}

function initSurprise() {
    const flame = document.querySelector('.flame');
    const smoke = document.querySelector('.smoke');
    const message = document.querySelector('.message');
    const navButtons = document.querySelector('.nav-buttons');

    if (flame) {
        setTimeout(() => {
            // Blow out the candle
            flame.classList.add('off');
            smoke.classList.add('active');

            // Show message and buttons
            setTimeout(() => {
                message.classList.remove('hidden'); // Assuming hidden class or just relying on opacity
                message.classList.add('visible');
                navButtons.classList.add('visible');
            }, 500);

        }, 3000); // 3 seconds
    }
}

// Add shake animation style dynamically for login error
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
  75% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
}
`;
document.head.appendChild(styleSheet);

function popBirthdayStuff() {
    // 1. Confetti cannons from sides
    if (typeof confetti === 'function') {
        var duration = 3 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff9a9e', '#fecfef', '#a18cd1', '#ff0055', '#ffeb3b']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff9a9e', '#fecfef', '#a18cd1', '#ff0055', '#ffeb3b']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    // 2. Pop out birthday message
    const popup = document.createElement('div');
    popup.innerHTML = "Happy Birthday! 🎂🎉";
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%) scale(0)';
    popup.style.fontSize = '3.5rem';
    popup.style.fontWeight = 'bold';
    popup.style.color = '#d81b60';
    popup.style.fontFamily = "'Dancing Script', cursive";
    popup.style.textShadow = '2px 2px 10px rgba(255,154,158,0.8)';
    popup.style.zIndex = '9999';
    popup.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    popup.style.background = 'rgba(255, 255, 255, 0.9)';
    popup.style.padding = '30px 50px';
    popup.style.borderRadius = '20px';
    popup.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
    popup.style.textAlign = 'center';

    document.body.appendChild(popup);

    // Pop in
    setTimeout(() => {
        popup.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);

    // Fade out after 3.5 seconds
    setTimeout(() => {
        popup.style.transform = 'translate(-50%, -50%) scale(0)';
        popup.style.opacity = '0';
        setTimeout(() => popup.remove(), 600);
    }, 3500);
}

function initVideos() {
    const videos = document.querySelectorAll('.media-video');
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeBtn = document.querySelector('.close-modal');

    if (!modal || !videos.length) return;

    videos.forEach(video => {
        video.addEventListener('click', () => {
            modal.classList.add('active');
            modalVideo.src = video.src;
            modalVideo.play();
        });

        // Remove loop for the gallery view so they can just be static thumbnails? Or leave autoplay.
        // Let's add hover play if they hover over the thumbnail
        video.addEventListener('mouseenter', () => video.play());
        video.addEventListener('mouseleave', () => video.pause());
    });

    // Close modal functions
    const closeModal = () => {
        modal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = ""; // Stop buffering
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close when clicking outside video
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
