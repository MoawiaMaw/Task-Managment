import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  public tasks: Task[] = [];
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<Task>(this.tasks);

  private paginator!: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;

    if (this.paginator) {
      this.applyFilter('');
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(
    private tasksService: TasksService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tasksService.getAll().subscribe({
      next: (resp: any) => {
        this.dataSource.data = resp.data.tasks;
        this.tasks = resp.data.tasks;
      },
      error: (error: any) => {
        this.toastr.error(error.error.error);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  updateStatus(id: number, status: string) {
    // Updating the status - Toggeling between PENDING and COMPLETED
    if (status === 'PENDING') {
      let task: any = this.tasks.filter((task) => task.id == id)[0];
      task.status = "COMPLETED";
      this.dataSource.data = this.tasks;
      this.tasksService.update(id, 'COMPLETED').subscribe({
        next: (resp) => {
          this.toastr.success('Status updated')
        },
        error: (error) => {
          this.toastr.error(error.error.error)
        }
      })
    }
    if (status === 'COMPLETED') {
      let task: any = this.tasks.filter((task) => task.id == id)[0];
      task.status = 'PENDING';
      this.dataSource.data = this.tasks;
      this.tasksService.update(id, 'PENDING').subscribe({
        next: (resp) => {
          this.toastr.success('Status updated!')
        },
        error: (error) => {
          this.toastr.error(error.error.error)
        }
      })
      
      }
  }
  
  deleteTask(id: number) {
    // Delete a task - removing it from the UI before making the request.
    let task: any = this.tasks.filter((task) => task.id == id)[0];
    this.tasks = this.tasks.filter((task) => task.id != id);
    this.dataSource.data = this.tasks
    this.tasksService.delete(id).subscribe({
      next: (resp) => {
        this.toastr.success('Task deleted!')
      },
      error: (error) => {
        this.toastr.error(error.error.error)
      }
    })
  }

  downloadFile() {
    //DOWNLOAD EXCEL FUNCTIONALITY - checking if there are tasks rendered from DB, preventing empty file download
    if (this.tasks && this.tasks.length > 0) {
      const fileName = 'Tasks.xlsx';
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tasks);
  
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
      XLSX.writeFile(workbook, fileName);
    }
    else {
      this.toastr.error('There are no tasks')
    }
  }

  addTask() {
    this.router.navigate(['/tasks/add']);
  }

  uploadFile() {
    this.router.navigate(['/tasks/upload']);
  }
}
