/**
 * Carousel Video Block
 * Full-viewport video carousel with content overlays and navigation controls
 * Inspired by Volkswagen Group homepage
 */
export default function decorate(block) {
  const slides = [...block.children];

  if (slides.length === 0) return;

  // Create carousel structure
  block.innerHTML = '';

  const slidesContainer = document.createElement('div');
  slidesContainer.className = 'carousel-video-slides';

  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'carousel-video-controls';

  // Process each slide
  slides.forEach((slide, index) => {
    const slideEl = document.createElement('div');
    slideEl.className = `carousel-video-slide ${index === 0 ? 'active' : ''}`;
    slideEl.dataset.index = index;

    // Get video and content from slide rows
    const rows = [...slide.children];

    // First row should contain video URL or video element
    if (rows[0]) {
      const videoContainer = document.createElement('div');
      videoContainer.className = 'carousel-video-background';

      // Check if it's a video link, embedded video, or plain text URL
      const videoLink = rows[0].querySelector('a');
      const videoEl = rows[0].querySelector('video');
      const picture = rows[0].querySelector('picture');

      // Check for plain text video URL (common in EDS markdown conversion)
      const textContent = rows[0].textContent.trim();
      const isVideoUrl = textContent.match(/https?:\/\/.*\.(mp4|webm|ogg|mov)/i);

      if (isVideoUrl) {
        // Plain text video URL
        const video = document.createElement('video');
        video.className = 'carousel-video-player';
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.crossOrigin = 'anonymous';

        const source = document.createElement('source');
        source.src = isVideoUrl[0];
        source.type = isVideoUrl[0].includes('.mp4') ? 'video/mp4' : 'video/webm';
        video.appendChild(source);

        // Add error handling - show gradient background on video load failure
        video.addEventListener('error', () => {
          videoContainer.classList.add('video-error');
        });

        // Also handle source error
        source.addEventListener('error', () => {
          videoContainer.classList.add('video-error');
        });

        videoContainer.appendChild(video);

        // Force load
        video.load();
      } else if (videoLink) {
        const videoSrc = videoLink.href;
        const video = document.createElement('video');
        video.className = 'carousel-video-player';
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;

        const source = document.createElement('source');
        source.src = videoSrc;
        source.type = videoSrc.includes('.mp4') ? 'video/mp4' : 'video/webm';
        video.appendChild(source);

        videoContainer.appendChild(video);
      } else if (videoEl) {
        videoEl.className = 'carousel-video-player';
        videoEl.autoplay = true;
        videoEl.muted = true;
        videoEl.loop = true;
        videoEl.playsInline = true;
        videoContainer.appendChild(videoEl);
      } else if (picture) {
        // Fallback to image if no video
        videoContainer.appendChild(picture);
      }

      slideEl.appendChild(videoContainer);
    }

    // Second row should contain content (heading, text, CTA)
    if (rows[1]) {
      const contentBox = document.createElement('div');
      contentBox.className = 'carousel-video-content';

      const contentInner = document.createElement('div');
      contentInner.className = 'carousel-video-content-inner';

      // Move all content from row to content box
      contentInner.innerHTML = rows[1].innerHTML;

      // Style CTAs as buttons
      const links = contentInner.querySelectorAll('a');
      links.forEach(link => {
        if (!link.closest('p') || link.parentElement.tagName === 'STRONG') {
          link.classList.add('carousel-video-cta');
        }
      });

      contentBox.appendChild(contentInner);
      slideEl.appendChild(contentBox);
    }

    slidesContainer.appendChild(slideEl);
  });

  // Create navigation controls
  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-video-prev';
  prevBtn.setAttribute('aria-label', 'Previous slide');
  prevBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-video-next';
  nextBtn.setAttribute('aria-label', 'Next slide');
  nextBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>';

  // Create dots
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'carousel-video-dots';

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `carousel-video-dot ${index === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  });

  controlsContainer.appendChild(prevBtn);
  controlsContainer.appendChild(dotsContainer);
  controlsContainer.appendChild(nextBtn);

  block.appendChild(slidesContainer);
  block.appendChild(controlsContainer);

  // Carousel functionality
  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayInterval;
  let isTransitioning = false;

  function goToSlide(index) {
    // Handle wrap-around
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    // Prevent rapid clicking during transition
    if (isTransitioning || index === currentIndex) return;

    isTransitioning = true;
    const previousIndex = currentIndex;
    currentIndex = index;

    // Update slides with smooth transition
    const allSlides = block.querySelectorAll('.carousel-video-slide');
    
    // Mark transitioning slide
    if (allSlides[previousIndex]) {
      allSlides[previousIndex].classList.add('transitioning');
    }

    // Small delay to ensure smooth crossfade
    requestAnimationFrame(() => {
      allSlides.forEach((s, i) => {
        if (i === currentIndex) {
          s.classList.add('active');
          // Play video for active slide
          const video = s.querySelector('video');
          if (video) {
            video.currentTime = 0; // Reset to start
            video.play().catch(() => {});
          }
        } else if (i === previousIndex) {
          // Pause previous video
          const video = s.querySelector('video');
          if (video) {
            video.pause();
          }
        }
      });

      // Remove active class from previous slide after transition
      setTimeout(() => {
        allSlides.forEach((s, i) => {
          if (i !== currentIndex) {
            s.classList.remove('active', 'transitioning');
          } else {
            s.classList.remove('transitioning');
          }
        });
        isTransitioning = false;
      }, 800); // Match CSS transition duration
    });

    // Update dots with smooth animation
    const allDots = block.querySelectorAll('.carousel-video-dot');
    allDots.forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide, 5000); // 5 seconds per slide (including 0.8s transition)
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
  }

  // Event listeners
  prevBtn.addEventListener('click', () => {
    prevSlide();
    startAutoplay();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    startAutoplay();
  });

  dotsContainer.addEventListener('click', (e) => {
    const dot = e.target.closest('.carousel-video-dot');
    if (dot) {
      goToSlide(parseInt(dot.dataset.index, 10));
      startAutoplay();
    }
  });

  // Pause autoplay on hover
  block.addEventListener('mouseenter', stopAutoplay);
  block.addEventListener('mouseleave', startAutoplay);

  // Keyboard navigation
  block.setAttribute('tabindex', '0');
  block.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      startAutoplay();
    }
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  block.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  block.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next slide
        nextSlide();
      } else {
        // Swipe right - previous slide
        prevSlide();
      }
      startAutoplay();
    }
  }

  // Start autoplay
  startAutoplay();

  // Play first video with proper initialization
  const firstVideo = block.querySelector('.carousel-video-slide.active video');
  if (firstVideo) {
    firstVideo.currentTime = 0;
    firstVideo.play().catch(() => {
      // Autoplay might be blocked, add user interaction handler
      const playOnInteraction = () => {
        firstVideo.play().catch(() => {});
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('touchstart', playOnInteraction);
      };
      document.addEventListener('click', playOnInteraction, { once: true });
      document.addEventListener('touchstart', playOnInteraction, { once: true, passive: true });
    });
  }
}
