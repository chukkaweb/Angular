https://angular.dev/style-guide

Alright — but don’t try to memorize a long “style guide document.” That’s a mistake many devs make.
Focus on **patterns you actually apply while coding**. I’ll give you a **clean, practical Angular style guide** you can revise daily and use in real projects.

---

# ✅ Angular Style Guide — Simple & Practical Notes

## 🔹 1. Naming Conventions (Most Important)

* Use **consistent, meaningful names**
* Files → `kebab-case`

  * `user-profile.component.ts`
* Classes → `PascalCase`

  * `UserProfileComponent`
* Variables & methods → `camelCase`

  * `getUserData()`
* Constants → `UPPER_CASE`

👉 Bad:

* `data.ts`, `test.ts`

👉 Good:

* `user.service.ts`, `auth.interceptor.ts`

---

## 🔹 2. File Structure (Feature-Based)

👉 Don’t group by type — group by feature

✔️ Good:

```
/users
  user.component.ts
  user.service.ts
  user.module.ts
```

❌ Bad:

```
/components
/services
/models
```

👉 Why:

* Easier scaling
* Better ownership
* Cleaner navigation

---

## 🔹 3. One Responsibility Rule

* One class = one purpose

✔️ Good:

* Component → UI logic
* Service → API/business logic

❌ Bad:

* Component doing API + business + UI

---

## 🔹 4. Component Best Practices

* Keep components **small & focused**
* Use `@Input()` / `@Output()` for communication
* Avoid complex logic inside component

👉 Move logic to service

---

## 🔹 5. Smart vs Dumb Components

* **Smart (Container)**

  * Handles data
  * Calls services
* **Dumb (Presentational)**

  * Only UI
  * Uses inputs/outputs

👉 This is critical in real projects

---

## 🔹 6. Services Usage

* Use services for:

  * API calls
  * Shared logic
* Make services **singleton (providedIn: 'root')**

```ts
@Injectable({ providedIn: 'root' })
```

---

## 🔹 7. Dependency Injection

* Use Angular DI instead of manual creation

❌ Bad:

```ts
const service = new UserService();
```

✔️ Good:

```ts
constructor(private userService: UserService) {}
```

---

## 🔹 8. RxJS Best Practices

* Use `async pipe` instead of manual subscribe

❌ Bad:

```ts
this.service.getData().subscribe()
```

✔️ Good:

```html
{{ data$ | async }}
```

* Unsubscribe properly (or use async pipe)
* Use operators:

  * `map`
  * `switchMap`
  * `catchError`

---

## 🔹 9. State Management

* Small app → Signals / BehaviorSubject
* Large app → NgRx / Component Store

👉 Don’t over-engineer

---

## 🔹 10. Folder Organization (Advanced)

```
/core        → singleton services, interceptors
/shared      → reusable components, pipes
/features    → business modules
```

---

## 🔹 11. Module Guidelines

* Use **feature modules**
* Lazy load modules

```ts
loadChildren: () => import('./users/users.module')
```

---

## 🔹 12. Avoid Logic in Templates

❌ Bad:

```html
{{ user.name.toUpperCase() }}
```

✔️ Good:

```ts
userName = this.user.name.toUpperCase();
```

---

## 🔹 13. Use Interfaces (Type Safety)

```ts
interface User {
  id: number;
  name: string;
}
```

👉 Avoid `any`

---

## 🔹 14. Error Handling

* Use interceptor for global errors
* Handle API errors properly

---

## 🔹 15. Code Formatting

* Use Prettier / ESLint
* Keep:

  * consistent indentation
  * readable code

---

## 🔹 16. Comments

* Avoid unnecessary comments
* Code should be self-explanatory

❌ Bad:

```ts
// increment i
i++;
```

---

## 🔹 17. Testing

* Write unit tests for:

  * services
  * components
* Use Jasmine + Karma or Jest

---

## 🔹 18. Performance

* Use `OnPush` change detection
* Use `trackBy` in loops

```html
*ngFor="let item of items; trackBy: trackById"
```

---

## 🔹 19. Security

* Use Angular sanitization
* Avoid direct DOM manipulation

---

## 🔹 20. Environment Config

* Use `environment.ts` for configs
* Don’t hardcode URLs

---




