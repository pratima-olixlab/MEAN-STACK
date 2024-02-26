import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../shared/employee.model';
declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit{
  constructor(public employeeService: EmployeeService,private toastr: ToastrService){
    this.refreshEmployeeList();
  }
  displayedColumns: string[] = ['name', 'position', 'office', 'actions'];
  ngOnInit(): void {
    this.refreshEmployeeList();
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: null
    }
  }

  onSubmit(form:NgForm){
    if(form.value._id == ""){
    this.employeeService.postEmployee(form.value).subscribe((res)=> {
      this.resetForm(form);
      this.refreshEmployeeList();
      this.toastr.success('Employee Added to the List!', 'Added Successfully!');
    });
  }
  else {
    this.employeeService.updateEmployee(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshEmployeeList();
      this.toastr.success('Employee updated to the List!', 'Saved Successfully!');
    })
  }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  onEdit(emp: Employee){
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id:string, form: NgForm){
    if(confirm('Are you sure to delete this record ? ') == true){
     this.employeeService.deleteEmployee(_id).subscribe((res)=>{
         this.refreshEmployeeList();
         this.resetForm(form);
         this.toastr.success('Employee deleted from the List!', 'Deleted Successfully!');
     });
    }
  }
}
