import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Employee } from './employee';
import {EmployeeRaw} from "./employeeRaw";


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = "https://sleepy-stream-11662.herokuapp.com";

  constructor(private http:HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.url}/employees`)
  }

  saveEmployee(employee: EmployeeRaw) : Observable<any>{
    return this.http.put<any>("https://web422-api.herokuapp.com/employee/"+employee._id, employee);
  }

  getEmployee(id: string) : Observable<EmployeeRaw[]> {
  
    return this.http.get<EmployeeRaw[]>("https://web422-api.herokuapp.com/employee/"+id );
  }
}
