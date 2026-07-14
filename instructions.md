# Detailed Implementation Specification (React + GSAP + TailwindCSS)

## General Requirements

Implement all of the following using:

* React
* TailwindCSS
* GSAP (including ScrollTrigger where necessary)

The implementation must be fully responsive and support:

* Large desktop screens
* Laptops
* Tablets
* Mobile devices

The entire implementation must also fully support:

* 🌙 Dark theme
* ☀️ Light theme
* 🇫🇷 French language
* 🇬🇧 English language

Every text must use the existing i18n translation system (no hardcoded strings), and every color must adapt automatically to the current theme.

Animations should feel premium, smooth and modern. Avoid abrupt transitions.

---

# 1. New Hero / Introduction Section

Create an entirely new section with the following layout.

## Background

The whole section uses:

```
waves.png
```

as a full-section background.

Requirements:

* cover entire section
* centered
* no repeat
* responsive
* slightly dimmed depending on theme
* content always stays perfectly readable

---

## Main Layout

The layout contains three major visual elements.

### Top Left

Very large title:

```
I am a
```

Requirements:

* extremely large typography
* uses the new title font
* bold
* aligned top-left
* responsive scaling

Desktop example:

around 90–120px depending on screen width.

---

### Center

Place

```
screens.png
```

between the two titles.

Requirements:

* centered both horizontally and vertically
* larger than surrounding text
* scales responsively
* slightly floating animation
* subtle parallax while scrolling
* should become the visual focal point

---

### Bottom Right

Very large title:

```
Developer
```

Requirements:

* exactly the same size as "I am a"
* aligned bottom-right
* responsive
* uses title font
* visually balances the composition

---

## Bottom Left Description

Place a body text block slightly above the "Developer" title.

Text:

> Curious L3 Computer Science student at INSI and full-stack developer, bridging frontend, backend, and mobile technologies with strong algorithmic problem-solving.

Requirements:

* body text size
* maximum width around 400–500px
* left aligned
* readable line height
* fade in while scrolling
* positioned slightly above the "Developer" title

---

## Top Right Description

Place another body text block.

Text:

> Full-stack developer building responsive web and mobile apps, with strong algorithmic roots and an expanding skill set in game development with Godot.

Requirements:

* body text size
* aligned top-right
* max width 400–500px
* fade animation
* perfectly balanced with the bottom-left paragraph

---

## Section Animation

When entering the section:

Background:

* subtle parallax

"I am a":

* slides from left
* fades in

"Developer":

* slides from right
* fades in

screens.png:

* scales from 0.9
* fades in

Descriptions:

* staggered fade in

Everything should feel elegant rather than dramatic.

---

# 3. Experience Frameworks Section Redesign

Completely redesign the Experience Frameworks section.

The current implementation should be replaced with a premium interactive **3D slider**.

---

## Overall Concept

The section should resemble a modern 3D coverflow-style slider, inspired by premium interfaces such as Apple, Framer, or high-end portfolio websites.

Unlike a continuously rotating carousel, this is a **slider** where only one framework is active at a time, and users explicitly navigate between items.

Navigation methods:

* Previous button
* Next button
* Swipe left/right on touch devices
* Optional autoplay (enabled by default, pausing while the user interacts)

The active framework is always centered.

---

## 3D Layout

The center card represents the currently selected framework.

Adjacent cards remain partially visible on each side to indicate there are more items.

Cards should be arranged using perspective rather than a flat horizontal row.

Visual behavior:

* Center card:

  * Largest
  * Fully opaque
  * Front-most element
  * Glassmorphism effect
  * Highest elevation (shadow)

* Previous and next cards:

  * Slightly smaller
  * Rotated toward the center
  * Positioned slightly behind the active card
  * Lower opacity

* Cards further away:

  * Smaller still
  * More transparent
  * Greater perspective offset
  * Reduced emphasis

The transition between slides must smoothly animate:

* position
* scale
* rotation
* opacity
* depth (translateZ or simulated perspective)

---

## Navigation

### Desktop

Provide visible Previous and Next controls.

Requirements:

* Elegant circular buttons
* Positioned outside or slightly overlapping the slider
* Glassmorphism styling
* Hover animations
* Keyboard navigation support using Left and Right arrow keys

---

### Mobile

Navigation should support:

* Swipe left
* Swipe right

Buttons may remain visible but should occupy minimal space.

---

### Optional Autoplay

Autoplay may automatically advance to the next framework every few seconds.

Requirements:

* Smooth transition
* Infinite loop
* Pause while:

  * hovering (desktop)
  * touching/swiping (mobile)
  * interacting with navigation buttons

Autoplay resumes automatically after a short delay.

---

## Active Card Design

The active framework card should feature:

* Glassmorphism background
* Soft blur
* Semi-transparent surface
* Subtle border
* Soft shadow

Content hierarchy:

1. Large centered framework icon
2. Skill proficiency percentage (small)
3. Framework or technology name
4. Skill category

Example:

```
        ⚛️

        95%

       React

      Frontend
```

The icon should be the dominant visual element.

---

## Side Cards

Side cards should remain visible to reinforce the 3D slider effect.

They should:

* be smaller
* have reduced opacity
* be rotated slightly inward
* sit farther back in perspective
* smoothly animate into the active position when selected

No abrupt transitions.

---

## Background

Retain the existing animated background/filter effect behind the slider.

It should continue to add visual depth without distracting from the content.

---

## Animation

Use GSAP for all transitions.

Animate:

* translateX
* translateZ (or simulated depth)
* rotationY
* opacity
* scale

Animations should feel fluid, premium, and responsive.

---

# 4. Projects & Hackathons Timeline


## Timeline Structure

Each timeline entry contains:

* Event date
* Hackathon name
* Project presented during that hackathon
* Technologies used


## Desktop Layout

A vertical line is centered on the page.

Timeline entries alternate between the left and right sides.

Alternating placement creates a dynamic reading experience.

---

## Mobile Layout

On smaller screens:

* The timeline shifts to the left.
* All event cards become full width.
* Cards stack vertically.
* The scroll experience remains smooth.

---

## Timeline Animation

The vertical line represents the progression of time.

As the user scrolls:

* the timeline gradually fills from top to bottom
* the active timeline point becomes highlighted

The currently active point should:

* grow slightly
* glow with the accent color
* display a subtle animated pulse
* feel like the current milestone in the journey

Previous milestones remain marked as completed.

Future milestones remain muted.

---

## Event Card Animation

When approaching a timeline point:

The corresponding card should:

* fade in
* move slightly toward its final position
* transition from slight blur to full sharpness
* animate only once

The animation should synchronize naturally with the highlighted timeline point.

---

## Scroll Experience

Implement using GSAP ScrollTrigger.

The timeline progression should feel continuous and polished.

The highlighted milestone should transition smoothly from one event to the next without abrupt jumps.

Scrolling should give the impression of following a journey through my projects and hackathon experiences over time.


---

# 2. Typography

Replace every title font across the entire website.

New title font:

```
Vina Sans
```

Requirements:

Apply this font consistently to:

* Hero titles
* Section titles
* Timeline titles
* Project titles
* Hackathon titles
* Framework titles
* Card titles
* Major headings

Body text keeps the current font for readability.

---

# 5. Animations

Use GSAP for all major animations.

Use:

* ScrollTrigger
* stagger
* scrub
* easing
* transforms instead of layout changes

Animations should never feel overwhelming.

Target style:

* Apple
* Linear
* Framer
* modern SaaS landing pages

---

# 6. Responsiveness

Everything must adapt smoothly.

Desktop:

* spacious
* centered timeline
* large typography
* wide spacing

Tablet:

* reduced spacing
* slightly smaller typography

Mobile:

* stacked layout
* centered content
* readable typography
* simplified spacing
* timeline on left
* framework carousel remains usable with touch interactions

---

# 7. Accessibility

Maintain accessibility across all components:

* sufficient color contrast in both themes
* keyboard navigation where applicable
* reduced-motion compatibility (respect `prefers-reduced-motion`)
* semantic HTML structure
* descriptive `alt` text for images

---

# 8. Performance

Optimize for smooth rendering:

* lazy-load large images where appropriate
* use hardware-accelerated transforms (`transform` and `opacity`) for animations
* avoid unnecessary re-renders
* clean up all GSAP timelines and `ScrollTrigger` instances on component unmount
* keep animations performant on lower-end devices

---

# 9. Certificate Preview Improvements

Enhance the certificate preview experience by adding an interactive zoom feature.

## Certificate Modal

When a certificate is opened, display it inside a dedicated modal instead of only showing the image.

The modal should include:

* Large certificate preview
* Darkened backdrop
* Smooth open/close animation
* Close button
* ESC key support
* Click outside the modal to close

---

## Zoom Functionality

Allow users to inspect certificates in greater detail.

Features:

* Zoom In button (+)
* Zoom Out button (−)
* Reset Zoom button
* Mouse wheel zoom (desktop)
* Pinch-to-zoom (mobile)
* Click-and-drag (or touch drag) to pan while zoomed

Requirements:

* Smooth animated zoom transitions
* Zoom centered around the cursor when using the mouse wheel
* Prevent dragging when the image is at its default scale
* Keep the certificate within reasonable viewport bounds
* Minimum zoom: 100%
* Maximum zoom: 400%

Use GSAP for smooth scaling and panning animations where appropriate.

---

## Additional Controls

Provide a small floating toolbar containing:

* Zoom In
* Zoom Out
* Reset Zoom
* Download Certificate (optional)

The toolbar should use the existing glassmorphism design language and adapt to both dark and light themes.

---

# 10. Hero Section - Download CV Button

Add a primary call-to-action button in the Hero section to allow visitors to download my CV.

The button should be positioned naturally within the Hero layout, near the introductory content without competing visually with the main heading.

Suggested text:

English:

* Download CV

French:

* Télécharger mon CV

The button should support the existing language system.

---

## Button Design

The button should follow the site's design system.

Requirements:

* Glassmorphism or primary accent styling
* Rounded corners
* Icon (Download)
* Hover animation
* Press animation
* Focus state for accessibility

Hover effects may include:

* Slight scale increase
* Shadow enhancement
* Accent glow
* Smooth transition

---

## Download Functionality

Implement a reusable CV download system.

Rather than hardcoding the file, the application should support replacing the CV without modifying the component code.

Recommended structure:

```text
public/
    cv/
        resume-en.pdf
        resume-fr.pdf
```

The Hero button should automatically download the correct version based on the currently selected language:

* English → `resume-en.pdf`
* French → `resume-fr.pdf`

If only one version is available, use that file for both languages.

The download should begin immediately after clicking the button.

---

## Future Content Management

The implementation should make it easy to update the CV in the future.

Replacing the CV should only require replacing the PDF file inside the designated folder without changing any React code.

The file path should be defined in a configuration object or constants file rather than hardcoded inside the Hero component.

Example:

```text
src/config/site.ts

export const CV_FILES = {
    en: "/cv/resume-en.pdf",
    fr: "/cv/resume-fr.pdf",
};
```

The Hero component should simply reference this configuration.

---

## Accessibility

The download button should include:

* Accessible label
* Keyboard navigation
* Visible focus state
* Proper download attribute

---

## Animation

When the Hero section loads:

* Fade in the button after the main content.
* Slight upward motion during its entrance.
* Smooth hover and click feedback.
* Ensure animations respect the user's `prefers-reduced-motion` setting.

The final experience should make downloading the CV feel like a natural, polished interaction that integrates seamlessly with the overall portfolio design.


# Expected Final Result

The portfolio should feel like a premium interactive experience rather than a traditional website.

The visual identity should combine:

* Modern minimalism
* Glassmorphism
* Smooth GSAP-powered interactions
* Strong depth and perspective
* Elegant typography with **Vina Sans** for all headings
* Responsive design across all devices
* Full dark/light theme compatibility
* Full French/English localization support

The overall quality should be comparable to high-end portfolio experiences, with polished animations, refined spacing, and seamless transitions that enhance usability without distracting from the content.