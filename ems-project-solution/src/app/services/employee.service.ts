import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  REST_API: string = 'http://localhost:3000/employees';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _httpClient: HttpClient) { }

  GetEmployees(): Observable<Employee[]> {
    return this._httpClient.get<Employee[]>(`http://localhost:3000/employees`);
  }

  AddEmployee(Employee: Employee): Observable<Employee> {
    return this._httpClient.post<Employee>(`http://localhost:3000/employees`, Employee, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  GetEmployeeById(id: any): Observable<Employee> {
    return this._httpClient.get<Employee>(`http://localhost:3000/employees/${id}`)
      .pipe(
        map((res: any) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

  UpdateEmployeeById(id: any, Employee: Employee): Observable<Employee> {
    return this._httpClient.put<Employee>(`http://localhost:3000/employees/` + id, Employee, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));;
  }

  DeleteEmployeeById(id: any): Observable<Employee> {
    return this._httpClient.delete<Employee>(`http://localhost:3000/employees/` + id)
      .pipe(catchError(this.handleError));
  }

  // Error Handler
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}
