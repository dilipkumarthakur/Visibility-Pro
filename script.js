// =========================================
// TEAM CAROUSEL
// =========================================

const teamCarousel = document.querySelector(".team-carousel");
const teamCards = document.querySelectorAll(".team-card");
const teamDots = document.querySelectorAll(".team-dot");

if (teamCarousel && teamCards.length && teamDots.length) {

    const updateTeamDots = () => {

        const scrollLeft = teamCarousel.scrollLeft;

        const cardWidth =
            teamCards[0].offsetWidth + 10;

        let activeIndex =
            Math.round(scrollLeft / cardWidth);

        activeIndex = Math.min(
            activeIndex,
            teamDots.length - 1
        );

        teamDots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === activeIndex
            );

        });

    };


    teamCarousel.addEventListener(
        "scroll",
        updateTeamDots,
        { passive: true }
    );


    teamDots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            if (teamCards[index]) {

                teamCarousel.scrollTo({

                    left:
                        teamCards[index].offsetLeft -
                        (teamCarousel.offsetWidth * 0.05),

                    behavior: "smooth"

                });

            }

        });

    });

}


// =========================================
// CLIENT REVIEWS API
// =========================================

const REVIEWS_API =
    "https://script.google.com/macros/s/AKfycbwKfsRrNtHT4YzEai8F0u9esxhG4qRzUSkKLXikb7N04uTS2_inHjxTSi41rb7KGHJ2/exec";


function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function createReviewCard(review) {

    const name =
        escapeHTML(review.name || "Client");

    const feedback =
        escapeHTML(review.feedback || "");

    const rating =
        Math.max(
            1,
            Math.min(
                5,
                Number(review.rating) || 5
            )
        );

    const firstLetter =
        name.charAt(0).toUpperCase();


    return `
        <article class="review-card">

            <div class="review-top">

                <div class="review-person">

                    <div class="review-avatar">
                        ${firstLetter}
                    </div>

                    <div>

                        <h3>
                            ${name}
                        </h3>

                        <span>
                            Client Feedback
                        </span>

                    </div>

                </div>


                <div class="review-google">
                    G
                </div>

            </div>


            <div class="review-stars">

                ${"★".repeat(rating)}
                ${"☆".repeat(5 - rating)}

            </div>


            <p>
                ${feedback}
            </p>

        </article>
    `;

}


const reviewsContainer =
    document.getElementById("clientReviewsList");


async function loadClientReviews() {

    if (!reviewsContainer) {
        return;
    }


    const controller =
        new AbortController();


    const timeout =
        setTimeout(() => {

            controller.abort();

        }, 5000);


    try {

        const response =
            await fetch(
                REVIEWS_API,
                {
                    method: "GET",
                    signal: controller.signal,
                    cache: "no-store"
                }
            );


        clearTimeout(timeout);


        if (!response.ok) {

            throw new Error(
                "Reviews API request failed."
            );

        }


        const data =
            await response.json();


        if (
            !data ||
            !data.success ||
            !Array.isArray(data.reviews)
        ) {

            return;

        }


        if (data.reviews.length === 0) {

            return;

        }


        reviewsContainer.innerHTML =
            data.reviews
                .map(createReviewCard)
                .join("");


    } catch (error) {

        clearTimeout(timeout);

        console.error(
            "Reviews could not be loaded:",
            error
        );

    }

}


// =========================================
// LOAD REVIEWS AFTER PAGE LOAD
// =========================================

window.addEventListener(
    "load",
    function () {

        setTimeout(
            function () {

                loadClientReviews();

            },
            500
        );

    }
);


// =========================================
// REVIEW SCROLL
// =========================================

const reviewsCarousel =
    document.querySelector(".reviews-carousel");


if (reviewsCarousel) {

    reviewsCarousel.addEventListener(
        "wheel",
        function (event) {

            if (
                Math.abs(event.deltaY) >
                Math.abs(event.deltaX)
            ) {

                event.preventDefault();

                reviewsCarousel.scrollLeft +=
                    event.deltaY;

            }

        },
        {
            passive: false
        }
    );

}


// =========================================
// FOOTER / INTERNAL LINK SMOOTH SCROLL
// =========================================

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(targetId);


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",
                    block: "start"

                });

            }
        );

    });


// =========================================
// MOBILE MENU
// =========================================

const menuToggle =
    document.querySelector(".menu-toggle");

const mobileNav =
    document.querySelector(".mobile-nav");


if (menuToggle && mobileNav) {

    menuToggle.addEventListener(
        "click",
        function () {

            const isOpen =
                mobileNav.classList.toggle("show");


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );


            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close menu"
                    : "Open menu"
            );

        }
    );


    mobileNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                function () {

                    mobileNav.classList.remove(
                        "show"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuToggle.setAttribute(
                        "aria-label",
                        "Open menu"
                    );

                }
            );

        });

}


// =========================================
// GOLDEN WAVE PRELOADER
// =========================================

(function () {

    const preloader =
        document.getElementById(
            "sitePreloader"
        );


    if (!preloader) {
        return;
    }


    let hidden = false;


    function hidePreloader() {

        if (hidden) {
            return;
        }


        hidden = true;


        preloader.classList.add(
            "is-hidden"
        );


        setTimeout(() => {

            if (preloader) {

                preloader.remove();

            }

        }, 700);

    }


    if (
        document.readyState ===
        "complete"
    ) {

        setTimeout(
            hidePreloader,
            1200
        );

    } else {

        window.addEventListener(
            "load",
            () => {

                setTimeout(
                    hidePreloader,
                    1200
                );

            },
            {
                once: true
            }
        );

    }


    // Safety fallback
    setTimeout(
        hidePreloader,
        6000
    );

})();


// =========================================
// ENQUIRY POPUP + PREMIUM SOUND
// =========================================

const enquiryPopup =
    document.getElementById(
        "enquiryPopup"
    );

const enquiryPopupClose =
    document.getElementById(
        "enquiryPopupClose"
    );


if (enquiryPopup) {

    let popupCount = 0;

    let repeatTimer = null;


    // =========================================
    // SETTINGS
    // =========================================

    const MAX_POPUPS = 3;

    const FIRST_DELAY = 2100;

    const REPEAT_DELAY = 10000;


    // =========================================
    // PREMIUM POPUP SOUND
    // =========================================

    function playEnquirySound() {

        try {

            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;


            if (!AudioContext) {

                return;

            }


            const audioContext =
                new AudioContext();


            if (
                audioContext.state ===
                "suspended"
            ) {

                audioContext.resume();

            }


            // =========================================
            // FIRST TONE
            // =========================================

            const oscillator1 =
                audioContext.createOscillator();

            const gain1 =
                audioContext.createGain();


            oscillator1.type = "sine";


            oscillator1.frequency.setValueAtTime(
                740,
                audioContext.currentTime
            );


            oscillator1.frequency
                .exponentialRampToValueAtTime(
                    988,
                    audioContext.currentTime + 0.14
                );


            gain1.gain.setValueAtTime(
                0.0001,
                audioContext.currentTime
            );


            gain1.gain
                .exponentialRampToValueAtTime(
                    0.30,
                    audioContext.currentTime + 0.025
                );


            gain1.gain
                .exponentialRampToValueAtTime(
                    0.0001,
                    audioContext.currentTime + 0.30
                );


            oscillator1.connect(gain1);

            gain1.connect(
                audioContext.destination
            );


            oscillator1.start();


            oscillator1.stop(
                audioContext.currentTime + 0.30
            );


            // =========================================
            // SECOND HIGHER TONE
            // =========================================

            const oscillator2 =
                audioContext.createOscillator();

            const gain2 =
                audioContext.createGain();


            oscillator2.type = "sine";


            oscillator2.frequency.setValueAtTime(
                988,
                audioContext.currentTime + 0.13
            );


            oscillator2.frequency
                .exponentialRampToValueAtTime(
                    1318,
                    audioContext.currentTime + 0.25
                );


            gain2.gain.setValueAtTime(
                0.0001,
                audioContext.currentTime + 0.13
            );


            gain2.gain
                .exponentialRampToValueAtTime(
                    0.25,
                    audioContext.currentTime + 0.16
                );


            gain2.gain
                .exponentialRampToValueAtTime(
                    0.0001,
                    audioContext.currentTime + 0.48
                );


            oscillator2.connect(gain2);

            gain2.connect(
                audioContext.destination
            );


            oscillator2.start(
                audioContext.currentTime + 0.13
            );


            oscillator2.stop(
                audioContext.currentTime + 0.48
            );


            // =========================================
            // CLEANUP
            // =========================================

            setTimeout(
                function () {

                    if (
                        audioContext.state !==
                        "closed"
                    ) {

                        audioContext.close();

                    }

                },
                700
            );


        } catch (error) {

            console.log(
                "Popup sound could not play:",
                error
            );

        }

    }


    // =========================================
    // OPEN POPUP
    // =========================================

    function openEnquiryPopup() {

        if (
            popupCount >=
            MAX_POPUPS
        ) {

            return;

        }


        enquiryPopup.classList.add(
            "show"
        );


        enquiryPopup.setAttribute(
            "aria-hidden",
            "false"
        );


        playEnquirySound();


        popupCount++;

    }


    // =========================================
    // CLOSE POPUP
    // =========================================

    function closeEnquiryPopup() {

        enquiryPopup.classList.remove(
            "show"
        );


        enquiryPopup.setAttribute(
            "aria-hidden",
            "true"
        );


        if (
            popupCount <
            MAX_POPUPS
        ) {

            clearTimeout(
                repeatTimer
            );


            repeatTimer =
                setTimeout(
                    function () {

                        openEnquiryPopup();

                    },
                    REPEAT_DELAY
                );

        }

    }


    // =========================================
    // CLOSE BUTTON
    // =========================================

    if (enquiryPopupClose) {

        enquiryPopupClose.addEventListener(
            "click",
            closeEnquiryPopup
        );

    }


    // =========================================
    // CLICK OUTSIDE POPUP
    // =========================================

    enquiryPopup.addEventListener(
        "click",
        function (event) {

            if (
                event.target.classList.contains(
                    "enquiry-popup-overlay"
                )
            ) {

                closeEnquiryPopup();

            }

        }
    );


    // =========================================
    // ESCAPE KEY
    // =========================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                if (
                    enquiryPopup.classList.contains(
                        "show"
                    )
                ) {

                    closeEnquiryPopup();

                }

            }

        }
    );


    // =========================================
    // FORM SUBMISSION
    // =========================================

    const enquiryForm =
        enquiryPopup.querySelector(
            ".enquiry-popup-form"
        );


    if (enquiryForm) {

        enquiryForm.addEventListener(
            "submit",
            function () {

                clearTimeout(
                    repeatTimer
                );


                popupCount =
                    MAX_POPUPS;

            }
        );

    }


    // =========================================
    // FIRST POPUP
    // =========================================

    window.addEventListener(
        "load",
        function () {

            setTimeout(
                function () {

                    openEnquiryPopup();

                },
                FIRST_DELAY
            );

        }
    );

}