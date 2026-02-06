
# 📌 Application Scalability in Angular — With Code Examples

## 1️⃣ What Scalability Means in Angular

> App grows without becoming messy, supports teams, stays fast, and is easy to maintain.

*No code needed — this is the foundation principle.*

---

## 2️⃣ Feature-Based Architecture

### 📁 Folder Structure

```
/features
  /products
    products.routes.ts
    products.service.ts
    products.component.ts
  /orders
  /users
```

### ✅ Example: Feature Routes (products.routes.ts)

```ts
import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

export const productsRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
];
```

---

## 3️⃣ Lazy Loading (Mandatory)

### ✅ Lazy Load Feature in App Routes

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.routes').then(
        (m) => m.productsRoutes
      ),
  },
];
```

### 🔹 Benefit: Products feature loads **only when user visits /products**

---

## 4️⃣ Smart vs Dumb Components

### 🔹 Smart Component (Container)

```ts
@Component({
  selector: 'app-products-container',
  standalone: true,
  template: `
    <app-product-list
      [products]="products"
      (select)="onSelect($event)"
    />
  `,
})
export class ProductsContainerComponent {
  products = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onSelect(product: Product) {
    console.log('Selected:', product);
  }
}
```

### 🔹 Dumb Component (UI Only)

```ts
@Component({
  selector: 'app-product-list',
  standalone: true,
  template: `
    <ul>
      <li *ngFor="let p of products; trackBy: trackById" (click)="select.emit(p)">
        {{ p.name }}
      </li>
    </ul>
  `,
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Output() select = new EventEmitter<Product>();

  trackById(index: number, item: Product) {
    return item.id;
  }
}
```

---

## 5️⃣ State Management Strategy

### 🔹 Local State → Signals

```ts
import { signal } from '@angular/core';

export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.update((c) => c + 1);
  }
}
```

### 🔹 Shared UI State → Service + Signal

```ts
@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<'light' | 'dark'>('light');

  toggle() {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }
}
```

### 🔹 Business State → Store (NgRx Example)

```ts
export const loadProducts = createAction('[Products] Load');
export const loadProductsSuccess = createAction(
  '[Products] Load Success',
  props<{ products: Product[] }>()
);
```

---

## 6️⃣ Performance Best Practices

### ✅ OnPush Change Detection

```ts
@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `{{ product.name }}`,
})
export class ProductCardComponent {
  @Input() product!: Product;
}
```

### ✅ trackBy

```html
<li *ngFor="let item of items; trackBy: trackById">
```

```ts
trackById(index: number, item: Item) {
  return item.id;
}
```

### ✅ Virtual Scrolling

```html
<cdk-virtual-scroll-viewport itemSize="50" class="viewport">
  <div *cdkVirtualFor="let item of items">{{ item.name }}</div>
</cdk-virtual-scroll-viewport>
```

---

## 7️⃣ API & Core Layer Design

### 🔹 Feature API Service

```ts
@Injectable({ providedIn: 'root' })
export class ProductsService {
  private apiUrl = '/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
```

### 🔹 Interceptor for Auth

```ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
      setHeaders: { Authorization: 'Bearer TOKEN' },
    });
    return next.handle(authReq);
  }
}
```

---

## 8️⃣ Scalability Is Also About Teams

### 🔹 Strict TypeScript

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true
  }
}
```

### 🔹 ESLint Example Rule

```json
{
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "no-console": "warn"
  }
}
```

---

## 9️⃣ Modularization

### 🔹 Core Module (Singleton Services)

```ts
@NgModule({
  providers: [AuthService, LoggingService],
})
export class CoreModule {}
```

### 🔹 Shared UI Library

```ts
@Component({
  selector: 'app-button',
  standalone: true,
  template: `<button><ng-content /></button>`,
})
export class ButtonComponent {}
```

---

## 🔟 Testing Strategy

### 🔹 Unit Test for Service

```ts
it('should fetch products', () => {
  service.getProducts().subscribe((products) => {
    expect(products.length).toBeGreaterThan(0);
  });

  const req = httpMock.expectOne('/api/products');
  req.flush([{ id: 1, name: 'Phone' }]);
});
```

### 🔹 E2E Test Example

```ts
it('should load products page', () => {
  cy.visit('/products');
  cy.contains('Products');
});
```

---

## 🧠 Final Summary

A scalable Angular app uses:

✔ Feature-based architecture
✔ Lazy loading everywhere
✔ Smart vs dumb components
✔ Predictable state management
✔ Performance-first design
✔ Clean services and interceptors
✔ Strict typing, linting, and testing
✔ Team-friendly structure

