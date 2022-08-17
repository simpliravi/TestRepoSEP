import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private _employeeService: EmployeeService) { }

  ngOnInit(): void {
    this._employeeService.GetEmployees().subscribe((result: any) => {
      if (result) {
        this.employees = result;
        // because employee list is inside data property
        // console.log(this.employees);
      }
    }, (error) => {
      console.log(error);
    })
  }

}
