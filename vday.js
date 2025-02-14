let musicPlaying = false;
let player;

// Ensure elements exist before accessing them
document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.getElementById("playPauseButton");
    const playIcon = document.getElementById("playIcon");
    const pauseIcon = document.getElementById("pauseIcon");

    // Check if elements exist before adding event listeners
    if (playButton && playIcon && pauseIcon) {
        playButton.addEventListener("click", toggleMusic);
    }
});

// Load YouTube Player API
function onYouTubeIframeAPIReady() {
    player = new YT.Player("musicPlayer", {
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

// Ensure player is ready before playing music
function onPlayerReady(event) {
    console.log("YouTube Player Ready");
}

function toggleMusic() {
    if (!player || typeof player.playVideo !== "function") return; // Ensure player is loaded

    const playIcon = document.getElementById("playIcon");
    const pauseIcon = document.getElementById("pauseIcon");

    if (!musicPlaying) {
        player.playVideo();
        musicPlaying = true;

        // Force update icons
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
    } else {
        player.pauseVideo();
        musicPlaying = false;

        // Force update icons
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
    }
}

// Detect if the video ends
function onPlayerStateChange(event) {
    const playIcon = document.getElementById("playIcon");
    const pauseIcon = document.getElementById("pauseIcon");

    if (event.data === YT.PlayerState.ENDED) {
        musicPlaying = false;
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
    }
}

function revealLetter(event) {
    event.preventDefault(); // Prevent any weird default behavior

    const letter = document.getElementById("letter");
    if (!letter) return; // Ensure element exists

    letter.classList.remove("hidden");
    setTimeout(() => {
        letter.children[0].classList.add("scale-100", "opacity-100");
    }, 50);

    startFallingHearts(); // Start hearts when opening letter
}

// Attach event listener
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("openHeartButton").addEventListener("click", revealLetter);
});


// Function to close the letter smoothly
function closeLetter(event) {
    const letter = document.getElementById("letter");

    // Always close the pop-up
    letter.children[0].classList.remove("scale-100", "opacity-100");
    setTimeout(() => {
        letter.classList.add("hidden");
    }, 300);
}


// Attach event listener to "X" button so it works properly
document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.getElementById("closeButton");
    if (closeButton) {
        closeButton.addEventListener("click", closeLetter); // Directly call the function
    }
});


// Animation for falling hearts when message opened
function createFallingHeart() {
    const heart = document.createElement("div");
    heart.classList.add("falling-heart");

    // Define multiple gradients for variety
    const gradients = [
        ["#FF4B6E", "#FF1493"], // Pink to deep pink
        ["#E34234", "#FF7F50"], // Warm red to coral
        ["#9C27B0", "#673AB7"], // Rich purple to deep purple
        ["#3F51B5", "#00BFFF"], // Royal blue to sky blue
        ["#FB6B90", "#D81B60"], // Salmon pink to ruby red
    ];

    // Pick a random gradient
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    const gradientId = `heartGradient-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    heart.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${randomGradient[0]}"/>
                    <stop offset="100%" stop-color="${randomGradient[1]}"/>
                </linearGradient>
            </defs>
            <path fill="url(#${gradientId})" stroke="none"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    `;

    // Randomize starting position and size
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = "-50px";
    heart.style.position = "fixed";
    const size = Math.random() * 10 + 15; // Between 15px and 25px
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    heart.style.zIndex = "9999";

    document.body.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

function startFallingHearts() {
    setInterval(() => {
        createFallingHeart();
    }, 200); // Creates a heart every 200ms
}

