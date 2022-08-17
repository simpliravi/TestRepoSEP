import { Component, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  employee: Employee = new Employee();

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    desc: new FormControl(''),
  });

  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private _employeeService: EmployeeService,
    private _router: Router,
    private ngZone: NgZone) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', Validators.required],
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this._employeeService.AddEmployee(this.employee).subscribe((result) => {
      this.ngZone.run(() => this._router.navigateByUrl('/employees'));
    }, (error) => {
      console.log(error);
    })
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
