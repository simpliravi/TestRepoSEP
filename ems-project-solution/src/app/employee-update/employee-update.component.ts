import { Component, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  getId: any;
  employee: Employee = new Employee();

  form: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
  });

  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private _vendorService: EmployeeService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getId = this._activatedRoute.snapshot.paramMap.get('id');
    this._vendorService.GetEmployeeById(this.getId).subscribe((result: any) => {
      this.employee = result;
    }, (error) => {
      console.log(error);
    })
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
    this._vendorService.UpdateEmployeeById(this.employee.id, this.employee).subscribe((result: any) => {
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
