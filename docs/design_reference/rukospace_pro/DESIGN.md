---
name: RukoSpace Pro
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#42474f'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#727780'
  outline-variant: '#c2c7d1'
  surface-tint: '#2d6197'
  primary: '#00355f'
  on-primary: '#ffffff'
  primary-container: '#0f4c81'
  on-primary-container: '#8ebdf9'
  inverse-primary: '#a0c9ff'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#003c27'
  on-tertiary: '#ffffff'
  tertiary-container: '#005539'
  on-tertiary-container: '#3dd197'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4ff'
  primary-fixed-dim: '#a0c9ff'
  on-primary-fixed: '#001c37'
  on-primary-fixed-variant: '#07497d'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  trust-navy: '#0F4C81'
  action-amber: '#F59E0B'
  success-teal: '#10B981'
  electric-blue: '#3B82F6'
  error-red: '#EF4444'
  surface-gray: '#F8FAFC'
  border-subtle: '#E2E8F0'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  technical-data:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style
The design system for this commercial property marketplace is built on the pillars of **precision, transparency, and operational efficiency**. The brand personality is that of a "Trusted Advisor"—authoritative enough for institutional landlords (Citra), yet accessible and intuitive for entrepreneurial tenants (Budi). 

The visual style is **Corporate / Modern**, leaning heavily into a "Fintech-meets-Real-Estate" aesthetic. It utilizes a structured grid, purposeful whitespace, and a high-contrast palette to ensure technical data (like VA power ratings and zoning) is immediately legible. The interface avoids unnecessary decorative elements, opting instead for functional clarity and a sense of "digital physicalness" through subtle elevations.

**Key Emotional Drivers:**
- **Confidence:** In the accuracy of technical data.
- **Urgency:** Facilitated through vibrant call-to-actions and real-time status indicators.
- **Reliability:** Reflected in a robust, systematic layout that feels established.

## Colors
This design system employs a high-trust palette dominated by **Trust Navy** (#0F4C81), providing a stable, professional foundation. The primary accent, **Action Amber** (#F59E0B), is reserved strictly for conversion-oriented actions such as "Scan QR," "Book Survey," and "Pay DP," ensuring high visibility against the professional backdrop.

**Color Application Rules:**
- **Primary (Trust Navy):** Used for headers, primary navigation, and prominent structural elements. It symbolizes the platform's authority.
- **Secondary (Action Amber):** Used sparingly for buttons and notifications requiring immediate attention.
- **Tertiary (Success Teal):** Utilized for "Verified Listing" badges and successful payment statuses.
- **Electric Blue:** Used specifically for technical links and map-based interactions (pins, radius circles).
- **Neutral:** A range of Slate grays is used for body text and metadata, ensuring long-form technical specifications are easy on the eyes.

## Typography
The system uses **Inter** exclusively to maintain a clean, utilitarian aesthetic that excels in both small-scale data display and large marketing headlines. 

**Typographic Hierarchy:**
- **Display & Headlines:** Use tighter letter spacing and heavier weights to command attention on landing pages.
- **Technical Data:** Specifically designed for property specs (e.g., "16,500 VA"). It uses a slightly heavier weight than body text to ensure Budi (Tenant) can scan technical requirements instantly.
- **Labels:** Uppercase labels are used for categories like "ZONING" or "CAPACITY" to differentiate structural metadata from user-generated descriptions.
- **Mobile Adaptation:** Headlines scale down on mobile to prevent awkward line breaks in property titles.

## Layout & Spacing
The design system follows a **12-column Fixed Grid** for desktop (max-width 1280px) and a **Fluid Grid** for mobile devices. A strict 4px base unit ensures mathematical consistency across all components.

**Layout Principles:**
- **Desktop:** Properties are displayed in a 3-column or 4-column grid. The Map View utilizes a "Split Screen" layout (50% map, 50% list) to provide spatial context without losing information density.
- **Mobile:** Transitions to a single-column layout with a bottom-anchored "Quick Action Bar" for the QR scanner and "Book Survey" button.
- **Spacing Rhythm:** Use `lg` (24px) for padding within cards and `xl` (32px) for vertical section spacing. Metadata clusters within cards should use `sm` (8px) spacing to imply relationship.

## Elevation & Depth
To convey hierarchy without clutter, this design system uses **Tonal Layers** combined with **Ambient Shadows**. 

- **Level 0 (Background):** `surface-gray` (#F8FAFC). Provides a clean canvas.
- **Level 1 (Cards/Surface):** Pure White (#FFFFFF) with a thin 1px `border-subtle` (#E2E8F0). This is the standard for property listings.
- **Level 2 (Interaction):** When hovered or focused, cards lift using a soft, diffused shadow (0px 10px 15px -3px rgba(15, 76, 129, 0.1)). The shadow is slightly tinted with the Primary color to maintain brand harmony.
- **Level 3 (Modals/Overlays):** Used for the QR Scanner interface and filter menus. These use a heavier backdrop blur (8px) and a more pronounced shadow to focus the user's attention.

## Shapes
A **Soft** (Level 1) roundedness strategy is applied to balance the "Corporate" and "Accessible" requirements. 

- **Standard Elements:** 0.25rem (4px) corner radius for input fields and small buttons. This maintains a precise, professional look.
- **Large Elements:** 0.5rem (8px) for property cards and image containers, softening the overall visual impact of the grid.
- **Status Pills:** 1rem (16px) or fully "Pill-shaped" to distinguish categorical tags (e.g., "Verified," "Available") from interactive buttons.

## Components

### Buttons
- **Primary:** Trust Navy background with White text. Bold, 16px. Used for main navigation.
- **CTA (Action):** Action Amber background with Navy text. Used for "Scan QR" and "Book Now."
- **Ghost:** Border-only buttons for secondary actions like "View Gallery" or "Share."

### Property Cards
- **Header:** High-resolution image (WebP) with a "Verified" teal badge overlaid in the top-right.
- **Body:** Title (Title-md), followed by a horizontal "Technical Strip" using icons for Size (sqm), Electricity (VA), and Water.
- **Footer:** Bold price display on the left, with a "View Details" ghost button on the right.

### Technical Spec Chips
- Small, neutral-colored badges used to display data like "16,500 VA" or "B-1 Zoning." They use the `technical-data` typography to ensure Budi can quickly compare units.

### Status Indicators
- **Verified:** Success Teal with a checkmark icon.
- **In-Review:** Action Amber for pending listings.
- **Leased:** Neutral Slate for unavailable properties.

### Map Elements
- Custom Map Pins in Trust Navy. Selected pins enlarge and turn Action Amber.
- **QR Scanner Button:** A floating, circular Action Amber button on mobile, always accessible to the user's thumb for on-site property scanning.

### Input Fields
- Structured, clean borders with clear label-caps. Error states must use `error-red` for text and borders to ensure Citra (Landlord) completes property listings accurately.