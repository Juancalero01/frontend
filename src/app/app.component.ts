import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Toast } from './components/sweatalert/toast.swal';
import { AppService } from './app.service';
import { FormComponent } from './components/form/form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  displayedColumns = ['name', 'lastName', 'email', 'phoneNumber', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(
    private readonly appService: AppService,
    private readonly matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.appService.findAll().subscribe((data: any) => {
      this.dataSource = data;
    });
  }

  openFormCreate() {
    this.matDialog
      .open(FormComponent, { width: '500px', disableClose: true })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') this.findAll();
      });
  }

  openFormUpdate(row: any) {
    console.log(row);
    this.matDialog
      .open(FormComponent, { width: '500px', data: row, disableClose: true })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') this.findAll();
      });
  }

  openDelete(id: string, name: string, lastName: string) {
    Swal.fire({
      title: '¿Desea eliminar al empleado?',
      text: `${name} ${lastName}`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.appService.remove(id).subscribe({
          next: (response) => {
            this.findAll();
          },
        });
      }
    });
  }
}
