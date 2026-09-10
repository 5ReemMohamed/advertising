document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("smartMenuToggle");
    const navMenu = document.getElementById("smartNavMenu");
    const navLinks = document.querySelectorAll(".smart-nav-menu a");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("show");

            const icon = menuToggle.querySelector("i");

            if (navMenu.classList.contains("show")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {

            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

            if (window.innerWidth <= 991) {
                navMenu.classList.remove("show");

                const icon = menuToggle.querySelector("i");
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    });

    window.addEventListener("scroll", function () {

        const hero = document.querySelector(".smart-hero");
        const scrollPosition = window.scrollY;

        if (hero && scrollPosition > 80) {
            hero.classList.add("smart-scrolled");
        } else if (hero) {
            hero.classList.remove("smart-scrolled");
        }

    });
    const smartSkills = document.querySelectorAll(".smart-skill-line span");

    if (smartSkills.length) {
        smartSkills.forEach(function (skill) {
            const width = skill.style.width;
            skill.style.width = "0";

            setTimeout(function () {
                skill.style.width = width;
            }, 400);
        });
    }

    const smartAbout = document.querySelector(".smart-about-section");

    if (smartAbout) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        smartAbout.classList.add("smart-about-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2
            }
        );

        observer.observe(smartAbout);
    }
        const cards = document.querySelectorAll(".vision-card");
    const dots = document.querySelectorAll(".section-dots .dot");

    cards.forEach((card, index) => {

        card.addEventListener("mouseenter", function () {

            cards.forEach(item => {
                item.classList.remove("active-card");
            });

            dots.forEach(dot => {
                dot.classList.remove("active");
            });

            card.classList.add("active-card");

            if (dots[index]) {
                dots[index].classList.add("active");
            }
        });

        card.addEventListener("mouseleave", function () {
            cards.forEach(item => {
                item.classList.remove("active-card");
            });

            cards[0].classList.add("active-card");

            dots.forEach(dot => {
                dot.classList.remove("active");
            });

            if (dots[0]) {
                dots[0].classList.add("active");
            }
        });
    });

    const serviceImages = document.querySelectorAll(".service-image-card, .brand-identity-image");
    const serviceCards = document.querySelectorAll(".service-content-card, .brand-identity-content");

    serviceImages.forEach((image, index) => {
        image.style.opacity = "0";
        image.style.transform = "translateY(30px)";
        image.style.transition = "opacity .7s ease, transform .7s ease";
        image.dataset.delay = index * 100;
    });

    serviceCards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity .7s ease, transform .7s ease";
        card.dataset.delay = index * 100;
    });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.dataset.delay || 0;

                setTimeout(() => {
                    element.style.opacity = "1";
                    element.style.transform = "translateY(0)";
                }, delay);

                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.15
    });

    serviceImages.forEach(element => observer.observe(element));
    serviceCards.forEach(element => observer.observe(element));

    document.querySelectorAll(".service-link").forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            if (!href || href === "#") {
                e.preventDefault();
            }
        });
    });
 const wrapper = document.getElementById("galleryWrapper");
    const track = document.getElementById("galleryTrack");
    const items = document.querySelectorAll(".gallery-item");

    const modalElement = document.getElementById("galleryModal");
    const modalImage = document.getElementById("modalGalleryImage");

    const galleryModal = new bootstrap.Modal(modalElement);

    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;
    let hasMoved = false;

    const originalItems = Array.from(items);

    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
    });

    function getPageX(event) {
        if (event.touches && event.touches.length) {
            return event.touches[0].pageX;
        }

        if (event.changedTouches && event.changedTouches.length) {
            return event.changedTouches[0].pageX;
        }

        return event.pageX;
    }

    function startDrag(event) {

        isDragging = true;
        hasMoved = false;

        startX = getPageX(event);
        scrollStart = wrapper.scrollLeft;

        wrapper.classList.add("grabbing");

        track.classList.remove("gallery-auto-scroll");
    }

    function moveDrag(event) {

        if (!isDragging) {
            return;
        }

        const currentX = getPageX(event);
        const distance = currentX - startX;

        if (Math.abs(distance) > 5) {
            hasMoved = true;
        }

        wrapper.scrollLeft = scrollStart - distance * 1.5;

        if (event.cancelable) {
            event.preventDefault();
        }
    }

    function endDrag() {

        if (!isDragging) {
            return;
        }

        isDragging = false;

        wrapper.classList.remove("grabbing");

        setTimeout(() => {
            if (!isDragging) {
                track.classList.add("gallery-auto-scroll");
            }
        }, 100);
    }

    wrapper.addEventListener("mousedown", startDrag);
    wrapper.addEventListener("mousemove", moveDrag);
    wrapper.addEventListener("mouseup", endDrag);
    wrapper.addEventListener("mouseleave", endDrag);

    wrapper.addEventListener("touchstart", startDrag, {
        passive: true
    });

    wrapper.addEventListener("touchmove", moveDrag, {
        passive: false
    });

    wrapper.addEventListener("touchend", endDrag);

    wrapper.addEventListener("mouseenter", function () {
        track.style.animationPlayState = "paused";
    });

    wrapper.addEventListener("mouseleave", function () {
        if (!isDragging) {
            track.style.animationPlayState = "running";
        }
    });

    document.querySelectorAll(".gallery-item").forEach(item => {

        item.addEventListener("click", function () {

            if (hasMoved) {
                return;
            }

            const image = this.querySelector("img");

            if (!image) {
                return;
            }

            modalImage.src = image.src;
            modalImage.alt = image.alt;

            galleryModal.show();
        });

    });

    modalElement.addEventListener("hidden.bs.modal", function () {
        modalImage.src = "";
    });
      const section = document.querySelector(".why-us-section");
    const counter = document.querySelector(".counter");

    if (!section) {
        return;
    }

    const sectionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    section.classList.add("show");

                    if (counter && !counter.dataset.started) {

                        counter.dataset.started = "true";

                        const target = Number(counter.dataset.target);
                        let current = 0;

                        const duration = 1800;
                        const startTime = performance.now();

                        function updateCounter(currentTime) {

                            const progress = Math.min(
                                (currentTime - startTime) / duration,
                                1
                            );

                            current = Math.floor(progress * target);

                            counter.textContent = current;

                            if (progress < 1) {
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target;
                            }
                        }

                        requestAnimationFrame(updateCounter);
                    }

                    sectionObserver.unobserve(section);
                }

            });
        },
        {
            threshold: 0.2
        }
    );

    sectionObserver.observe(section);
      const steps = document.querySelectorAll(".process-step");

    const stepsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = [...steps].indexOf(entry.target);

                    setTimeout(() => {
                        entry.target.classList.add("show");
                    }, index * 150);

                    stepsObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2
        }
    );

    steps.forEach((step) => stepsObserver.observe(step));
        const companyCards = document.querySelectorAll(".sector-card");

    const cardsObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.classList.add("sector-visible");
                    }, index * 100);

                    cardsObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    companyCards.forEach(function (card) {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition =
            "opacity .6s ease, transform .6s ease, border-color .45s ease, background .45s ease, box-shadow .45s ease";

        cardsObserver.observe(card);
    });

    const style = document.createElement("style");

    style.textContent = `
        .sector-card.sector-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;

    document.head.appendChild(style);
     const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        const whatsappNumber = "966564014040";

        const text =
            "طلب جديد من الموقع%0A%0A" +
            "الاسم: " + encodeURIComponent(name) + "%0A" +
            "رقم الجوال: " + encodeURIComponent(phone) + "%0A" +
            "البريد الإلكتروني: " + encodeURIComponent(email || "غير مذكور") + "%0A" +
            "الرسالة: " + encodeURIComponent(message);

        const whatsappUrl =
            "https://wa.me/" + whatsappNumber + "?text=" + text;

        window.open(whatsappUrl, "_blank");
    });
const smartNavbar = document.querySelector(".smart-navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        smartNavbar.classList.add("scrolled");
    } else {
        smartNavbar.classList.remove("scrolled");
    }
});
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
});
