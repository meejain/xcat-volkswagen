/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-video block
 *
 * Source: https://www.volkswagen-group.com/en
 * Base Block: carousel
 *
 * Block Structure:
 * - Row per slide: Video URL | Content (heading, paragraph, CTA)
 *
 * Source HTML Pattern:
 * <div class="page-item page-item--slider">
 *   <div class="slider">
 *     <div class="slide">
 *       <div class="slide--image">
 *         <video src="...">...</video>
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
  // Find all slides in the slider
  const slides = element.querySelectorAll('.slide, [class*="slide"]:not(.slider)');

  // Build cells array - one row per slide
  const cells = [];

  slides.forEach((slide) => {
    // Extract video source
    const videoElement = slide.querySelector('video');
    const videoSource = videoElement ?
      (videoElement.src || videoElement.querySelector('source')?.src) : null;

    // Extract content from slider-box
    const sliderBox = slide.querySelector('.slider-box') || slide;

    const heading = sliderBox.querySelector('.slider-box--title') ||
                    sliderBox.querySelector('h1, h2, [class*="title"]');

    const textContainer = sliderBox.querySelector('.slider-box--text') ||
                          sliderBox.querySelector('[class*="text"]');
    const description = textContainer ?
                        textContainer.querySelector('p') || textContainer :
                        sliderBox.querySelector('p');

    const actionContainer = sliderBox.querySelector('.slider-box--action') ||
                            sliderBox.querySelector('[class*="action"]');
    const ctaLinks = actionContainer ?
                     Array.from(actionContainer.querySelectorAll('a, button')) :
                     Array.from(sliderBox.querySelectorAll('a.btn, a.button, .cta a'));

    // Build content cell
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    contentCell.push(...ctaLinks);

    // Create row: [video URL, content]
    if (videoSource || contentCell.length > 0) {
      const videoCell = videoSource || '';
      cells.push([videoCell, contentCell]);
    }
  });

  // If no slides found, try to extract single slide content
  if (cells.length === 0) {
    const videoElement = element.querySelector('video');
    const videoSource = videoElement ?
      (videoElement.src || videoElement.querySelector('source')?.src) : null;

    const heading = element.querySelector('.slider-box--title') ||
                    element.querySelector('h1, h2');
    const description = element.querySelector('.slider-box--text p') ||
                        element.querySelector('p');
    const ctas = Array.from(element.querySelectorAll('.slider-box--action a, a.btn'));

    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    contentCell.push(...ctas);

    if (videoSource || contentCell.length > 0) {
      cells.push([videoSource || '', contentCell]);
    }
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Carousel-Video', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
