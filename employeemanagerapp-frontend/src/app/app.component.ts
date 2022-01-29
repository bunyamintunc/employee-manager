import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  

  constructor(private employeeService:EmployeeService){ }

  ngOnInit(): void {
      this.getEmployees();
  }

  public employees !: Employee[];
  public editEmployee !: Employee;
  public deleteEmployee !: Employee;

  public getEmployees():void{
    this.employeeService.getEmployees().subscribe(response=>{
      this.employees=response;
    },(error:HttpErrorResponse)=>{
      alert(error.message);
    })
  }

  public searchEmployee(key:string):void{
    const result :Employee[]=[];
    for(const employee of this.employees){
      if(employee.name.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1){
        result.push(employee);
      }
    }
    this.employees=result;
    if(result.length==0 || key===""){
      this.getEmployees();
    }
  }

  public onAddEmployee(addForm:NgForm):void{
    this.employeeService.addEmployees(addForm.value).subscribe((response:Employee)=>{
      console.log(response);
      this.getEmployees();
      addForm.reset()
    },
    (error:HttpErrorResponse)=>{
      alert(error.message)
    });
    document.getElementById('add-employee-form')?.click();

  }

  public onUpdateEmployee(employee:Employee):void{
    this.employeeService.updateEmployees(employee).subscribe((response:Employee)=>{
      console.log(response);
      this.getEmployees();

    },
    (error:HttpErrorResponse)=>{
      alert(error.message)
    });
    document.getElementById('add-employee-form')?.click();

  }

  public onDeleteEmployee(employeId:number):void{
    this.employeeService.deleteEmployees(employeId).subscribe((response:void)=>{
      console.log(response);
      this.getEmployees();

    },
    (error:HttpErrorResponse)=>{
      alert(error.message)
    });
    document.getElementById('add-employee-form')?.click();

  }



  public onOpenModal(employee:Employee, mode :string):void{
   
    const container=document.getElementById('main-container')
    const button=document.createElement('button')
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode === 'add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }

    if(mode === 'edit'){
      this.editEmployee=employee;
      button.setAttribute('data-target','#updateEmployeeModal');
    }

    if(mode === 'delete'){
      this.deleteEmployee=employee;
      button.setAttribute('data-target','#deleteEmployeeModal');
    }

    container!.appendChild(button);
    button.click();

  }
}
