/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */

// Stock data fetch function
async function fetchStockData() {
  // Placeholder for stock data - in production this would fetch from an API
  return {
    pref: '101.40',
    ord: '101.10'
  };
}

// Create social media icons
function createSocialIcons() {
  const socialLinks = [
    {
      name: 'X (Twitter)',
      url: 'https://twitter.com/VWGroup',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/user/VolkswagenGroup',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@volkswagen',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/volkswagen-ag',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'
    }
  ];

  const socialDiv = document.createElement('div');
  socialDiv.className = 'footer-social';

  socialLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.url;
    a.setAttribute('aria-label', link.name);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.innerHTML = link.icon;
    socialDiv.appendChild(a);
  });

  return socialDiv;
}

export default async function decorate(block) {
  block.textContent = '';

  // Create disclaimer section
  const disclaimer = document.createElement('div');
  disclaimer.className = 'footer-disclaimer';
  
  const disclaimerInner = document.createElement('div');
  disclaimerInner.innerHTML = `
    The specified fuel consumption and emission data does not refer to a single vehicle and is not part of the offer but is only intended for comparison between different types of vehicles. Additional equipment and accessories (additional components, tyre formats, etc.) can alter relevant vehicle parameters such as weight, rolling resistance and aerodynamics, affecting the vehicle's fuel consumption, power consumption, CO₂ emissions and driving performance values in addition to weather and traffic conditions and individual driving behavior. Further information on official fuel consumption data and official specific CO₂ emissions for new passenger cars can be found in the "Guide to fuel economy, CO₂ emissions and power consumption for new passenger car models", which is available free of charge from all sales dealerships and from DAT Deutsche Automobil Treuhand GmbH, Hellmuth-Hirth-Str. 1, D-73760 Ostfildern, Germany and at <a href="https://www.dat.de/co2" target="_blank" rel="noopener noreferrer">www.dat.de/co2</a>.
  `;
  
  disclaimer.appendChild(disclaimerInner);
  
  // Mark disclaimer as footer trigger point
  disclaimer.dataset.footerTrigger = 'true';

  // Create main footer content (sticky bar)
  const footerContent = document.createElement('div');
  footerContent.className = 'footer-content';

  // Create inner wrapper for max-width constraint
  const footerContentInner = document.createElement('div');
  footerContentInner.className = 'footer-content-inner';

  // Copyright and links section
  const copyrightLinks = document.createElement('div');
  copyrightLinks.className = 'footer-copyright-and-links';
  copyrightLinks.innerHTML = `
    <span>© ${new Date().getFullYear()} Volkswagen Group</span>
    <a href="/imprint">Imprint</a>
    <a href="/privacy">Privacy</a>
    <a href="/terms-of-service">Terms of Service</a>
    <a href="/cookie-policy">Cookie Policy</a>
    <a href="/third-party-licence-notes">Third Party Licence Notes</a>
    <a href="#" class="cookie-settings">Cookie Settings</a>
  `;

  // Stocks and social section
  const stocksSocial = document.createElement('div');
  stocksSocial.className = 'footer-stocks-and-social';

  // Stock prices
  const stocks = document.createElement('div');
  stocks.className = 'footer-stocks';

  // Fetch and display stock data
  fetchStockData().then(data => {
    stocks.innerHTML = `
      <div class="footer-stocks-item ready">
        <span class="footer-stocks-item-label">PREF</span>
        <span class="footer-stocks-item-price">${data.pref} €</span>
      </div>
      <div class="footer-stocks-item ready">
        <span class="footer-stocks-item-label">ORD</span>
        <span class="footer-stocks-item-price">${data.ord} €</span>
      </div>
    `;
  });

  // Add social icons
  const socialIcons = createSocialIcons();

  stocksSocial.appendChild(stocks);
  stocksSocial.appendChild(socialIcons);

  footerContentInner.appendChild(copyrightLinks);
  footerContentInner.appendChild(stocksSocial);
  
  footerContent.appendChild(footerContentInner);

  // Create logo section with actual VW Group logo
  const logoSection = document.createElement('div');
  logoSection.className = 'footer-logo';
  logoSection.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 332.2 18">
      <path d="M321.9 9V3.3h5.2c1.1 0 1.6.5 1.6 1.6v2.5c0 1.1-.5 1.6-1.6 1.6zm-3.5 9h3.5v-5.9h5.7c2.9 0 4.6-1.6 4.6-4.6v-3c0-2.9-1.6-4.6-4.6-4.6h-9.2zm-17.1 0h5.1c2.9 0 4.6-1.6 4.6-4.6V.1h-3.5v13.1c0 1.1-.5 1.6-1.6 1.6h-4c-1.1 0-1.6-.5-1.6-1.6V.1h-3.5v13.3c-.1 3 1.5 4.6 4.5 4.6M280 14.9c-1.1 0-1.6-.5-1.6-1.6V4.9c0-1.1.5-1.6 1.6-1.6h4.3c1.1 0 1.6.5 1.6 1.6v8.3c0 1.1-.5 1.6-1.6 1.6H280zm-.5 3.1h5.3c2.9 0 4.6-1.6 4.6-4.6V4.7c0-2.9-1.6-4.6-4.6-4.6h-5.3c-2.9 0-4.6 1.6-4.6 4.6v8.8c0 2.9 1.6 4.5 4.6 4.5m-22.4-9.5V3.3h5.5c1.1 0 1.6.5 1.6 1.6v2c0 1.1-.5 1.6-1.6 1.6zm-3.4 9.5h3.5v-6.3h2.8l4.4 6.3h4l-4.6-6.4c2.5-.2 3.8-1.8 3.8-4.6V4.6c0-2.9-1.6-4.6-4.6-4.6h-9.4v18zm-17.3 0h5.3c2.9 0 4.6-1.6 4.6-4.6v-5h-6.5v3.1h3.1v1.6c0 1.1-.5 1.6-1.6 1.6H237c-1.1 0-1.6-.5-1.6-1.6V4.9c0-1.1.5-1.6 1.6-1.6h4.3c1.1 0 1.6.5 1.6 1.6v.3h3.5v-.6c0-2.9-1.6-4.6-4.6-4.6h-5.3c-2.9 0-4.6 1.6-4.6 4.6v8.8c0 3 1.5 4.6 4.5 4.6m-39.7 0h3.5V5.9L208 18h3.7V.1h-3.5v12.1L200.4.1h-3.7zm-20 0h12.6v-3.1h-9.1v-4.3h8V7.4h-8v-4h9.1V.2h-12.6zm-17.4 0h5.3c2.9 0 4.6-1.6 4.6-4.6v-5h-6.5v3.1h3.1v1.6c0 1.1-.5 1.6-1.6 1.6h-4.3c-1.1 0-1.6-.5-1.6-1.6V4.9c0-1.1.5-1.6 1.6-1.6h4.3c1.1 0 1.6.5 1.6 1.6v.3h3.5v-.6c0-2.9-1.6-4.6-4.6-4.6h-5.3c-2.9 0-4.6 1.6-4.6 4.6v8.8c0 3 1.6 4.6 4.5 4.6m-21.7-6.7 2.6-7.8 2.6 7.8zm-5.9 6.7h3.8l1.2-3.6h7.3l1.2 3.6h3.8L142.9.1h-5zm-44.9 0h5.7c2.6 0 4-1.4 4-4v-2.3c0-2.4-1.2-3.5-3.6-3.9l-5.1-.9c-1-.1-1.3-.5-1.3-1.3v-1c0-.9.4-1.3 1.3-1.3h4c.9 0 1.3.4 1.3 1.3V5h3.5V4c0-2.6-1.4-4-4-4h-5.4c-2.6 0-4 1.4-4 4v2.2c0 2.4 1.2 3.6 3.6 3.9l5.1.9c1 .1 1.4.5 1.4 1.3v1.3c0 .9-.4 1.3-1.3 1.3h-4.2c-.9 0-1.3-.4-1.3-1.3V13h-3.7v1.1c0 2.5 1.4 3.9 4 3.9m-24.7 0h3.4v-7.5h1.8l5.4 7.5h4.1l-6.7-9L76.7.1h-4.1l-5.3 7.4h-1.8V.1H62V18zm-17.6 0h11.1v-3.1h-7.7V.1h-3.5V18zm-16.8-3.1c-1.1 0-1.6-.5-1.6-1.6V4.9c0-1.1.5-1.6 1.6-1.6H32c1.1 0 1.6.5 1.6 1.6v8.3c0 1.1-.5 1.6-1.6 1.6h-4.3zm-.6 3.1h5.3c2.9 0 4.6-1.6 4.6-4.6V4.7C37 1.8 35.4.1 32.4.1h-5.3c-2.9 0-4.6 1.6-4.6 4.6v8.8c.1 2.9 1.7 4.5 4.6 4.5M6 18h5L17.1.1h-3.8L8.5 14.3 3.8.1H0zm101.2 0h4.3L115 4.8l3.5 13.2h4.3L127.5.1h-3.7l-3.3 13.3L117.1.1h-4.3l-3.4 13.3L106.1.1h-3.7z" style="fill:#fff"/>
    </svg>
  `;

  // Append all sections to block
  // Footer bar first (will stick to top), then disclaimer, then logo
  block.appendChild(footerContent);
  block.appendChild(disclaimer);
  block.appendChild(logoSection);

  // Setup Intersection Observer and scroll tracking for footer bar
  setupFooterBarTracking(disclaimer, footerContent);
}

/**
 * Setup tracking to toggle footer bar appearance based on scroll direction and position
 * @param {Element} trigger The element to watch (disclaimer)
 * @param {Element} footerBar The footer bar element
 */
function setupFooterBarTracking(trigger, footerBar) {
  let lastScrollY = window.scrollY;
  let ticking = false;
  let isInFooterArea = false;

  // Get the footer element
  const footerElement = footerBar.closest('footer');

  // Create intersection observer to watch when footer is coming into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // When footer starts entering viewport from bottom
        if (entry.isIntersecting && entry.boundingClientRect.top < window.innerHeight) {
          // Footer is in view - bar becomes part of footer
          isInFooterArea = true;
          footerBar.classList.add('in-footer');
          footerBar.classList.remove('hidden');
        } else {
          // Footer not in view - bar is fixed and controlled by scroll
          isInFooterArea = false;
          footerBar.classList.remove('in-footer');
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: [0, 0.1],
    }
  );

  // Scroll direction handler
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Don't hide if we're in the footer area
    if (isInFooterArea) {
      lastScrollY = currentScrollY;
      return;
    }

    // Determine scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling DOWN - hide the bar
      footerBar.classList.add('hidden');
    } else if (currentScrollY < lastScrollY) {
      // Scrolling UP - show the bar
      footerBar.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
  };

  // Throttle scroll events using requestAnimationFrame
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  // Initialize observers and listeners
  // Watch the footer element itself to detect when it enters viewport
  if (footerElement) {
    observer.observe(footerElement);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
}
