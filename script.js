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
            teamCards[0].offsetWidth +
            10;

        let activeIndex =
            Math.round(scrollLeft / cardWidth);

        activeIndex =
            Math.min(
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








/* =========================================
   GOOGLE REVIEWS CAROUSEL
========================================= */

const reviewsCarousel = document.querySelector(".reviews-carousel");
const reviewCards = document.querySelectorAll(".review-card");
const reviewDots = document.querySelectorAll(".review-dot");

if (reviewsCarousel && reviewCards.length && reviewDots.length) {

    const updateReviewDots = () => {

        const scrollLeft = reviewsCarousel.scrollLeft;

        const cardWidth =
            reviewCards[0].offsetWidth + 12;

        let activeIndex =
            Math.round(scrollLeft / cardWidth);

        activeIndex = Math.min(
            activeIndex,
            reviewDots.length - 1
        );

        reviewDots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === activeIndex
            );

        });

    };


    reviewsCarousel.addEventListener(
        "scroll",
        updateReviewDots,
        { passive: true }
    );


    reviewDots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            if (!reviewCards[index]) return;

            reviewsCarousel.scrollTo({

                left:
                    reviewCards[index].offsetLeft -
                    (reviewsCarousel.offsetWidth * 0.05),

                behavior: "smooth"

            });

        });

    });

}






























/* =========================================
   FOOTER / INTERNAL LINK SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});