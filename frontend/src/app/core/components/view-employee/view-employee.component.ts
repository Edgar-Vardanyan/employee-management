import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeService } from '../../shared/services/employee.service';
import { Employee } from '../../shared/interfaces/employee.interface';
import { MatTableModule } from '@angular/material/table';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { DatePipe } from '@angular/common';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatButtonModule,
    DatePipe
  ],
})
export class ViewEmployeeComponent implements OnInit {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private employeeService = inject(EmployeeService);
  private destroyRef = inject(DestroyRef);

  public viewMode: 'table' | 'grid' = 'table';
  public employees: Employee[] = [];
  public displayedColumns: string[] = [
    'firstName',
    'lastName',
    'dob',
    'gender',
    'address1',
    'address2',
    'city',
    'postal',
    'country',
    'email',
    'mobile',
    'active',
    'action',
  ];

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.employees = res;
      });
  }

  openEditDialog(employee: Employee): void {
    let dialogWidth = '600px';
  
    const dialogRef = this.dialog.open(CreateEmployeeComponent, {
      data: { ...employee },
      width: dialogWidth,
      height: '90%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Employee details updated successfully!', 'Close', { duration: 5000, panelClass: ['snackbar-success'] });
        this.getEmployees();
      }
    });
  }

  deleteEmployee(employee: Employee) {
    const diloagref = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        actionText: 'Delete Employee',
        title: 'Are you sure you want to delete ?'
      }
    })

    diloagref.afterClosed().subscribe((status) => {
      if (status) {
        this.employeeService.deleteEmployee(employee._id!)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => {
            this.snackBar.open('Employee deleted successfully!', 'Close', { duration: 5000 });
            this.getEmployees();
          })
      }
    })
  }
}
