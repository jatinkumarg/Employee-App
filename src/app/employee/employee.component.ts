import { Component, OnInit } from '@angular/core';
import { EmployeeRaw } from '../data/employeeRaw';
import { Position } from '../data/position';
import { EmployeeService } from '../data/employee.service';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../data/position.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  paramSubScription: any;
  employeeSubscription: any;
  getPositionsSubscription: any;
  saveEmployeeSubscription: any;
  employee: EmployeeRaw;
  positions: Position[];
  successMessage = false;
  failMessage = false;

  constructor(private e: EmployeeService, private route: ActivatedRoute, private p: PositionService) { }

  ngOnInit() {
    this.paramSubScription = this.route.params.subscribe((params) => {
      this.employeeSubscription = this.e.getEmployee(params['_id']).subscribe((e) => {
        this.employee = e[0];
        this.getPositionsSubscription = this.p.getPositions().subscribe(data => {
          this.positions = data;
        });
      });
 });
  }
  onSubmit(){
    this.saveEmployeeSubscription = this.e.saveEmployee(this.employee).subscribe(()=>{
      this.successMessage = true;
      setTimeout(()=>{this.successMessage = false;},2500)
    }, error =>{
      this.failMessage = true;
      setTimeout(()=>{this.failMessage = false;},2500)
    });
  }
  
  ngOnDestroy(){
    if(this.employeeSubscription!=null){
      this.employeeSubscription.unsubscribe();
    }
    if(this.paramSubScription!=null){
      this.paramSubScription.unsubscribe();
    }
    if(this.saveEmployeeSubscription!=null){
      this.saveEmployeeSubscription.unsubscribe();
    }
    if(this.getPositionsSubscription!=null){
      this.getPositionsSubscription.unsubscribe();
    }
    
  }


}
