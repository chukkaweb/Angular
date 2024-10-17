Services in Angular are used to share data, logic, or functionality across different components. They promote reusability and maintainability.
Dependency Injection (DI) is a design pattern in which dependencies are injected into a class rather than being created inside the class. Angular's DI framework allows you to inject services into components or other services.

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getData() { return 'data'; }
}

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
})
export class DataComponent {
  constructor(private dataService: DataService) {}
}
