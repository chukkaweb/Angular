// Optimize the Performance of a Web Application ?


// Angular version upgrades significantly improve performance** — and this is very important from an Angular point of view. 
// Here are **Angular-focused performance improvements**, in simple points:
//  ✅ How Angular Updates Improve Performance

//  🔹 1. Standalone Components (Angular 14+)
// * No need for heavy NgModules
// * Faster startup time
// * Cleaner dependency graph
// * Better tree shaking

//  🔹 2. Signals (Angular 16+)
// * Faster and more predictable change detection
// * Reduces unnecessary re-renders
// * Better than heavy RxJS in many UI cases

//  🔹 3. Zoneless Change Detection (Angular 17+ / 18)
// * Removes Zone.js overhead
// * Manual and precise UI updates
// * Major boost in performance for large apps

//  🔹 4. Improved Hydration (Angular 16+)
// * Faster SSR → Client transition
// * Less JavaScript execution
// * Better first contentful paint (FCP)

//  🔹 5. Deferrable Views (`@defer`) (Angular 17+)
// * Lazy loads parts of templates
// * Improves initial load time
// * Loads only when needed

//  🔹 6. Better Tree Shaking & Smaller Bundles
// * New Angular compiler removes unused code
// * Smaller JS bundles = faster load

//  🔹 7. Faster Builds & Dev Experience
// * Vite-based builders (Angular 17+)
// * Faster rebuilds
// * Faster HMR

//  ✅ Angular-Specific Performance Best Practices
// * Use **OnPush** change detection
// * Use **signals** instead of heavy observables
// * Use **trackBy** in `*ngFor`
// * Use **standalone APIs**
// * Lazy load routes and features
// * Use **@defer** for below-the-fold UI
// * Avoid heavy global services

//  🛠️ Angular Performance Tools
// * **Angular DevTools**
// * **Lighthouse**
// * **Chrome Performance tab**
// * **Source Map Explorer**
// * **Webpack Bundle Analyzer**

//  🏁 Interview-Ready Line:
// > *Upgrading Angular versions improves performance through standalone components, signals, zoneless change detection, better hydration, deferrable views, and smaller bundles — resulting in faster load times and smoother UI.*

// Use lazy loading for images and modules
// @defer @loading @placeholder @template 
// trackBy that will update the ui when the latest changes 
// change detection
// using latest version  
// unsubscribe to avoid the data leaks 
// using standalone components 

// Caching
// Use browser caching
// Cache API responses where possible
// Use service workers for offline support

// 🔹 Backend & API
// Optimize APIs (reduce payload size)
// Use pagination instead of large responses
// Avoid over-fetching (GraphQL or selective fields)

// ===== Loading & Network ====
// Enable code splitting
// Use CDN for assets
// content for cms , cache content 
// Compress files using Gzip/Brotli
// Reduce number of HTTP requests
// Use HTTP/2 or HTTP/3

// ===== JavaScript Optimization ====
// Remove unused code (tree shaking)
// Minify JS & CSS
// Avoid large libraries if not needed
// Use async/defer for scripts
// Use signals / optimized RxJS patterns

// ===== Rendering & UI =====
// Use OnPush change detection (Angular)
// Use trackBy in loops
// Avoid unnecessary re-renders
// Use virtual scrolling for large lists


// Images & Media
// Use modern formats (WebP, AVIF)
// Resize images properly
// Use responsive images (srcset)
// Lazy load below-the-fold images

// 🛠️ Performance Checking & Monitoring Tools
// 🔹 Development & Audit Tools
// Google Lighthouse
// Chrome DevTools → Performance tab
// WebPageTest
// GTmetrix
// PageSpeed Insights

// 🔹 Real User Monitoring (RUM)
// Datadog
// New Relic
// Sentry Performance
// Firebase Performance Monitoring

// 🔹 Bundle Analysis
// Webpack Bundle Analyzer
// Source Map Explorer
// Angular DevTools

// 🔹 UX & Load Testing
// k6
// Apache JMeter
// Locust