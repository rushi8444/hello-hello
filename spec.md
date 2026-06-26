# MVP Specification: OUTFIT E-Commerce Storefront

## 🎯 Exact MVP Goal
Build a modern, highly interactive, and visually striking e-commerce storefront for the "OUTFIT" brand using Next.js. The MVP must deliver a premium user experience starting from a custom animated preloader, leading into a seamless shopping journey with product discovery, detailed product views, and a shopping bag/cart system. The focus is on frontend polish, smooth animations, and responsive design.

## 🚧 Constraints
- **Framework:** Next.js 15+ using the App Router (`src/app`).
- **Styling & Animation:** Tailwind CSS for styling and `framer-motion` for complex micro-animations and page transitions.
- **Responsiveness:** Must function seamlessly across mobile, tablet, and desktop viewports.
- **Performance:** Fast loading times, leveraging Next.js image optimization and efficient component rendering.
- **Aesthetics:** Adhere to a premium, modern design language (sleek dark/light contrasts, bold typography).
- **Network Compatibility:** Must support local network dev server testing (HMR bound to `0.0.0.0`).

## 📁 Files Involved

### Pages & Routing (`src/app/`)
- `src/app/layout.tsx`: Root layout, global fonts (Geist/Outfit), injection of global UI components (like the Preloader), and `CartProvider`.
- `src/app/page.tsx`: The main landing page showcasing featured products and brand identity, now including `Navbar` and `Footer`.
- `src/app/product/[id]/page.tsx` *(or similar inside `app/product/`)*: Dynamic product detail pages.
- `src/app/bag/page.tsx` *(or similar inside `app/bag/`)*: The user's shopping cart/bag interface.

### Components (`src/components/`)
- **Layout:** `src/components/layout/Preloader.tsx` (The animated intro screen), `src/components/layout/Navbar.tsx` (Theme toggle, Cart count), and `src/components/layout/Footer.tsx`.
- **Sections:** `src/components/sections/` (Hero sections, product grids).
- **UI:** `src/components/ui/` (Reusable buttons, cards, typography components).
- **Animation:** `src/components/animation/` (Custom framer-motion wrappers).

### State & Context (`src/hooks/`, `src/context/`)
- `src/context/CartContext.tsx`: React Context provider for global cart state management (items count, add, remove).
- `src/hooks/useCart.ts`: Custom hook to consume the shopping cart context.
- `src/hooks/usePreloader.ts`: Custom hook to manage preloader animations and loading states.

### Static Assets (`public/`)
- `public/preloader/`: Images used in the animated intro sequence (`image-01.jpg` to `image-06.jpg`).
- `public/products/`: Product photography and placeholders.

### Configuration
- `package.json`: Dependency management and scripts (including the `-H 0.0.0.0` dev script).
- `next.config.ts`: Next.js specific configuration.
- `tailwind.config.ts` / `postcss.config.mjs`: Styling configuration.
