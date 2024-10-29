// Here are examples of how to create a UI that updates based on dynamic data in Angular. We’ll explore a few common scenarios where the UI updates dynamically when data changes, such as a real-time data feed, input field-based search, and data filtering.

// ---

// Example 1: Real-Time Data Updates (e.g., Live Score Update)

// In this example, we'll simulate real-time data updates using `setInterval()` and display the data on the UI.

// Component Code:

// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-live-score',
//   templateUrl: './live-score.component.html',
//   styleUrls: ['./live-score.component.css']
// })
// export class LiveScoreComponent implements OnInit {
//   score: number = 0;

//   ngOnInit(): void {
//     // Simulating real-time score update
//     setInterval(() => {
//       this.score = Math.floor(Math.random() * 100); // Random score for demonstration
//     }, 2000); // Update every 2 seconds
//   }
// }


// HTML Template:
// <div class="score-board">
//   <h2>Live Score Update</h2>
//   <p>Score: {{ score }}</p>
// </div>


// In this example, the score updates dynamically every 2 seconds, and the change is immediately reflected in the UI.

// ---

// Example 2: Search Filter in a List (Real-Time Filtering)

// This example shows how to update the UI in real time as the user types into an input field to filter a list of items.

// Component Code:

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-search-filter',
//   templateUrl: './search-filter.component.html',
//   styleUrls: ['./search-filter.component.css']
// })
// export class SearchFilterComponent {
//   items = ['Apple', 'Banana', 'Cherry', 'Date', 'Grapes', 'Mango'];
//   filteredItems = this.items;

//   updateFilter(searchTerm: string) {
//     this.filteredItems = this.items.filter(item => 
//       item.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }
// }


// HTML Template:

// <div>
//   <input type="text" placeholder="Search fruits" (input)="updateFilter($event.target.value)" />
//   <ul>
//     <li *ngFor="let item of filteredItems">{{ item }}</li>
//   </ul>
// </div>


// In this example, the list of fruits filters dynamically as the user types in the search box. The `updateFilter()` function updates the `filteredItems` list based on the input, and the UI reflects the change instantly.

// ---

// Example 3: Toggle Data View (e.g., List or Grid View)

// In this example, we’ll implement a list/grid view toggle that dynamically changes the display layout based on a user’s selection.

// Component Code:

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-toggle-view',
//   templateUrl: './toggle-view.component.html',
//   styleUrls: ['./toggle-view.component.css']
// })
// export class ToggleViewComponent {
//   viewMode: 'list' | 'grid' = 'list';
//   items = Array.from({ length: 5 }, (_, i) => `Item ${i + 1}`);

//   toggleView(mode: 'list' | 'grid') {
//     this.viewMode = mode;
//   }
// }


// HTML Template:

// <div>
//   <button (click)="toggleView('list')">List View</button>
//   <button (click)="toggleView('grid')">Grid View</button>

//   <div *ngIf="viewMode === 'list'">
//     <ul>
//       <li *ngFor="let item of items">{{ item }}</li>
//     </ul>
//   </div>

//   <div *ngIf="viewMode === 'grid'" class="grid">
//     <div *ngFor="let item of items" class="grid-item">{{ item }}</div>
//   </div>
// </div>


// CSS (toggle-view.component.css):
// css
// .grid {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px;
// }
// .grid-item {
//   background-color: #e0e0e0;
//   padding: 10px;
//   width: 100px;
//   text-align: center;
// }


// In this example, users can toggle between list and grid views by clicking the buttons. The `viewMode` property updates the display based on the selected view.

// ---

// Example 4: Updating Data from API with Refresh Button

// In this example, we fetch data from an API (simulated) and provide a Refresh button to update the data on the UI.

// Component Code:

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-refresh-data',
//   templateUrl: './refresh-data.component.html',
//   styleUrls: ['./refresh-data.component.css']
// })
// export class RefreshDataComponent {
//   data: string[] = [];

//   fetchData() {
//     // Simulating an API call
//     this.data = ['Data Item 1', 'Data Item 2', 'Data Item 3']; // Replace with API call in real use
//   }
// }


// HTML Template:

// <div>
//   <button (click)="fetchData()">Refresh Data</button>
//   <ul>
//     <li *ngFor="let item of data">{{ item }}</li>
//   </ul>
// </div>


// In this example, every time the Refresh button is clicked, the `fetchData()` function is called to update the `data` array, and the UI shows the latest data.

// ---

// Summary of Dynamic UI Update Examples:
// 1. Real-Time Data Updates (e.g., live score).
// 2. Search Filter based on user input.
// 3. Toggle View (list vs. grid layout).
// 4. Refresh Button to fetch and display updated data.

// These examples show different ways to create dynamic UI updates in Angular, responding instantly to data changes and user actions.
