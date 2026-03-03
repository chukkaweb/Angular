# D. Application Design & Maintainability

# 1️⃣ Role-Based Applications (Dynamic Menus, Guards, Directives)
## ✅ Real Architecture Approach

In enterprise apps:

* Roles come from JWT token
* Store role in AuthService
* Menu should be dynamic
* Route should be protected
* UI elements should hide automatically


## 🔹 Step 1: Dynamic Menu Based on Role

Example Menu Config:

```ts
export const MENU_CONFIG = [
  { label: 'Dashboard', route: '/dashboard', roles: ['ADMIN', 'USER'] },
  { label: 'Admin Panel', route: '/admin', roles: ['ADMIN'] }
];
```

Component:

```ts
menuItems = MENU_CONFIG.filter(item =>
  item.roles.includes(this.authService.getRole())
);
```

## 🔹 Step 2: Role-Based Guard

```ts
canActivate(route: ActivatedRouteSnapshot): boolean {
  const userRole = this.authService.getRole();
  return route.data['roles'].includes(userRole);
}
```

Route:

```ts
{
  path: 'admin',
  canActivate: [RoleGuard],
  data: { roles: ['ADMIN'] }
}
```

## 🔹 Step 3: Role-Based Directive

Instead of writing `*ngIf` everywhere:

```ts
@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {
  @Input() appHasRole!: string[];

  constructor(private auth: AuthService, private el: ElementRef) {}

  ngOnInit() {
    const role = this.auth.getRole();
    if (!this.appHasRole.includes(role)) {
      this.el.nativeElement.remove();
    }
  }
}
```

Usage:

```html
<button *appHasRole="['ADMIN']">Delete</button>
```



## Interview Answer:

"I implement role-based applications using dynamic menu configuration, route guards for security, and custom directives for UI-level control."



# 2️⃣ SOLID Principles (Basic Theory Required)

You must at least know theory clearly.

## S – Single Responsibility Principle

A class should have only one responsibility.

Bad:
Component handles UI + API + validation + logging.

Good:

* Component → UI
* Service → API
* Utility → Validation



## O – Open/Closed Principle

Open for extension, closed for modification.

Example:
Instead of editing existing class, extend it.



## L – Liskov Substitution Principle

Child class should replace parent without breaking behavior.



## I – Interface Segregation

Don’t force classes to implement unused methods.



## D – Dependency Inversion

Depend on abstractions, not concrete classes.

Angular example:
Use dependency injection instead of new keyword.



## Interview One-Line Answer

"SOLID principles help build scalable and maintainable applications by separating responsibilities and reducing tight coupling."



# 3️⃣ Git Branching Strategy (Enterprise Level)

Most companies use something like Git Flow.

## Branch Types

### 🔹 master / main

Production code only.


### 🔹 develop

Integration branch for ongoing development.


### 🔹 feature branch

Created from develop.

Example:

```
feature/login-page
```

### 🔹 release branch

Created from develop before release.

```
release/v1.2
```

Used for:

* Final bug fixing
* Version update



### 🔹 hotfix branch

Created from master for production issue.

```
hotfix/prod-login-error
```

After fix:

* Merge to master
* Merge to develop



## Interview Answer

"I follow Git Flow strategy with feature branches, release branches, and hotfix branches to ensure safe production deployments."


# 4️⃣ Angular Migration Strategy

Very important for senior roles.

## Step 1: Check Current Version

```bash
ng version
```

## Step 2: Check Official Guide

Use:

```
https://update.angular.io
```

(Official Angular upgrade guide)

## Step 3: Check Third-Party Libraries

Verify:

* Angular Material compatibility
* NgRx version
* Third-party UI libs

Check package.json.

## Step 4: Update Step-by-Step

```bash
ng update @angular/core @angular/cli
```

## Step 5: Fix Breaking Changes

* RxJS changes
* TypeScript changes
* Removed APIs

## Step 6: Test Properly

* Unit tests
* E2E tests
* Build production


## Interview Answer

"Before migration, I analyze dependency compatibility, check Angular upgrade guide, update step-by-step, fix breaking changes, and validate through testing before deploying."



# 5️⃣ Basic Idea About CI/CD & YAML

You don’t need deep DevOps, but basic understanding is mandatory.


## What is CI/CD?

CI – Continuous Integration
CD – Continuous Deployment

Automatically:

* Build
* Test
* Deploy

## What is inside YAML file?

Example (Azure / GitHub Actions style):

```yaml
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

steps:
  - script: npm install
  - script: npm run build
  - script: npm run test
```


## Typical CI/CD Steps

1. Install dependencies
2. Run lint
3. Run unit tests
4. Build app
5. Deploy to server

## Interview Answer

"I understand CI/CD pipelines automate build, test, and deployment. YAML files define steps like installing dependencies, running tests, building, and deploying applications."

# Senior-Level Summary Answer

When asked about maintainability, say:

"I design scalable applications using role-based architecture, follow SOLID principles, use proper Git branching strategies, carefully handle Angular migrations, and understand CI/CD pipelines for smooth deployments."
