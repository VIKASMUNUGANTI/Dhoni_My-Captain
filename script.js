/*==============================
        HERO FADE
==============================*/

window.addEventListener("load", () => {

    document.querySelector(".hero-content").style.opacity = "1";

    document.querySelector(".hero-content").style.transform = "translateY(0)";

});


/*==============================
        SMOOTH SCROLL
==============================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior: "smooth"

        });

    });

});


/*==============================
      SCROLL REVEAL
==============================*/

const revealElements = document.querySelectorAll(

    ".card,.timeline-item,.photo,.trophy-card,.stat-box,.quote-section,.tribute"

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

        threshold: 0.2

    }

);

revealElements.forEach(item => {

    item.style.opacity = "0";

    item.style.transform = "translateY(60px)";

    item.style.transition = ".8s ease";

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

        threshold: .5

    }

);

counters.forEach(counter => counterObserver.observe(counter));


/*==============================
      IMAGE LIGHTBOX
==============================*/

const photos = document.querySelectorAll(".photo img");

const lightbox = document.createElement("div");

lightbox.id = "lightbox";

document.body.appendChild(lightbox);

photos.forEach(image => {

    image.addEventListener("click", () => {

        lightbox.classList.add("active");

        const img = document.createElement("img");

        img.src = image.src;

        while (lightbox.firstChild) {

            lightbox.removeChild(lightbox.firstChild);

        }

        lightbox.appendChild(img);

    });

});

lightbox.addEventListener("click", () => {

    lightbox.classList.remove("active");

});


/*==============================
      PARALLAX HERO
==============================*/

window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero");

    let scroll = window.pageYOffset;

    hero.style.backgroundPositionY = scroll * 0.5 + "px";

});


/*==============================
      FLOATING EFFECT
==============================*/

const cards = document.querySelectorAll(

    ".card,.trophy-card,.stat-box"

);

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px) scale(1.04)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/*==============================
      TYPEWRITER EFFECT
==============================*/

const text =

    "Happy Birthday My Captain 💛";

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
      GLOW EFFECT
==============================*/

setInterval(() => {

    document.querySelectorAll(".trophy-card").forEach(card => {

        card.classList.toggle("glow");

    });

}, 1500);


/*==============================
      BACK TO TOP BUTTON
==============================*/

const topBtn = document.createElement("button");

topBtn.innerHTML = "⬆";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};


/*==============================
      STAR TWINKLE
==============================*/

setInterval(() => {

    const stars = document.querySelector(".stars");

    stars.style.opacity =

        Math.random() * .25 + .1;

}, 1200);