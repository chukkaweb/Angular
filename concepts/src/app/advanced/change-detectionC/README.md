<!-- 
Change detection is a mechanism in Angular that determines if and how the view should be updated based on changes in the application state. 
Angular applications automatically perform change detection to keep the UI in sync with the underlying data.

# Change Detection Strategies:
# Default
Angular checks all components in the application tree during every change detection cycle, regardless of whether their input properties have changed.
## Use Case: 
Suitable for small to mediumsized applications or when the overhead of checking all components is acceptable.

# OnPush:
The OnPush change detection strategy checks components only if their input properties or event handlers change. It optimizes performance by reducing the number of checked components.

## Use Case: 
Ideal for larger applications where optimizing change detection is crucial. 
Components using this strategy must have immutable input properties.
### example
 @Component({
     selector: 'appexample',
     template: '<div>{{ data }}</div>',
     changeDetection: ChangeDetectionStrategy.OnPush,
   })

# ChangeDetectionStrategy.Default: 
Angular checks the entire component tree for changes during each change detection cycle. Even if the inputs are not changed, it will still check all components in the hierarchy.

# ChangeDetectionStrategy.OnPush: 
Angular will only run change detection for this component if its inputs change or if an event inside the component occurs. This improves performance by skipping unnecessary checks.

# Change Detection Methods

## markForCheck()
The markForCheck() method is used to mark a component and its ancestors for check. 
This forces Angular to run change detection on these components even if they are using OnPush change detection.

## detach() and reattach()
The detach() method detaches the change detector from the component, preventing it from being checked during change detection cycles. 
reattach() reattaches the change detector.

## Manually Triggering Change Detection
You can also manually trigger change detection using the detectChanges() method of the ChangeDetectorRef: 

-->
