Single Responsibility Principle (SRP)
Open/Closed Principle (OCP)
Liskov Substitution Principle (LSP)
Interface Segregation Principle (ISP)
Dependency Inversion Principle (DIP)


Single Responsibility Principle (SRP)
A class should have only one reason to change, meaning it should have only one job or responsibility
Example : responsible solely for handling authentication logic (e.g., login, logout, token management). 
It should not mix responsibilities like user profile management or data fetching.
Explanation:
Good Practice: Separate AuthService for authentication logic.
Avoid: Mixing authentication and unrelated functionalities like data fetching within the same service.


Open/Closed Principle (OCP)
Principle: Software entities (classes, modules, functions) should be open for extension but closed for modification.
Example: Consider an Angular component for displaying products (ProductComponent). If you want to add new features or customize its behavior, prefer extending the component through inheritance or composition rather than modifying its existing code.
Explanation:
Good Practice: Use Angular component inheritance or create a new component that extends the existing one to add new features.
Avoid: Modifying the existing ProductComponent directly for every new requirement.


Liskov Substitution Principle (LSP)
Principle: Objects of a superclass should be replaceable with objects of its subclasses without affecting the correctness of the program.
Example: In Angular, if you have an abstract class Shape with subclasses like Circle and Rectangle, any method that works with Shape should also work seamlessly with its subclasses (Circle and Rectangle).
Explanation:
Good Practice: Ensure that subclasses can be substituted for their base class without unexpected behavior.
Avoid: Creating subclasses that do not adhere to the contract of their base class.


Interface Segregation Principle (ISP)
Principle: Clients should not be forced to depend on interfaces they do not use.
Example: In Angular, when defining services, use specific interfaces that only expose the necessary methods required by the clients (components, other services).
Explanation:
Good Practice: Create lean interfaces tailored to specific client needs.
Avoid: Creating large interfaces that force clients to implement unnecessary methods.


Dependency Inversion Principle (DIP)
Principle: High-level modules/classes should not depend on low-level modules/classes. Both should depend on abstractions (interfaces).
Example: In Angular, instead of components depending directly on concrete service implementations, use dependency injection to inject services through interfaces.
Explanation:
Good Practice: Use Angular's dependency injection to decouple components from service implementations.
Avoid: Hard-coding dependencies within components.





