/* eslint-disable */
/* global WebImporter */

/**
 * Site-wide DOM cleanup transformer for Volkswagen Group
 *
 * Removes:
 * - Header navigation
 * - Footer
 * - Cookie dialogs
 * - Consumption disclaimers
 * - Search overlays
 * - Popover menus
 *
 * Source: https://www.volkswagen-group.com
 * Generated: 2026-01-18
 */
export default function transform(document) {
  // Remove header
  const header = document.querySelector('.layout--header, header, .header-container');
  if (header) header.remove();

  // Remove footer
  const footer = document.querySelector('.layout--footer, footer, .footer');
  if (footer) footer.remove();

  // Remove footer logo section
  const footerLogo = document.querySelector('.layout--footer-logo');
  if (footerLogo) footerLogo.remove();

  // Remove cookie dialogs
  const cookieDialogs = document.querySelectorAll('.cookie-dialog, [class*="cookie"], up-modal');
  cookieDialogs.forEach(el => el.remove());

  // Remove consumption disclaimer
  const disclaimer = document.querySelector('.layout--consumption-disclaimer, .layout--consumption-data');
  if (disclaimer) disclaimer.remove();

  // Remove consumption data banner
  const consumptionBanner = document.querySelector('.consumption-data-banner');
  if (consumptionBanner) consumptionBanner.remove();

  // Remove search overlay
  const searchOverlay = document.querySelector('.header-container--search, .quick-search');
  if (searchOverlay) searchOverlay.remove();

  // Remove popovers
  const popovers = document.querySelectorAll('.popover');
  popovers.forEach(el => el.remove());

  // Remove skip links and accessibility helpers
  const skipLinks = document.querySelectorAll('.sr-only, [class*="skip-to"]');
  skipLinks.forEach(el => el.remove());

  // Remove responsive tier detector
  const tierDetector = document.querySelector('.responsive-tier-detector');
  if (tierDetector) tierDetector.remove();

  // Remove backdrop
  const backdrop = document.querySelector('.layout--backdrop');
  if (backdrop) backdrop.remove();

  // Remove empty divs that don't add structure
  const emptyDivs = document.querySelectorAll('div:empty');
  emptyDivs.forEach(el => {
    // Only remove if it has no significant classes
    if (!el.className || el.className.includes('spacer')) {
      el.remove();
    }
  });

  // Remove slider controls (navigation dots/arrows)
  const sliderControls = document.querySelectorAll('.slider--controls, .slider-controls');
  sliderControls.forEach(el => el.remove());
}
