# NgRx (library based on redux library)
	NgRx is a state management library for Angular applications, based on Redux principles. 
	It provides a predictable state container, enabling the management of application state in a consistent and centralized way. 
	NgRx helps manage complex state interactions, simplifies debugging, and promotes scalable architecture.

# core components of NgRx
	Answer: The core components of NgRx include:
	Store: Holds the application state.
	Actions: Describe state changes.
	Reducers: Pure functions that handle state transitions based on actions.
	Selectors: Functions that query the store and return parts of the state.
	Effects: Handle side effects, such as API calls, and dispatch actions based on external interactions.

# Store: The store is what holds the app's state. 
# Action:
A unique event dispatched from components and services that describe how the state should be changed. 
For example, ‘Add Customer’ can be an action that will change the state (i.e., add a new customer to the list).

# Reducer:
 All the state changes happen inside the reducer; it responds to the action and, based on that action, it will create a new immutable state and return it to the store.

# Selector: 
Selector is a function used for obtaining a part of the state from the store.

# Effect: 
A mechanism that listens for dispatched actions in an observable stream, processes the server response, and returns new actions either immediately or asynchronously to the reducer to change the state. Please note that we are not using 'effect' in this example app.

	Store lo update chesina data manaki eppudu available ga ledhu . response vachina tharvatha use avvalante use chese concepts effects 
	The user interface and other components dispatch actions.
	Actions can have a payload that needs to change the state. 
	The reducer creates a new state as described by the specified action and returns it to the store. 
	Once the store updates with the new state, it will notify the UI and all dependent components. 
	Each UI reacts to the state change and its view gets updated to reflect the changes. 

# Dispatch 
	Store lo unna data ni reducer function use chesi change cheyali 
	Dispatch ane function dhvara reducer ni call avuthundhi 
	Dispatch ane funcation lo action item edhi avidhanga modify avvalanedhi chepthundi 
	Dispatch ane function manam call cheste reducer ane function automatic ga call chestundhi 
	Component lo manam dispatch ane function call chestam 
	Selector ane conpect use chesi store lo unna data ni mana component lo use chesukuntam
Reducer(state, action) {  state - previous state , action  dispatch function dhwara pass chese 
}


#  Implementation 
	ng add @ngrx/store - ng add will help anything configure in app module it will do.
	Creation actions, props import in action file    <>  its generic it will tell which type passing to this function
	Create action first step 
	Then setup Reducer 
	Configure store module with reducer function in app module
	How to use (select) store data 
	How to update state using dispatch method. 
	Store data subscribe using select 


# Ngrx effects
	It is a library 
	It it used to update the store data(state), which come from an api call .

# Use Effects
	ng add @ngrx/effects or ng add @ngrx/store @ngrx/effects. initially install 
	EffectsMoudle.forRoot()  import at 
	Effect just class. It want import other thing so we can convert as
	How many api call you want that many createEffect need to create 


# benefits of using NgRx for state management
	Predictable state management with a single source of truth.
	Enhanced scalability for large applications.
	Simplified debugging with the ability to trace state changes.
	Improved testability by isolating state logic.
	Clear separation of concerns between state, actions, and side effects.
