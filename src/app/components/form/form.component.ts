import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  formGroup!: FormGroup;
  formTitle = 'Formulario de registro';
  formButton = 'Registar';

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: any,
    private readonly appService: AppService,
    private readonly formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormComponent>
  ) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
    if (this.data) this.addData(this.data);
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
    });
  }

  sendForm() {
    if (!this.data) this.create();
    else this.update();
  }

  //! CREATE EMPLOYEE FORM
  // ----------------------------------------------------------------------------------
  create() {
    this.appService.create(this.formGroup.value).subscribe({
      next: (response) => {
        Toast.fire({
          icon: 'success',
          title: 'Registrado con exito',
        }).then(() => {
          this.formGroup.reset();
          this.dialogRef.close('save');
        });
      },
      error: (error) => {
        Toast.fire({
          icon: 'error',
          title: 'Ha ocurrido un problema',
        }).then(() => {
          this.formGroup.reset();
        });
      },
    });
  }

  //! UPDATE EMPLOYEE FORM
  // ----------------------------------------------------------------------------------
  addData(data: any) {
    this.formTitle = 'Formulario de actualizar';
    this.formButton = 'Actualizar';
    this.formGroup.controls['name'].setValue(data.name);
    this.formGroup.controls['lastName'].setValue(data.lastName);
    this.formGroup.controls['email'].setValue(data.email);
    this.formGroup.controls['phoneNumber'].setValue(data.phoneNumber);
  }

  update() {
    this.appService.update(this.data.id, this.formGroup.value).subscribe({
      next: (response) => {
        Toast.fire({
          icon: 'success',
          title: 'Actualizado con exito',
        }).then(() => {
          this.formGroup.reset();
          this.dialogRef.close('update');
        });
      },
      error: (error) => {
        Toast.fire({
          icon: 'error',
          title: 'Ha ocurrido un problema',
        }).then(() => {
          this.formGroup.reset();
        });
      },
    });
  }

}
