import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: 'user',
    component: EmployeeComponent,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }