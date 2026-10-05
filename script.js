// =========================================
// VISIBILITY PRO
// MAIN WEBSITE SCRIPT
// =========================================



// =========================================
// TEAM CAROUSEL
// =========================================

const teamCarousel =
    document.querySelector(".team-carousel");

const teamCards =
    document.querySelectorAll(".team-card");

const teamDots =
    document.querySelectorAll(".team-dot");


if (
    teamCarousel &&
    teamCards.length &&
    teamDots.length
) {

    function updateTeamDots() {

        const firstCard =
            teamCards[0];

        if (!firstCard) {
            return;
        }

        const cardWidth =
            firstCard.offsetWidth + 10;

        let activeIndex =
            Math.round(
                teamCarousel.scrollLeft /
                cardWidth
            );

        activeIndex =
            Math.max(
                0,
                Math.min(
                    activeIndex,
                    teamDots.length - 1
                )
            );


        teamDots.forEach(
            function (dot, index) {

                dot.classList.toggle(
                    "active",
                    index === activeIndex
                );

            }
        );

    }


    teamCarousel.addEventListener(
        "scroll",
        updateTeamDots,
        {
            passive: true
        }
    );


    teamDots.forEach(
        function (dot, index) {

            dot.addEventListener(
                "click",
                function () {

                    if (!teamCards[index]) {
                        return;
                    }


                    teamCarousel.scrollTo({

                        left:
                            teamCards[index]
                                .offsetLeft,

                        behavior:
                            "smooth"

                    });

                }
            );

        }
    );


    updateTeamDots();

}



// =========================================
// CLIENT REVIEWS API
// =========================================

const REVIEWS_API =
    "https://script.google.com/macros/s/AKfycbwKfsRrNtHT4YzEai8F0u9esxhG4qRzUSkKLXikb7N04uTS2_inHjxTSi41rb7KGHJ2/exec";

// =========================================
// ESCAPE HTML
// =========================================

function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}



// =========================================
// CREATE REVIEW CARD
// =========================================

function createReviewCard(review) {

    const name =
        escapeHTML(
            review.name || "Client"
        );


    const feedback =
        escapeHTML(
            review.feedback || ""
        );


    const rating =
        Math.max(
            1,
            Math.min(
                5,
                Number(review.rating) || 5
            )
        );


    const firstLetter =
        name
            .charAt(0)
            .toUpperCase();


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



// =========================================
// HOMEPAGE REVIEWS CONTAINER
// =========================================

const reviewsContainer =
    document.getElementById(
        "clientReviewsList"
    );



// =========================================
// INITIALIZE REVIEWS CAROUSEL
// =========================================

function initReviewsCarousel() {


    const reviewsCarousel =
        document.querySelector(
            ".reviews-carousel"
        );


    const reviewDots =
        document.querySelectorAll(
            ".review-dot"
        );


    if (!reviewsCarousel) {
        return;
    }



    function getReviewCards() {

        return reviewsCarousel.querySelectorAll(
            ".review-card"
        );

    }



    function getStepWidth() {

        const cards =
            getReviewCards();


        if (!cards.length) {
            return 0;
        }


        const firstCard =
            cards[0];


        const track =
            reviewsCarousel.querySelector(
                ".reviews-track"
            );


        if (!track) {
            return firstCard.offsetWidth;
        }


        const gap =
            parseFloat(
                getComputedStyle(track).gap
            ) || 0;


        return (
            firstCard.offsetWidth +
            gap
        );

    }



    // =========================================
    // UPDATE DOTS
    // =========================================

    function updateReviewDots() {

        const cards =
            getReviewCards();


        if (
            !cards.length ||
            !reviewDots.length
        ) {

            return;

        }


        const step =
            getStepWidth();


        if (!step) {
            return;
        }


        let activeIndex =
            Math.round(
                reviewsCarousel.scrollLeft /
                step
            );


        /*
        Existing homepage has 4 dots.

        Each dot represents a group/page
        instead of every individual review.
        */

        const cardsPerView =
            window.innerWidth <= 600
                ? 1
                : window.innerWidth <= 900
                    ? 2
                    : 3;


        let dotIndex =
            Math.floor(
                activeIndex /
                cardsPerView
            );


        dotIndex =
            Math.max(
                0,
                Math.min(
                    dotIndex,
                    reviewDots.length - 1
                )
            );


        reviewDots.forEach(
            function (dot, index) {

                dot.classList.toggle(
                    "active",
                    index === dotIndex
                );

            }
        );

    }



    // =========================================
    // CAROUSEL SCROLL
    // =========================================

    reviewsCarousel.addEventListener(
        "scroll",
        updateReviewDots,
        {
            passive: true
        }
    );



    // =========================================
    // DOT CLICK
    // =========================================

    reviewDots.forEach(
        function (dot, index) {

            dot.addEventListener(
                "click",
                function () {

                    const cards =
                        getReviewCards();


                    if (!cards.length) {
                        return;
                    }


                    const cardsPerView =
                        window.innerWidth <= 600
                            ? 1
                            : window.innerWidth <= 900
                                ? 2
                                : 3;


                    const targetIndex =
                        index *
                        cardsPerView;


                    const targetCard =
                        cards[targetIndex];


                    if (!targetCard) {
                        return;
                    }


                    reviewsCarousel.scrollTo({

                        left:
                            targetCard.offsetLeft,

                        behavior:
                            "smooth"

                    });

                }
            );

        }
    );



    // =========================================
    // MOBILE SWIPE
    // =========================================

    let touchStartX = 0;

    let touchStartY = 0;

    let touchEndX = 0;

    let touchEndY = 0;



    reviewsCarousel.addEventListener(
        "touchstart",
        function (event) {

            if (!event.touches.length) {
                return;
            }


            touchStartX =
                event.touches[0].clientX;


            touchStartY =
                event.touches[0].clientY;

        },
        {
            passive: true
        }
    );



    reviewsCarousel.addEventListener(
        "touchend",
        function (event) {

            if (
                !event.changedTouches.length
            ) {

                return;

            }


            touchEndX =
                event.changedTouches[0].clientX;


            touchEndY =
                event.changedTouches[0].clientY;


            const deltaX =
                touchEndX -
                touchStartX;


            const deltaY =
                touchEndY -
                touchStartY;


            /*
            Ignore vertical movement.
            */

            if (
                Math.abs(deltaY) >
                Math.abs(deltaX)
            ) {

                return;

            }


            /*
            Ignore small movement.
            */

            if (
                Math.abs(deltaX) < 50
            ) {

                return;

            }


            const cards =
                getReviewCards();


            if (!cards.length) {
                return;
            }


            const step =
                getStepWidth();


            if (!step) {
                return;
            }


            let currentIndex =
                Math.round(
                    reviewsCarousel.scrollLeft /
                    step
                );


            let nextIndex;


            /*
            Swipe LEFT
            */

            if (deltaX < 0) {

                nextIndex =
                    currentIndex + 1;

            }


            /*
            Swipe RIGHT
            */

            else {

                nextIndex =
                    currentIndex - 1;

            }


            nextIndex =
                Math.max(
                    0,
                    Math.min(
                        nextIndex,
                        cards.length - 1
                    )
                );


            const targetCard =
                cards[nextIndex];


            if (!targetCard) {
                return;
            }


            reviewsCarousel.scrollTo({

                left:
                    targetCard.offsetLeft,

                behavior:
                    "smooth"

            });

        },
        {
            passive: true
        }
    );



    // =========================================
    // DESKTOP MOUSE / TRACKPAD SCROLL
    // =========================================

    reviewsCarousel.addEventListener(
        "wheel",
        function (event) {

            /*
            Only convert vertical wheel movement
            into horizontal movement.
            */

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



    // =========================================
    // INITIAL DOT
    // =========================================

    updateReviewDots();

}


// =========================================
// LOAD HOMEPAGE REVIEWS
// =========================================

async function loadClientReviews() {

    const reviewsContainer =
        document.getElementById("clientReviewsList");

    if (!reviewsContainer) {
        console.error(
            "Reviews container #clientReviewsList not found."
        );
        return;
    }


    try {

        const response =
            await fetch(
                REVIEWS_API + "?t=" + Date.now(),
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Reviews API request failed: " +
                response.status
            );

        }


        const data =
            await response.json();


        console.log(
            "Visibility Pro Reviews API:",
            data
        );


        if (
            !data ||
            data.success !== true ||
            !Array.isArray(data.reviews)
        ) {

            throw new Error(
                "Invalid Reviews API response."
            );

        }


        if (data.reviews.length === 0) {

            reviewsContainer.innerHTML = `
                <div class="reviews-loading">
                    No approved reviews yet.
                </div>
            `;

            return;
        }


        // Homepage shows latest 10 reviews

        const latestReviews =
            data.reviews.slice(0, 10);


        // Replace loading message with real reviews

        reviewsContainer.innerHTML =
            latestReviews
                .map(createReviewCard)
                .join("");


        // Initialize carousel after cards are created

        setTimeout(
            function () {

                initReviewsCarousel();

            },
            100
        );


    } catch (error) {

        console.error(
            "Visibility Pro reviews error:",
            error
        );


        reviewsContainer.innerHTML = `
            <div class="reviews-loading">
                Reviews could not be loaded.
            </div>
        `;

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
            300
        );

    }
);


// =========================================
// FOOTER / INTERNAL LINK SMOOTH SCROLL
// =========================================

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                }
            );

        }
    );



// =========================================
// MOBILE MENU
// =========================================

const menuToggle =
    document.querySelector(
        ".menu-toggle"
    );


const mobileNav =
    document.querySelector(
        ".mobile-nav"
    );


if (
    menuToggle &&
    mobileNav
) {


    menuToggle.addEventListener(
        "click",
        function () {

            const isOpen =
                mobileNav.classList.toggle(
                    "show"
                );


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
                    ? "true"
                    : "false"
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
        .forEach(
            function (link) {

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

            }
        );

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


        setTimeout(
            function () {

                if (
                    preloader &&
                    preloader.parentNode
                ) {

                    preloader.parentNode
                        .removeChild(
                            preloader
                        );

                }

            },
            900
        );

    }



    /*
    Normal page load.
    */

    window.addEventListener(
        "load",
        function () {

            setTimeout(
                hidePreloader,
                700
            );

        }
    );



    /*
    Safety fallback.

    If something takes too long,
    never keep the page blocked.
    */

    setTimeout(
        hidePreloader,
        6000
    );


})();



// =========================================
// ENQUIRY POPUP
// =========================================

(function () {


    const enquiryPopup =
        document.getElementById(
            "enquiryPopup"
        );


    const enquiryPopupClose =
        document.getElementById(
            "enquiryPopupClose"
        );


    if (!enquiryPopup) {
        return;
    }



    let popupCount = 0;

    let repeatTimer = null;



    const MAX_POPUPS = 3;

    const FIRST_DELAY = 2500;

    /*
    Final repeat delay.

    Change to 10000 only if you want
    faster testing.
    */

    const REPEAT_DELAY = 60000;



    // =========================================
    // POPUP SOUND
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



            /*
            First tone
            */

            const oscillator1 =
                audioContext
                    .createOscillator();


            const gain1 =
                audioContext
                    .createGain();


            oscillator1.type =
                "sine";


            oscillator1.frequency
                .setValueAtTime(
                    740,
                    audioContext.currentTime
                );


            oscillator1.frequency
                .exponentialRampToValueAtTime(
                    988,
                    audioContext.currentTime +
                    0.14
                );


            gain1.gain
                .setValueAtTime(
                    0.0001,
                    audioContext.currentTime
                );


            gain1.gain
                .exponentialRampToValueAtTime(
                    0.30,
                    audioContext.currentTime +
                    0.025
                );


            gain1.gain
                .exponentialRampToValueAtTime(
                    0.0001,
                    audioContext.currentTime +
                    0.30
                );


            oscillator1.connect(
                gain1
            );


            gain1.connect(
                audioContext.destination
            );


            oscillator1.start();


            oscillator1.stop(
                audioContext.currentTime +
                0.30
            );



            /*
            Second tone
            */

            const oscillator2 =
                audioContext
                    .createOscillator();


            const gain2 =
                audioContext
                    .createGain();


            oscillator2.type =
                "sine";


            oscillator2.frequency
                .setValueAtTime(
                    988,
                    audioContext.currentTime +
                    0.13
                );


            oscillator2.frequency
                .exponentialRampToValueAtTime(
                    1318,
                    audioContext.currentTime +
                    0.25
                );


            gain2.gain
                .setValueAtTime(
                    0.0001,
                    audioContext.currentTime +
                    0.13
                );


            gain2.gain
                .exponentialRampToValueAtTime(
                    0.25,
                    audioContext.currentTime +
                    0.16
                );


            gain2.gain
                .exponentialRampToValueAtTime(
                    0.0001,
                    audioContext.currentTime +
                    0.48
                );


            oscillator2.connect(
                gain2
            );


            gain2.connect(
                audioContext.destination
            );


            oscillator2.start(
                audioContext.currentTime +
                0.13
            );


            oscillator2.stop(
                audioContext.currentTime +
                0.48
            );



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
    // CLICK OUTSIDE
    // =========================================

    enquiryPopup.addEventListener(
        "click",
        function (event) {


            if (
                event.target.classList
                    .contains(
                        "enquiry-popup-overlay"
                    )
            ) {

                closeEnquiryPopup();

            }

        }
    );



    // =========================================
    // ESC KEY
    // =========================================

    document.addEventListener(
        "keydown",
        function (event) {


            if (
                event.key ===
                "Escape"
            ) {


                if (
                    enquiryPopup.classList
                        .contains(
                            "show"
                        )
                ) {

                    closeEnquiryPopup();

                }

            }

        }
    );



    // =========================================
    // ENQUIRY FORM
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


})();