import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  CreateTask(task: Task) {
    // if you want to create header
    const header = new HttpHeaders({ myHeader: 'hello world' })
    return this.http.post<{ name: string }>('https://angularhtttpclient-default-rtdb.firebaseio.com/tasks.json', task, { headers: header })
  }

  DeleteTask(id: string | undefined) {
    return this.http.delete(`https://angularhtttpclient-default-rtdb.firebaseio.com/tasks/${id}.json`)
  }

  DeleteAllTask() {
    return this.http.delete(`https://angularhtttpclient-default-rtdb.firebaseio.com/tasks.json`)
  }

  GetAllTasks() {
   return this.http.get<{ [key: string]: Task }>('https://angularhtttpclient-default-rtdb.firebaseio.com/tasks.json')
      .pipe(map((response) => {
        // In the response we will recieve an object we need to transform it in to an array
        let tasks = [];
        for (let key in response) {
          if(response.hasOwnProperty(key)) {
            tasks.push({...response[key], id: key })
          }
        }
        return tasks;
      }))
  }

  GetTaskById(id:string | undefined) {
    return this.http.get<Task>(`https://angularhtttpclient-default-rtdb.firebaseio.com/tasks/${id}.json`)
  }

  UpdateTaskById(id:string, task: Task) {
    return this.http.put(`https://angularhtttpclient-default-rtdb.firebaseio.com/tasks/${id}.json`, task)
  }
}
