# How to create one new library in Angular and how to deploy it:
Explanation: Use ng generate library to create a new Angular library, and ng-packagr to bundle it for distribution. Publish to npm for deployment.


# difference between interface and type 
Both interface and type can be used to define the shape of an object.
However, interface is better suited for defining contracts and can be extended or implemented by classes. 
type is more flexible and can represent complex types, including unions and intersections.

# Example
interface Person {
  name: string;
  age: number;
}

type Point = { x: number; y: number };
type Shape = Point & { radius: number };
