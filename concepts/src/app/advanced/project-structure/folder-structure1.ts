// Project struct Beginner vs Experince  https://www.linkedin.com/posts/fradj-bouain-4562a417a_angular-webdevelopment-softwarearchitecture-share-7451310928484130817-Uhg1?utm_source=share&utm_medium=member_android&rcm=ACoAACuTRegBxXpHmDLzARonGNh0lhX9ZNhSdbg

// Project structure with cloude 
// https://www.linkedin.com/posts/reshmawithai_im-writing-this-because-most-people-think-share-7443899122287349761-5oVQ

// https://www.linkedin.com/posts/ileonjose_%F0%9D%97%9B%F0%9D%97%BC%F0%9D%98%84-%F0%9D%98%81%F0%9D%97%BC-%F0%9D%98%80%F0%9D%97%B2%F0%9D%98%81-%F0%9D%98%82%F0%9D%97%BD-%F0%9D%97%96%F0%9D%97%B9%F0%9D%97%AE%F0%9D%98%82%F0%9D%97%B1%F0%9D%97%B2-%F0%9D%97%96%F0%9D%97%BC-share-7440308248282374144-HAaV?utm_source=share&utm_medium=member_desktop&rcm=ACoAACuTRegBxXpHmDLzARonGNh0lhX9ZNhSdbg
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


