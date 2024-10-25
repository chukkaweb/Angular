// What is Data Binding in Angular?

// - Data binding in Angular refers to the connection between component logic ( code) and the view (HTML template). It allows you to display dynamic data in the UI, respond to user input, and synchronize the data between the component and the UI seamlessly.

// Types of Data Binding in Angular:

// 1. Interpolation (One-way Data Binding):
//    - Interpolation allows you to display the value of component properties in the HTML template using double curly braces `{{}}`.
//    - It’s a one-way binding because data flows from the component to the view.

//    Example:
//    
//    <h1>{{ title }}</h1> <!-- Displays the value of the 'title' property from the component -->
//    
//    - If `title = 'Hello, Angular!'`, the view will display "Hello, Angular!".


// 2. Property Binding (One-way Data Binding):
//    - Property binding sets the value of an HTML element’s property based on the component’s data.
//    - It also works one-way from the component to the view.
   
//    Example:
//    
//    <img [src]="imageUrl" /> <!-- Binds the 'src' property of the image element to 'imageUrl' -->
//    
//    - If `imageUrl = 'logo.png'`, the `src` of the `<img>` element will be set to 'logo.png'.


// 3. Event Binding:
//    - Event binding allows you to respond to user actions (e.g., clicks, input) by binding an event from the view to a method in the component.
//    - It is a one-way binding from the view to the component.

//    Example:
//    
//    <button (click)="onClick()">Click me</button> <!-- Binds the 'click' event to the 'onClick' method -->
//    

//    onClick() {
//      console.log('Button clicked');
//    }
//    
//    - When the button is clicked, the `onClick()` method in the component is executed.



// 4. Two-Way Data Binding:
//    - Two-way data binding allows you to synchronize data between the component and the view. When the user updates the view (e.g., inputs text), it updates the component property, and any changes to the property update the view automatically.
//    - This is done using `[(ngModel)]`.

//    Example:
//    
//    <input [(ngModel)]="username" /> <!-- Binds the input value to the 'username' property in both directions -->
//    <p>Hello, {{ username }}!</p>
//    
//    - If `username = 'John'`, it displays "Hello, John!", and any change in the input will update the `username` property.

//    > Note: `[(ngModel)]` requires importing FormsModule in your module.



// Summary of Data Binding Types:
// 1. Interpolation: One-way binding to display data from the component in the view using `{{ }}`.
// 2. Property Binding: One-way binding to set element properties (e.g., `[src]`, `[disabled]`).
// 3. Event Binding: One-way binding to listen to events (e.g., `(click)`, `(keyup)`).
// 4. Two-Way Binding: Two-way synchronization between the component and view using `[(ngModel)]`.

// This makes Angular flexible in connecting data between the view and the component!