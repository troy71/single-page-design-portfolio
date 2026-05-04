const carousel = document.querySelector(".carousel");

if (carousel) {
  const viewport = carousel.querySelector(".carousel-viewport");
  const track = carousel.querySelector(".carousel-track");
  const prevButton = carousel.querySelector(".carousel-arrow-left");
  const nextButton = carousel.querySelector(".carousel-arrow-right");

  if (viewport && track) {
    const realSlides = Array.from(track.querySelectorAll(".carousel-slide"));

    if (realSlides.length > 0) {
      if (realSlides.length > 1) {
        const firstClone = realSlides[0].cloneNode(true);
        const lastClone = realSlides[realSlides.length - 1].cloneNode(true);

        firstClone.setAttribute("aria-hidden", "true");
        lastClone.setAttribute("aria-hidden", "true");
        firstClone.classList.add("carousel-slide-clone");
        lastClone.classList.add("carousel-slide-clone");

        track.appendChild(firstClone);
        track.insertBefore(lastClone, track.firstChild);
      }

      const slides = Array.from(track.querySelectorAll(".carousel-slide"));
      const lastTrackIndex = slides.length - 1;

      // Start with image 2 centered when available.
      let currentTrackIndex = realSlides.length > 1 ? 2 : 0;

      const positionTrack = (animate = true) => {
        const currentSlide = slides[currentTrackIndex];

        if (!currentSlide) {
          return;
        }

        track.style.transition = animate ? "transform 320ms ease" : "none";

        const offset =
          viewport.clientWidth / 2 -
          (currentSlide.offsetLeft + currentSlide.clientWidth / 2);
        track.style.transform = `translateX(${offset}px)`;
      };

      const goBy = (step) => {
        currentTrackIndex += step;
        positionTrack(true);
      };

      prevButton?.addEventListener("click", () => {
        goBy(-1);
      });

      nextButton?.addEventListener("click", () => {
        goBy(1);
      });

      track.addEventListener("transitionend", () => {
        if (realSlides.length <= 1) {
          return;
        }

        if (currentTrackIndex === 0) {
          currentTrackIndex = realSlides.length;
          positionTrack(false);
        }

        if (currentTrackIndex === lastTrackIndex) {
          currentTrackIndex = 1;
          positionTrack(false);
        }
      });

      window.addEventListener("resize", () => {
        positionTrack(false);
      });

      window.addEventListener("load", () => {
        positionTrack(false);
      });

      positionTrack(false);
    }
  }
}
