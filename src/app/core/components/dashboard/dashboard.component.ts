import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/services/employee.service';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../shared/interfaces/employee.interface';
import { EmployeeCountInformation } from '../../shared/interfaces/employeeCountInformation.interface';
import { countByKey } from '../../shared/utils/countByKey';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  
  public employees: Employee[] = [];
  public employeesCountInformation!: EmployeeCountInformation;

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((res) => {
      this.employees = res;
      this.employeesCountInformation = {
        totalEmployees: this.employees.length,
        totalActiveEmployees: countByKey(this.employees, 'active', true),
        totalMaleEmployees: countByKey(this.employees, 'gender', 'male'),
        totalFemaleEmployees: countByKey(this.employees, 'gender' ,'female')
      }
    });
  }

}
