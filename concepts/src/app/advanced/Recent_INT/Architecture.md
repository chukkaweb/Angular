# B. Angular Architecture & Practical Implementation

# 1️⃣ Custom Directive & Custom Pipe (Real Example – Not Highlight)

## ✅ Real Custom Directive Example
### Use Case: Role-based UI visibility
In real apps:
Some buttons should show only for Admin.

### Custom Directive: `appHasRole`

```ts
@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {
  @Input() appHasRole!: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const userRole = localStorage.getItem('role');
    if (userRole !== this.appHasRole) {
      this.el.nativeElement.style.display = 'none';
    }
  }
}
```
### Usage:
```html
<button *appHasRole="'ADMIN'">Delete User</button>
```

## Interview explanation:
"I created a reusable structural directive to control UI visibility based on user roles instead of writing role checks everywhere."

## ✅ Custom Pipe Example
### Use Case: Mask sensitive data
```ts
@Pipe({
  name: 'maskCard'
})
export class MaskCardPipe implements PipeTransform {
  transform(value: string): string {
    return '**** **** **** ' + value.slice(-4);
  }
}
```

Usage:

```html
{{ cardNumber | maskCard }}
```

# 2️⃣ Reactive Forms + Dynamic Validation + Signals

## ✅ Reactive Form with Dynamic Validation

Use case:
If user selects "Company", GST number becomes required.

```ts
form = this.fb.group({
  type: [''],
  gst: ['']
});

ngOnInit() {
  this.form.get('type')?.valueChanges.subscribe(value => {
    const gstControl = this.form.get('gst');
    if (value === 'company') {
      gstControl?.setValidators([Validators.required]);
    } else {
      gstControl?.clearValidators();
    }
    gstControl?.updateValueAndValidity();
  });
}
```
## ✅ Signals in Forms (Angular 16+)

```ts
name = signal('');
uppercaseName = computed(() => this.name().toUpperCase());
```

Usage:

```html
<input
  [value]="name()"
  (input)="name.set($any($event.target).value)"
/>
<p>{{ uppercaseName() }}</p>
```

## Interview Answer:
"I use Reactive Forms for complex forms, dynamic validation for conditional logic, and Signals for lightweight reactive UI updates."


# 3️⃣ RxJS Operators (Must Know with Example)
## Ways to create observable

```ts
of(1,2,3)
from([1,2,3])
new Observable()
interval(1000)
```

## switchMap (Cancel previous request)
Use case: Search input
```ts
this.searchControl.valueChanges.pipe(
  debounceTime(300),
  switchMap(value => this.api.search(value))
).subscribe();
```

✔ Cancels old API call

## mergeMap (Parallel execution)

```ts
from(users).pipe(
  mergeMap(user => this.api.getUserDetails(user.id))
).subscribe();
```
## concatMap (Sequential execution)

```ts
from(users).pipe(
  concatMap(user => this.api.getUserDetails(user.id))
).subscribe();
```

## exhaustMap (Ignore new until current completes)

Use case: Login button

```ts
click$.pipe(
  exhaustMap(() => this.api.login())
).subscribe();
```

## forkJoin (Multiple API calls together)

```ts
forkJoin({
  users: this.api.getUsers(),
  roles: this.api.getRoles()
}).subscribe(res => {
  console.log(res.users, res.roles);
});
```


## Subject vs BehaviorSubject vs ReplaySubject

| Type            | Stores value?  | Use case       |
|  | -- | -- |
| Subject         | No             | Events         |
| BehaviorSubject | Yes (1 value)  | Shared state   |
| ReplaySubject   | Yes (multiple) | Chat / history |

Example:

```ts
const subject = new BehaviorSubject('initial');
subject.next('new value');
```

# 4️⃣ Lifecycle Hooks & Interceptors

## Lifecycle Hooks Proper Use

### ngOnInit

Initialize data

### ngOnChanges

Detect input changes

### ngAfterViewInit

Access DOM or child components

### ngOnDestroy

Unsubscribe Observables

Example:

```ts
ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

## HTTP Interceptor

Use case:
Attach JWT token

```ts
intercept(req: HttpRequest<any>, next: HttpHandler) {
  const token = localStorage.getItem('token');
  const cloned = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
  return next.handle(cloned);
}
```

# 5️⃣ Guards & Role-Based Access + JWT

## Auth Guard

```ts
canActivate(): boolean {
  return !!localStorage.getItem('token');
}
```
## Role Guard

```ts
canActivate(route: ActivatedRouteSnapshot): boolean {
  const role = localStorage.getItem('role');
  return role === route.data['role'];
}
```

Route:

```ts
{
  path: 'admin',
  canActivate: [RoleGuard],
  data: { role: 'ADMIN' }
}
```

## JWT Flow

1. Login → backend sends token
2. Store token
3. Interceptor attaches token
4. Backend validates



# 6️⃣ Configuration Driven Forms (JSON Based)

Use case:
Admin configures form from backend.


### JSON config:

```ts
const formConfig = [
  { name: 'firstName', type: 'text', required: true },
  { name: 'age', type: 'number', required: false }
];
```

### Build dynamically:

```ts
const group: any = {};
formConfig.forEach(field => {
  group[field.name] = ['', field.required ? Validators.required : []];
});
this.form = this.fb.group(group);
```

# 7️⃣ Breaking Large Forms (Stepper Approach)

Use case:
Multi-step form (Profile → Address → Payment)

## Best Approach

✔ One Parent FormGroup
✔ Child components use FormGroup via Input

### Parent:

```ts
form = this.fb.group({
  profile: this.fb.group({ name: [''] }),
  address: this.fb.group({ city: [''] })
});
```

### Child:

```ts
@Input() group!: FormGroup;
```

Usage:

```html
<app-profile [group]="form.get('profile')"></app-profile>
```

# Interview Golden Line

"I design Angular applications using feature-based architecture, reusable components, reactive forms, optimized RxJS operators, and scalable patterns like configuration-driven forms and shared form groups."
