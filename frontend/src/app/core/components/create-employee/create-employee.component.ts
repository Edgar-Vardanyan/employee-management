import { Component, DestroyRef, Inject, inject, OnInit, Optional } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EmployeeService } from '../../shared/services/employee.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../shared/interfaces/employee.interface';


@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
  ],
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private destroyRef = inject(DestroyRef);

  public employeeForm!: FormGroup;
  public isEditMode: boolean = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Employee,
    @Optional() private dialogRef: MatDialogRef<CreateEmployeeComponent>
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      postal: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      active: ['', Validators.required],
    });

    if (this.data?._id) {
      this.isEditMode = true;
      this.employeeForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.employeeForm.valid && !this.isEditMode) {
      this.employeeService.createEmployee(this.employeeForm.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.snackBar.open('Employee created successfully!', 'Close', {
            duration: 5000,
            panelClass: ['snackbar-success'],
          });
          this.employeeForm.reset();
          this.clearFormControlErrors(this.employeeForm)
        })
    } else if (this.employeeForm.valid && this.isEditMode) {
      this.employeeService.updateEmployee(this.data._id!, this.employeeForm.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.dialogRef.close(true);
        })
    }
    else {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-error'],
      });
    }
  }

  onCancel() {
    if(this.isEditMode) {
      this.dialogRef.close(false);
      return;
    }
    this.employeeForm.reset();
    this.snackBar.open('Operation canceled!', 'Close', {
      duration: 5000,
      panelClass: ['snackbar-error'],
    });
  }

  clearFormControlErrors(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = this.employeeForm.get(key);
      control?.markAsPristine();
      control?.markAsUntouched();
      control?.setErrors(null);
    });
  }
}
