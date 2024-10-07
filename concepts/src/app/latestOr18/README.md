<!--

angular 18
TypeScript 5.4 Support

Dynamic Route Redirection (Route Redirects with Functions)
You can now dynamically determine route redirection with a function in the route configuration.
const routes = [
  { path: '', redirectTo: (route) => route.params.id ? `/dashboard/${route.params.id}` : '/', pathMatch: 'full' },
];

redirectTo function
export const routes: Routes = [
  {
    path: 'page1',
    redirectTo: (url) => { 
      return '/page2'; 
    },
    pathMatch: 'full'
  }

HttpClientModule Deprecation
HttpClientModule has been deprecated and replaced by provideHttpClient() to make HTTP provisioning simpler.

import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]
});

@Input Transform
Angular 18 introduces a new @Input transform feature that allows automatic conversion of inputs.

@Input({ transform: (value) => value.trim() })
name: string = '';

Fallback Content for <ng-content> | ng-content default content
You can now provide fallback content when no content is projected.
<ng-content select="header">Default Header</ng-content>



@if,@for stable ( 17 its introduced)
@defer 
signals (miner added in angular 17 )
new output function without decorators 
viewchildren ,viewchildren without using decorator we can setup 

model -> used for two way binding (now in ui its in ts). 

Zoneless Change Detection with Signals
Previously, Angular relied on Zone.js for change detection, which could introduce overhead and complexity. Zoneless change detection offers a more lightweight and efficient approach, potentially leading to performance improvements in your applications.
 
One of the primary objectives of Signals is to enable applications to operate without zone.js
in app.config.ts  -> ng zone less feature added 
in providers : [
provideExperimentalZonelessChangeDetection()]
in angualar. json remove zone js 
bundle size decrease beacuse zone js library no longer of project , perfomance improve  (watcher less)


Default content in ng-content: feature allows for fallback content to be displayed within a component’s ng-content projection when no projected content is available.
<ng-content><p>Fall back </p>  </ng-content>

routing 
ng update 



1. Standalone Components
Standalone components no longer require an NgModule. This simplifies the component declaration process.
@Component({
  selector: 'app-standalone',
  template: `<h1>Hello, Standalone!</h1>`,
  standalone: true


Functional Components (Experimental)
Angular 18 introduces the ability to define functional components, offering a simpler way to manage stateless components.
import { Component } from '@angular/core';
export const FunctionalComponent = () => ({
  template: `<p>Functional Component</p>`,
  standalone: true
});

Improved build performance: optimized, potentially leading to faster build times for your applications.


 -->
