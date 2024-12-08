import { Routes } from '@angular/router';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { ViewEmployeeComponent } from './core/components/view-employee/view-employee.component';
import { CreateEmployeeComponent } from './core/components/create-employee/create-employee.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'view-employee', component: ViewEmployeeComponent },
    { path: 'create-employee', component: CreateEmployeeComponent }
];
