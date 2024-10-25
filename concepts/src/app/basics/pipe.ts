// What Are Pipes in Angular, and How Do They Work?
// Pipes in Angular are a feature used to transform data in the template before it is displayed to the user. 
// They take in some input value and return a transformed output, such as formatting text, dates, numbers, or filtering and sorting data.

// - Pipes are used in interpolation expressions and are denoted using the pipe symbol `|`. 
// They can be chained to apply multiple transformations to a value.

// #How Pipes Work:
// - You use pipes directly in the template to transform data.
// - They operate on values in the template without modifying the original data in the component logic.

// #Example:
// <!-- Example usage of pipes -->
// <p>{{ 'hello world' | uppercase }}</p> <!-- Displays: HELLO WORLD -->

// <p>{{ today | date:'shortDate' }}</p> <!-- Displays: formatted date (e.g., 10/18/2024) -->




// Pure vs Impure Pipes in Angular

// Pipes in Angular are classified into two categories: pure pipes and impure pipes.

// #1. Pure Pipes:
// Pure pipes are called only when Angular detects a change in the input value, meaning that they are stateless.
// - They are optimized for performance because Angular does not re-execute them unless the input data changes.
  
// Characteristics:
// - Works with immutable data or simple data transformations.
// - Executes only when the input reference or primitive value changes (not on every change detection cycle).

// Example:

// @Pipe({
//   name: 'examplePipe',
//   pure: true
// })
// export class ExamplePipe implements PipeTransform {
//   transform(value: string): string {
//     return value.toUpperCase();
//   }
// }


// #2. Impure Pipes:
// Impure pipes are called on every change detection cycle, whether or not the input value has changed. 
// They are used for complex transformations or when the input is mutable (e.g., arrays or objects that can change without the reference changing).
  
// Characteristics:
// - They are less performant because Angular re-executes the pipe on every change detection cycle.
// - Should be used only when necessary (e.g., when the pipe transforms mutable data like an array that can be updated internally).

// Example:

// @Pipe({
//   name: 'exampleImpurePipe',
//   pure: false
// })
// export class ExampleImpurePipe implements PipeTransform {
//   transform(value: any[]): any[] {
//     return value.filter(item => item.active);
//   }
// }


// Key Difference:
// Pure pipes are used with immutable data and are optimized for performance.
// Impure pipes handle mutable data but have a performance cost as they are invoked on every change detection cycle.



// Common Built-in Pipes in Angular

// Angular provides several built-in pipes to handle common transformations such as formatting strings, numbers, dates, and more. 
// Some of the most commonly used built-in pipes include:

//  1. `uppercase` and `lowercase` Pipes:
// - Transforms text to uppercase or lowercase.
  
// Usage:

// <p>{{ 'hello' | uppercase }}</p> <!-- Output: HELLO -->
// <p>{{ 'HELLO' | lowercase }}</p> <!-- Output: hello -->


//  2. `date` Pipe:
// - Formats dates according to the specified format. 
// It can display a date in different formats like `shortDate`, `fullDate`, etc.

// Usage:

// <p>{{ today | date:'shortDate' }}</p> <!-- Output: 10/18/2024 -->
// <p>{{ today | date:'fullDate' }}</p> <!-- Output: Friday, October 18, 2024 -->


//  3. `currency` Pipe:
// - Formats numbers as currency based on the specified currency code (e.g., USD, EUR). 

// Usage:

// <p>{{ 1500 | currency:'USD' }}</p> <!-- Output: $1,500.00 -->
// <p>{{ 1500 | currency:'EUR' }}</p> <!-- Output: €1,500.00 -->


//  4. `percent` Pipe:
// - Converts a number to percentage format.

// Usage:

// <p>{{ 0.25 | percent }}</p> <!-- Output: 25% -->


//  5. `decimal` Pipe:
// - Formats a number according to specified decimal places.

// Usage:

// <p>{{ 1234.567 | number:'1.2-2' }}</p> <!-- Output: 1,234.57 -->


//  6. `json` Pipe:
// - Converts an object into a JSON string.

// Usage:

// <p>{{ {name: 'John', age: 30} | json }}</p> <!-- Output: {"name":"John","age":30} -->


//  7. `slice` Pipe:
// - Returns a subset (slice) of a string or array, similar to JavaScript’s `slice()` method.

// Usage:

// <p>{{ 'hello world' | slice:0:5 }}</p> <!-- Output: hello -->
// <p>{{ [1, 2, 3, 4, 5] | slice:1:4 }}</p> <!-- Output: [2, 3, 4] -->


//  8. `keyvalue` Pipe:
// - Converts an object or map into an array of key-value pairs.

// Usage:

// <p *ngFor="let item of myObject | keyvalue">{{ item.key }}: {{ item.value }}</p>




// Summary:
// Pipes are used in Angular to transform data in the template.
// Pure pipes are invoked only when the input changes, while impure pipes are invoked on every change detection cycle.
// - Angular provides many built-in pipes such as `uppercase`, `date`, `currency`, `percent`, `json`, and more, which help handle common data transformations.

// By using pipes, you can format and manipulate data directly in the template, improving code readability and reducing the need for additional logic in your components.