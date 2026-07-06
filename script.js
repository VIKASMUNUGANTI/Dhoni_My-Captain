/*==============================
        HERO FADE & NAV
==============================*/

window.addEventListener("load", () => {
    document.querySelector(".hero-content").style.opacity = "1";
    document.querySelector(".hero-content").style.transform = "translateY(0)";
});

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");
mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = mobileMenuBtn.querySelector("i");
    if (navLinks.classList.contains("active")) {
        icon.className = "fa-solid fa-xmark";
    } else {
        icon.className = "fa-solid fa-bars";
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileMenuBtn.querySelector("i").className = "fa-solid fa-bars";
    });
});


/*==============================
        THEME SWITCHER
==============================*/

const themeToggle = document.getElementById("theme-toggle");
const activeTheme = localStorage.getItem("theme") || "csk";

// Set initial theme
document.documentElement.setAttribute("data-theme", activeTheme);
updateThemeIcon(activeTheme);

themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "csk" ? "india" : "csk";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector("i");
    if (theme === "india") {
        icon.className = "fa-solid fa-sun";
        themeToggle.setAttribute("title", "Switch to CSK Yellow Theme");
    } else {
        icon.className = "fa-solid fa-moon";
        themeToggle.setAttribute("title", "Switch to India Blue Theme");
    }
}


/*==============================
        CUSTOM CURSOR
==============================*/

const cursor = document.querySelector(".custom-cursor");
const cursorDot = document.querySelector(".custom-cursor-dot");

if (cursor && cursorDot) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        
        cursorDot.style.left = e.clientX + "px";
        cursorDot.style.top = e.clientY + "px";
    });

    const clickables = document.querySelectorAll("a, button, .clickable-card, .photo img");
    clickables.forEach(item => {
        item.addEventListener("mouseenter", () => {
            cursor.classList.add("active");
        });
        item.addEventListener("mouseleave", () => {
            cursor.classList.remove("active");
        });
    });
}


/*==============================
        SMOOTH SCROLL
==============================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            // Offset for sticky navbar
            const headerOffset = 80;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});


/*==============================
      SCROLL REVEAL
==============================*/

const revealElements = document.querySelectorAll(
    ".card,.timeline-item,.photo,.trophy-card,.stat-box,.quote-section,.tribute,.fan-corner"
);

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    {
        threshold: 0.1
    }
);

revealElements.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(50px)";
    item.style.transition = "1s cubic-bezier(0.25, 0.8, 0.25, 1)";
    revealObserver.observe(item);
});


/*==============================
      COUNTER ANIMATION
==============================*/

const counters = document.querySelectorAll(".stat-box h1");
const speed = 120;

const counterObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const counter = entry.target;
            const target = parseInt(counter.innerText.replace(/\D/g, ""));
            let count = 0;
            const update = () => {
                const increment = Math.ceil(target / speed);
                count += increment;
                if (count >= target) {
                    counter.innerText = target.toLocaleString();
                } else {
                    counter.innerText = count.toLocaleString();
                    requestAnimationFrame(update);
                }
            };
            update();
            counterObserver.unobserve(counter);
        });
    },
    {
        threshold: 0.5
    }
);

counters.forEach(counter => counterObserver.observe(counter));


/*==============================
      TROPHY DETAILS MODALS
==============================*/

const modalDetails = {
    t20: {
        title: "ICC T20 World Cup",
        subtitle: "Inaugural Champions • 2007",
        image: "./images/t20.jpg",
        tag: "ICC Trophy",
        desc: "Led by a young, long-haired MS Dhoni, India entered the inaugural ICC T20 World Cup in South Africa with few expectations. Against all odds, Dhoni led his inexperienced squad to the finals. The championship match against arch-rivals Pakistan came down to a nail-biting final over. Dhoni made the legendary, gamble-like decision to hand the ball to Joginder Sharma. The plan succeeded when Misbah-ul-Haq scooped the ball to Sreesanth, triggering an historic celebration and sealing India's status as T20 World Champions."
    },
    wc: {
        title: "ICC Cricket World Cup",
        subtitle: "World Champions • 2011",
        image: "./images/icc-wc.jpg",
        tag: "ICC Trophy",
        desc: "After 28 long years, India reclaimed the ultimate glory on home soil at Wankhede Stadium. Chasing 275 in the final against Sri Lanka, India was in a tricky position. In a masterclass of leadership, Dhoni promoted himself up the batting order ahead of Yuvraj Singh. He compiled an unbeaten, masterful 91 off 79 balls. The match culminated in the most iconic moment in Indian sports history: Dhoni lofting a Nuwan Kulasekara delivery over long-on for a magnificent six, securing the World Cup and fulfilling the dream of a billion people."
    },
    ct: {
        title: "ICC Champions Trophy",
        subtitle: "Champions • 2013",
        image: "./images/CT-2013.jpg",
        tag: "ICC Trophy",
        desc: "Under wet and murky conditions in Birmingham, the final of the Champions Trophy was reduced to a 20-overs-a-side thriller against hosts England. Defending a modest total of 129, Dhoni deployed brilliant tactical field placements and spun a web using Ravindra Jadeja and R. Ashwin. When the game drifted away, Dhoni trusted Ishant Sharma with the 18th over, leading to two quick wickets. India secured a 5-run victory, making Dhoni the first and only captain in history to lift all three ICC white-ball trophies."
    },
    ipl: {
        title: "Indian Premier League",
        subtitle: "5× IPL Champions • Chennai Super Kings",
        image: "./images/IPL.jpg",
        tag: "IPL / CSK",
        desc: "MS Dhoni's name is synonymous with the yellow of Chennai Super Kings. Known affectionately as 'Thala' (Leader) by millions of fans, he has captained CSK to 5 IPL titles (2010, 2011, 2018, 2021, and 2023) and 2 Champions League T20 trophies. Under his leadership, CSK built a legacy of consistency, qualifying for the playoffs in almost every season. The 2023 campaign was particularly emotional, with a knee-injured Dhoni leading the team to a last-ball victory in the final, proving once again that his tactical genius is timeless."
    },
    clt20: {
        title: "Champions League T20",
        subtitle: "2× CLT20 Champions • CSK",
        image: "./images/CLT-20.jpg",
        tag: "CLT20 / CSK",
        desc: "Dhoni led the Chennai Super Kings to double glory in the prestigious, now-historic Champions League T20 tournament. Winning first in 2010 in South Africa against Warriors, and then again in 2014 in Bangalore against Kolkata Knight Riders, Dhoni showcased his peerless ability to marshal resources under high pressure on the international club stage, solidifying CSK's status as one of the most dominant T20 franchises in the world."
    },
    "asia-cup": {
        title: "Asia Cup",
        subtitle: "Champions • 2010 & 2016",
        image: "./images/asia-Cup.avif",
        tag: "Asia Cup",
        desc: "Under Dhoni's leadership, India asserted absolute dominance in Asia. He captained India to Asia Cup victories in both the 50-over format (2010 in Sri Lanka) and the first-ever 20-over format (2016 in Bangladesh). Whether it was guiding Virat Kohli and Rohit Sharma's rise, or finishing off games under pressure, Dhoni's cool head ensured India remained the undisputed kings of Asian cricket."
    },
    "padma-bhushan": {
        title: "Padma Bhushan",
        subtitle: "Third Highest Civilian Award • 2018",
        image: "./images/padmabushan.webp",
        tag: "National Award",
        desc: "MS Dhoni received the country's third-highest civilian award, the Padma Bhushan, in 2018. In a proud moment that went viral worldwide, he dressed in his official military uniform as an honorary Lieutenant Colonel in the Territorial Army and marched up to President Ram Nath Kovind to receive the award, representing his deep respect for the nation's armed forces."
    },
    "padma-shri": {
        title: "Padma Shri",
        subtitle: "Fourth Highest Civilian Award • 2009",
        image: "./images/padmabushan.webp",
        tag: "National Award",
        desc: "MS Dhoni was conferred with the Padma Shri, India's fourth-highest civilian award, in 2009 for his outstanding contribution to sports. Under his captaincy, India had just won the 2007 T20 World Cup, won the historic Commonwealth Bank Series in Australia, and reached the No.1 spot in ICC Test Rankings."
    },
    "khel-ratna": {
        title: "Major Dhyan Chand Khel Ratna",
        subtitle: "Highest Sporting Honour • 2007",
        image: "./images/padmabushan.webp",
        tag: "Sporting Honour",
        desc: "MS Dhoni received India's highest sporting honor, the Khel Ratna Award, in 2007 following his spectacular entry into international leadership. His captaincy led India's young squad to lift the historic inaugural ICC T20 World Cup, igniting a cricket revolution in the country."
    },
    "test-captain": {
        title: "World No.1 Test Captain",
        subtitle: "Led India to ICC Mace",
        image: "./images/test.webp",
        tag: "Test Cricket",
        desc: "In December 2009, under MS Dhoni's leadership, India achieved the ICC Test Championship Mace for the first time in history. Holding the World No. 1 spot for 21 consecutive months, Dhoni proved that his calm leadership could conquer the longest, most rigorous format of the game, completing his reputation as one of cricket's greatest captains of all time."
    }
};

const modal = document.getElementById("trophy-modal");
const modalImg = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalSubtitle = document.getElementById("modal-subtitle");
const modalTag = document.getElementById("modal-tag");
const modalDesc = document.getElementById("modal-description");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalOverlay = modal.querySelector(".modal-overlay");

document.querySelectorAll(".clickable-card").forEach(card => {
    card.addEventListener("click", () => {
        const target = card.getAttribute("data-modal-target");
        const details = modalDetails[target];
        if (details) {
            modalImg.src = details.image;
            modalImg.alt = details.title;
            modalTitle.innerText = details.title;
            modalSubtitle.innerText = details.subtitle;
            modalTag.innerText = details.tag;
            modalDesc.innerText = details.desc;
            
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    });
});

const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
};

modalCloseBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);


/*==============================
        SLIDESHOW LIGHTBOX
==============================*/

const photosList = Array.from(document.querySelectorAll(".photo img, .photo-wide img"));
let currentPhotoIndex = 0;

function setupLightbox() {
    const lightboxEl = document.getElementById("lightbox");
    if (!lightboxEl) return;
    
    const img = lightboxEl.querySelector("img");
    const caption = lightboxEl.querySelector(".lightbox-caption");
    const closeBtn = lightboxEl.querySelector(".lightbox-close");
    const prevBtn = lightboxEl.querySelector(".lightbox-prev");
    const nextBtn = lightboxEl.querySelector(".lightbox-next");
    
    const captionMap = {
        "D-1.jpg": "Dhoni in a signature CSK training session, preparing for the match with intense focus.",
        "D-2.jpg": "A majestic portrait of MS Dhoni wearing the Team India ODI jersey, showcasing his poise and composure.",
        "D-3.jpg": "Walking out to bat: Dhoni stepping onto the pitch amid a roaring crowd of millions.",
        "D-4.jpeg": "The trademark Helicopter Shot: Dhoni's unique swing that revolutionized finishing in white-ball cricket.",
        "D-5.jpg": "A candid leadership moment: Dhoni sharing strategies with his teammates on the field.",
        "D-6.jpg": "That golden smile: Dhoni celebrating a match-winning trophy presentation with trademark humility.",
        "D-7.jfif": "The Thala of Chennai: Dhoni setting fields and marshal resources during an IPL game.",
        "D-8.jpg": "Lightning-fast hands: Celebrating another signature stumping behind the wickets.",
        "complete-Banner.png": "MS Dhoni tribute banner showcasing his legendary jersey number 7 and major achievements."
    };
    
    function showImage(index) {
        currentPhotoIndex = index;
        const photo = photosList[index];
        img.src = photo.src;
        
        const urlParts = photo.src.split('/');
        const filename = urlParts[urlParts.length - 1];
        
        caption.innerText = captionMap[filename] || "Mahendra Singh Dhoni - A Legend Forever.";
        lightboxEl.classList.add("active");
        document.body.style.overflow = "hidden";
    }
    
    photosList.forEach((photo, idx) => {
        photo.style.cursor = "pointer";
        photo.addEventListener("click", (e) => {
            e.stopPropagation();
            showImage(idx);
        });
    });
    
    closeBtn.addEventListener("click", () => {
        lightboxEl.classList.remove("active");
        document.body.style.overflow = "";
    });
    
    lightboxEl.addEventListener("click", (e) => {
        if (e.target === lightboxEl || e.target.classList.contains("lightbox-slider-container")) {
            lightboxEl.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
    
    prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        let idx = currentPhotoIndex - 1;
        if (idx < 0) idx = photosList.length - 1;
        showImage(idx);
    });
    
    nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        let idx = (currentPhotoIndex + 1) % photosList.length;
        showImage(idx);
    });
    
    document.addEventListener("keydown", (e) => {
        if (!lightboxEl.classList.contains("active")) return;
        if (e.key === "Escape") {
            lightboxEl.classList.remove("active");
            document.body.style.overflow = "";
        }
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "ArrowRight") nextBtn.click();
    });
}

setupLightbox();


/*==============================
      PARALLAX HERO
==============================*/

window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");
    let scroll = window.pageYOffset;
    hero.style.backgroundPositionY = scroll * 0.5 + "px";
});


/*==============================
      TYPEWRITER EFFECT
==============================*/

const text = "Happy Birthday My Captain 💛";
const title = document.querySelector(".hero h3");
let index = 0;
title.innerHTML = "";

function typing() {
    if (index < text.length) {
        title.innerHTML += text.charAt(index);
        index++;
        setTimeout(typing, 80);
    }
}
typing();


/*==============================
      STAR TWINKLE
==============================*/

setInterval(() => {
    const stars = document.querySelector(".stars");
    if (stars) {
        stars.style.opacity = Math.random() * 0.25 + 0.15;
    }
}, 1200);


/*==============================
      BACK TO TOP BUTTON
==============================*/

const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        topBtn.style.display = "flex";
    } else {
        topBtn.style.display = "none";
    }
});



/*==============================
      CANVAS CONFETTI
==============================*/

const canvas = document.getElementById("confetti-canvas");
let confetti = [];
let confettiAnimationId = null;

class ConfettiParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height - 20;
        this.size = Math.random() * 8 + 6;
        this.speedY = Math.random() * 5 + 3;
        this.speedX = Math.random() * 4 - 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 4 - 2;
        
        const colors = ["#FFD100", "#FF9933", "#1e88e5", "#ffffff", "#f4b400"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        this.x += Math.sin(this.y * 0.05) * 0.5;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function startConfetti() {
    canvas.style.display = "block";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    confetti = [];
    for (let i = 0; i < 150; i++) {
        confetti.push(new ConfettiParticle());
    }
    
    const ctx = canvas.getContext("2d");
    
    if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;
        confetti.forEach(p => {
            p.update();
            p.draw(ctx);
            if (p.y < canvas.height) active = true;
        });
        
        if (active) {
            confettiAnimationId = requestAnimationFrame(animate);
        }
    }
    animate();
    
    setTimeout(() => {
        canvas.style.transition = "opacity 2s";
        canvas.style.opacity = 0;
        setTimeout(() => {
            canvas.style.display = "none";
            canvas.style.opacity = 1;
            cancelAnimationFrame(confettiAnimationId);
        }, 2000);
    }, 4000);
}


/*==============================
        FAN CORNER BOARD
==============================*/

const fanForm = document.getElementById("fan-form");
const fanWall = document.getElementById("fan-wall");

fanForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("fan-name").value.trim();
    const message = document.getElementById("fan-message").value.trim();
    const jersey = document.getElementById("fan-jersey").value || "7";
    
    if (!name || !message) return;
    
    const cardEl = document.createElement("div");
    cardEl.className = "jersey-card animated-jersey";
    cardEl.style.opacity = "0";
    cardEl.style.transform = "translateX(-20px)";
    cardEl.style.transition = "all 0.5s ease";
    
    cardEl.innerHTML = `
        <div class="jersey-icon">
            <i class="fa-solid fa-shirt"></i>
            <span class="jersey-number">${jersey}</span>
        </div>
        <div class="jersey-text">
            <h4>${escapeHTML(name)}</h4>
            <p>"${escapeHTML(message)}"</p>
        </div>
    `;
    
    fanWall.insertBefore(cardEl, fanWall.firstChild);
    
    setTimeout(() => {
        cardEl.style.opacity = "1";
        cardEl.style.transform = "translateX(0)";
    }, 100);
    
    startConfetti();
    
    fanForm.reset();
    document.getElementById("fan-jersey").value = "7";
});

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}


/*==============================
     WEB AUDIO SYNTH PLAYER
==============================*/

const playBtn = document.getElementById("audio-play-btn");
const audioWidget = document.getElementById("audio-widget");
let audioCtx = null;
let analyser = null;
let audioEl = null;
let isPlaying = false;
let animationFrameId = null;

function initAudio() {
    audioEl = new Audio("./PathuThala-AnthaAagayam.mp3");
    audioEl.loop = true;
    
    try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const audioSrc = audioCtx.createMediaElementSource(audioEl);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 32;
        audioSrc.connect(analyser);
        analyser.connect(audioCtx.destination);
    } catch (e) {
        console.warn("Web Audio API not fully supported on this protocol, falling back to standard audio.", e);
        audioCtx = null;
        analyser = null;
    }
}

function toggleAudio() {
    if (!audioEl) initAudio();
    
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    if (isPlaying) {
        audioEl.pause();
        isPlaying = false;
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        audioWidget.classList.remove("playing");
        cancelAnimationFrame(animationFrameId);
        document.querySelectorAll(".visualizer .bar").forEach(bar => bar.style.height = "3px");
    } else {
        audioEl.play().then(() => {
            isPlaying = true;
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            audioWidget.classList.add("playing");
            animateVisualizer();
        }).catch(err => {
            console.error("Playback failed", err);
        });
    }
}

function animateVisualizer() {
    if (!isPlaying) return;
    
    const bars = document.querySelectorAll(".visualizer .bar");
    
    if (analyser) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        function draw() {
            if (!isPlaying) return;
            animationFrameId = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);
            
            bars.forEach((bar, idx) => {
                const val = dataArray[idx % bufferLength] || 0;
                const percent = val / 255;
                const h = Math.floor(percent * 11) + 3;
                bar.style.height = `${h}px`;
            });
        }
        draw();
    } else {
        let lastTime = 0;
        function drawFallbackTimed(time) {
            if (!isPlaying) return;
            animationFrameId = requestAnimationFrame(drawFallbackTimed);
            if (time - lastTime > 80) {
                bars.forEach(bar => {
                    bar.style.height = (Math.floor(Math.random() * 12) + 3) + "px";
                });
                lastTime = time;
            }
        }
        drawFallbackTimed(0);
    }
}

playBtn.addEventListener("click", toggleAudio);