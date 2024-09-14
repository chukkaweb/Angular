# JIT vs AOT:
Just-In-Time (JIT): Compilation happens in the browser at runtime. It's faster for development but slower for production.
Ahead-Of-Time (AOT): Compilation happens during build time before the app is served. It's optimized for production and reduces bundle size.
Example: AOT is typically used in Angular production builds for better performance

# Dependency Injection:
Explanation: A design pattern where components are provided with their dependencies rather than creating them.
Example: Angular services are injected into components using DI.

# Directive / Structure Directive:
Directive: Used to extend HTML behavior.
Structural Directive: Changes the DOM layout by adding or removing elements.
Example: ngIf is a structural directive.