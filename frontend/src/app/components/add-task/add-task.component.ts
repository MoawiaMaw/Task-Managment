import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  form: FormGroup = this.fb.group({
    title: [
      '', [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
    ],
    description: [
      '', [Validators.required, Validators.minLength(3)],
    ],
  });

  constructor(private router: Router, private fb: FormBuilder, private tasksService: TasksService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  submit() {
    // Preparing the data to send to the server.
    let data = {
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
    };

    this.tasksService.create(data).subscribe({
      next: (resp: any) => {
        this.toastr.success(resp.message);
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        this.toastr.error(error.error.error);
      },
    });
      
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
