import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/taskSerivce/task.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit {
  constructor(private taskService:TaskService) {}

 
  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() taskId: string | undefined = '';

  @Output()
  EmitTaskData: EventEmitter<Task> = new EventEmitter<Task>();

  @Output()
  EmitUpdateTaskData: EventEmitter<Task> = new EventEmitter<Task>();

  @ViewChild('taskForm') taskFormView: NgForm;

  taskData: Task;

  ngOnInit(): void {
    if(this.taskId !== '' && this.taskId !== undefined && this.taskId !== null) {
      this.taskService.GetTaskById(this.taskId)
      .subscribe({
        next: (response) => {
          this.taskFormView.setValue({
            title: response.title,
            status: response.status,
            priority:response.priority,
            createdAt: response.createdAt,
            assignedTo: response.assignedTo,
            description: response.description
          })
        }
      })
    }
  }

  OnCloseForm(){
    this.CloseForm.emit(false);
  }

  OnFormSubmitted(form: NgForm) {
    if(this.taskId) {
      this.EmitUpdateTaskData.emit(form.value)
    }
    else {
      this.EmitTaskData.emit(form.value)
    }
    this.CloseForm.emit(false);
  }
}
