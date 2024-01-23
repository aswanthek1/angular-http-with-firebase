import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CreateTaskComponent } from './create-task/create-task.component';
import { Task } from '../models/task.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencilSquare, faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TaskService } from '../services/taskSerivce/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CreateTaskComponent, FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    this.fetchAllTasks()
  }
  pencilIcon = faPencilSquare
  trashIcon = faTrash
  infoIcon = faInfoCircle
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient);
  allTasks: Task[] = []
  taskId: string | undefined

  taskService: TaskService = inject(TaskService);

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
    this.taskId = null
  }

  CreateTask(data: Task) {
    this.taskService.CreateTask(data)
    .subscribe({
      next: (response) => {
        this.fetchAllTasks()
      }
    })
  }

  private fetchAllTasks() {
    this.taskService.GetAllTasks().subscribe(
      {
        next: (response) => {
          this.allTasks = response
        }
      }
    );
  }

  fetchTasksClicked() {
    this.fetchAllTasks()
  }

  DeleteTask(id: string | undefined) {
    this.taskService.DeleteTask(id)
    .subscribe({
      next: (response) => {
        this.fetchAllTasks()
      }
    })
  }

  DeleteAllTasks() {
    this.taskService.DeleteAllTask()
    .subscribe({
      next: (response) => {
        this.fetchAllTasks()
      }
    })
  }

  EditTaskClicked(id: string | undefined) {
    this.taskId = id
    this.OpenCreateTaskForm()
  }

  UdpateTask(taskData: Task) {
    this.taskService.UpdateTaskById(this.taskId, taskData)
    .subscribe({
      next: (response) => {
        this.fetchAllTasks()
      }
    })
  }
}
