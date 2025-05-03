// src/
// │
// ├── app/               --> Core Application Folder
// │   ├── core/          --> Core services, guards, interceptors (global use)
// │   │   ├── services/
// │   │   ├── guards/
// │   │   └── interceptors/
// │   │
// │   ├── shared/        --> Reusable components, directives, pipes
// │   │   ├── components/
// │   │   ├── directives/
// │   │   └── pipes/
// │   │
// │   ├── pages/         --> Feature-specific modules and components
// │   │   ├── home/
// │   │   │   ├── components/
// │   │   │   ├── services/
// │   │   │   ├── models/
// │   │   │   └── home.module.ts
// │   │   │
// │   │   ├── contact/
// │   │   │   ├── components/
// │   │   │   ├── services/
// │   │   │   ├── models/
// │   │   │   └── contact.module.ts
// │   │   │
// │   │   ├── category/
// │   │   │   ├── components/
// │   │   │   ├── services/
// │   │   │   ├── models/
// │   │   │   └── category.module.ts
// │   │   │
// │   │   ├── article/
// │   │   │   ├── components/
// │   │   │   ├── services/
// │   │   │   ├── models/
// │   │   │   └── article.module.ts
// │   │   │
// │   │   ├── profile/
// │   │   │   ├── components/
// │   │   │   ├── services/
// │   │   │   ├── models/
// │   │   │   └── profile.module.ts
// │   │   │
// │   │   └── notifications/
// │   │       ├── components/
// │   │       ├── services/
// │   │       ├── models/
// │   │       └── notifications.module.ts
// │   │
// │   ├── app-routing.module.ts
// │   ├── app.component.ts
// │   ├── app.component.html
// │   └── app.module.ts
// │
// ├── assets/
// │   ├── animations/
// │   ├── fonts/
// │   ├── images/
// │   └── scripts/
// │
// ├── mfe-provider.ts      --> Micro-frontend provider setup
// ├── mfe-href-directive.ts --> To handle MFE dynamic routing
// ├── custom-element.ts     --> For web component registration
// ├── host.ts               --> For host-related logic
// │
// └── environments/         --> Environment files (prod, dev)
// add strict condition in tsconfig.json ( if not using any packages it should give error)


