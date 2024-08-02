// Explain SOLID in typescript examples

// SOLID is an acronym for five design principles meant to make software designs more understandable, flexible, and maintainable. 

// 1. Single Responsibility Principle: A class should have only one reason to change.

// Example (Typescript):

class User {
    private name: string;
    private age: number;
  
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
  
    getName(): string {
        return this.name;
    }
  
    setName(name: string): void {
        this.name = name;
    }
  
    getAge(): number {
        return this.age;
    }
  
    setAge(age: number): void {
        this.age = age;
    }
}

// 2. Open/Closed Principle: Classes should be open for extension, but closed for modification.

// Example (Typescript):

abstract class Shape {
    public abstract getArea(): number;
}

class Rectangle extends Shape {
    private width: number;
    private height: number;
  
    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
    }
  
    getArea(): number {
        return this.width * this.height;
    }
}

class Circle extends Shape {
    private radius: number;
  
    constructor(radius: number) {
        super();
        this.radius = radius;
    }
  
    getArea(): number {
        return Math.pow(this.radius, 2) * Math.PI;
    }
}

// 3. Liskov Substitution Principle: Derived classes must be substitutable for their base classes.

// Example (Typescript):

class Rectangle2 {
    private width: number;
    private height: number;
  
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
  
    getArea(): number {
        return this.width * this.height;
    }
  
    setWidth(width: number): void {
        this.width = width;
    }
  
    setHeight(height: number): void {
        this.height = height;
    }
}

// class Square extends Rectangle2 {
//     constructor(size: number) {
//         super(size, size);
//     }
  
//     setWidth(width: number): void {
//         this.width = width;
//         this.height = width;
//     }
  
//     setHeight(height: number): void {
//         this.width = height;
//         this.height = height;
//     }
// }

// 4. Interface Segregation Principle: Clients should not be forced to depend on methods they do not use.

// Example (Typescript):

interface Shape2 {
    getArea(): number;
}

interface Rectangle3 extends Shape2 {
    setWidth(width: number): void;
    setHeight(height: number): void;
}

interface Circle2 extends Shape2 {
    setRadius(radius: number): void;
}

class Rectangle3 implements Rectangle3 {
    private width: number;
    private height: number;
  
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
  
    getArea(): number {
        return this.width * this.height;
    }
  
    setWidth(width: number): void {
        this.width = width;
    }
  
    setHeight(height: number): void {
        this.height = height;
    }
}

class Circle3 implements Circle2 {
    private radius: number;
  
    constructor(radius: number) {
        this.radius = radius;
    }
  
    getArea(): number {
        return Math.pow(this.radius, 2) * Math.PI;
    }
  
    setRadius(radius: number): void {
        this.radius = radius;
    }
}

// 5. Dependency Inversion Principle: High level modules should not depend on low level modules, both should depend on abstractions.

interface Database {
    connect(): void;
    read(): void;
    write(): void;
    close(): void;
}

class MongoDatabase implements Database {
    connect(): void {
        // connect to mongo
    }
  
    read(): void {
        // read from mongo
    }
  
    write(): void {
        // write to mongo
    }
  
    close(): void {
        // close mongo connection
    }
}

class DatabaseService {
    private database: Database;
  
    constructor(database: Database) {
        this.database = database;
    }
  
    connect(): void {
        this.database.connect();
    }
  
    read(): void {
        this.database.read();
    }
  
    write(): void {
        this.database.write();
    }
  
    close(): void {
        this.database.close();
    }
}

const mongoDatabase = new MongoDatabase();
const databaseService = new DatabaseService(mongoDatabase);
databaseService.connect();
databaseService.read();
databaseService.write();
databaseService.close();