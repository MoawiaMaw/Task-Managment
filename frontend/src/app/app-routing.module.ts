import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';

const PUBLIC_ROUTES: Routes = [
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/add', component: AddTaskComponent },
  { path: 'tasks/upload', component: UploadFileComponent },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
];

const SECURE_ROUTES: Routes = [{}, {}, {}];

const routes: Routes = [
  { path: '', component: AppComponent, children: PUBLIC_ROUTES },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
