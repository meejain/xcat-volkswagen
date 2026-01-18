/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-vw block
 *
 * Source: https://www.volkswagen-group.com/en
 * Base Block: hero
 *
 * Block Structure:
 * - Row 1: Background image
 * - Row 2: Content (heading, paragraph, CTA)
 *
 * Source HTML Pattern:
 * <div class="page-item page-item--slider">
 *   <div class="slider">
 *     <div class="slide">
 *       <div class="slide--image">
 *         <video>...</video>
 *       </div>
 *       <div class="slide--box-container">
 *         <div class="slider-box">
 *           <h1 class="slider-box--title">...</h1>
 *           <div class="slider-box--text"><p>...</p></div>
 *           <div class="slider-box--action"><a>...</a></div>
 *         </div>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 *
 * Generated: 2026-01-18
 */
export default function parse(element, { document }) {
  // Extract content from source HTML
  // Try slider-box first (inner content), fallback to page-item--slider (outer)
  const sliderBox = element.classList.contains('slider-box')
    ? element
    : element.querySelector('.slider-box');

  const contentElement = sliderBox || element;

  // Extract heading - VW uses h1 with slider-box--title class
  const heading = contentElement.querySelector('.slider-box--title') ||
                  contentElement.querySelector('h1') ||
                  contentElement.querySelector('h2, [class*="title"]');

  // Extract description text
  const textContainer = contentElement.querySelector('.slider-box--text') ||
                        contentElement.querySelector('[class*="text"]');
  const description = textContainer ?
                      textContainer.querySelector('p') || textContainer :
                      contentElement.querySelector('p');

  // Extract CTA buttons/links
  const actionContainer = contentElement.querySelector('.slider-box--action') ||
                          contentElement.querySelector('[class*="action"]');
  const ctaLinks = actionContainer ?
                   Array.from(actionContainer.querySelectorAll('a, button')) :
                   Array.from(contentElement.querySelectorAll('a.btn, a.button, .cta a'));

  // Try to get background image from video thumbnail or image
  // VW uses video, so we look for poster or thumbnail
  const videoElement = element.querySelector('video');
  const posterImage = videoElement ? videoElement.getAttribute('poster') : null;
  const bgImage = element.querySelector('.slide--image img') ||
                  element.querySelector('img[class*="background"]');

  // Build cells array
  const cells = [];

  // Row 1: Background image (if available)
  if (bgImage) {
    cells.push([bgImage]);
  } else if (posterImage) {
    // Create an img element for the video poster
    const posterImg = document.createElement('img');
    posterImg.src = posterImage;
    posterImg.alt = heading ? heading.textContent : 'Hero background';
    cells.push([posterImg]);
  }

  // Row 2: Content (heading, description, CTAs combined)
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  contentCell.push(...ctaLinks);

  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-VW', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
