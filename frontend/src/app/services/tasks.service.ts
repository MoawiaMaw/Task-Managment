import { Observable } from 'rxjs';
import { Task } from './../models/task.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly url: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}/tasks`, {
      observe: 'body',
    });
  }

  getOne(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.url}/tasks/${id}`, {
      observe: 'body',
    });
  }

  create(Task: any): Observable<Task> {
    return this.http.post<Task>(`${this.url}/tasks`, Task, {
      observe: 'body',
    });
  }

  createMany(Tasks: any): Observable<Task> {
    return this.http.post<Task>(`${this.url}/tasks/upload`, Tasks, {
      observe: 'body',
    });
  }

  update(id: number, status: String): Observable<Task> {
    return this.http.put<Task>(`${this.url}/tasks/${id}`, status, {
      observe: 'body',
    });
  }

  delete(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.url}/tasks/${id}`, {
      observe: 'body',
    });
  }
}
