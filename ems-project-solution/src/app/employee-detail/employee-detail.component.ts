import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  getId: any;
  employee: Employee = new Employee();

  constructor(private _router: Router,
    private _ngZone: NgZone,
    private _activatedRoute: ActivatedRoute,
    private _employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getId = this._activatedRoute.snapshot.paramMap.get('id');
    this._employeeService.GetEmployeeById(this.getId).subscribe((result: any) => {
      if (result) {
        this.employee = result;
        // because employee list is inside data property
        console.log(this.employee);
      }
    }, (error) => {
      console.log(error);
    })
  }

  deleteEmployee() {
    if (window.confirm('Do you want to go ahead?')) {
      this._employeeService.DeleteEmployeeById(this.employee.id).subscribe((result) => {
        this._ngZone.run(() => this._router.navigateByUrl('/employees'));
      }, (error) => {
        console.log(error);
      });
    }
  }

}
