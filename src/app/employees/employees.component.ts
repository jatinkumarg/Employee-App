import { Component, OnInit } from '@angular/core';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
   employees: Employee[];
   getEmployeesSub: any;
   loadingError: boolean = false;
   filteredEmployees: Employee[];
  constructor(private e: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.getEmployeesSub = this.e.getEmployees().subscribe(employees =>{
      this.employees = employees,
      this.filteredEmployees= employees;
    }, 
      function(err) { this.loadingError = true; }
    );
  }

  ngOnDestroy() {
    if(this.getEmployeesSub){this.getEmployeesSub.unsubscribe();}
  }

  routeEmployee(id: string){
    this.router.navigate(['/employee', id]);
  }

  onEmployeeSearchKeyUP(event:any){
    let value = event.target.value.toLowerCase();
    this.filteredEmployees = this.employees.filter((employee) => {
      if(
      employee.FirstName.toLowerCase().includes(value) || 
      employee.LastName.toLowerCase().includes(value) ||
      employee.Position.PositionName.toLowerCase().includes(value)){
        return true;
      }
    });
  }

}
