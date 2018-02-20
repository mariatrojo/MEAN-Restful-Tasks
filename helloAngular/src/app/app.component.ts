import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Restful Tasks API';
  tasks = [];
  buttonClick: boolean;
  editButtonClick: boolean;
  newTask: any;
  editTask: any;
//   num: number;
//   randNum: number;
//   str: string;
//   first_name: string;
//   snacks: [string];
//   loggedIn: boolean;
  
  constructor(private _httpService: HttpService){};

  ngOnInit() {
	  this.getTasksFromService();
	  this.newTask = { title: "", description: "" }
	  this.editTask = { title: "", description: "" }
	//   this.num = 7;
	//   this.randNum = Math.floor( (Math.random() * 2) + 1);
	//   this.str = 'Hello Angular Developer!';
	//   this.first_name = 'Alpha';
	//   this.snacks = ["vanilla latte with skim milk", "brushed suede", "cookie"];
	  this.buttonClick = false;
	  this.editButtonClick = false;
  }

  onSubmit() {
	  // needs code - send off form data (this.newTask) to the service
	//   this.buttonClick = true;
	  let observable = this._httpService.addTask(this.newTask);
	  observable.subscribe(data => {
		  console.log("Got a new task", data);
		  this.newTask = { title: "", description: "" }
	  });
	  this.getTasksFromService();
  }

  //update a task
  onEditButton() {
	  let observable = this._httpService.commitEditTask(this.editTask);
	  observable.subscribe(data => {
		  console.log("Edited post", data);
		  this.getTasksFromService();
	  })
	  this.editTask = { id: "", title: "", description: ""};
  }

  getTasksFromService() {
	  this.buttonClick = true;
	  //this line invokes getTasks from service.ts and stores in observable
	  let observable = this._httpService.getTasks();
	  // following line subscribes to the observable
	  observable.subscribe(data => {
		console.log("Got our tasks!", data)
		this.tasks = data['tasks'];
	  });
  }

  onButtonClick(): void {
	this.buttonClick = true;
  }
  onDeleteButtonClick(id) {
	  let observable = this._httpService.deleteTask(id);
	  console.log(id);
	  observable.subscribe(data => {
		  console.log("Deleted a task", data);
	  });
	  this.getTasksFromService();
  }
  //show Edit form
  populateEditField(task) {
	  console.log(task)
	  this.editButtonClick = true;
	  this.editTask.id = task._id;
	  this.editTask.title = task.title;
	  this.editTask.description = task.description;

  }
  
  //   onButtonClick(): void {
// 	  console.log('Click event is working');
//   }
//   onButtonClickParam(num: Number): void {
// 	  console.log(`Click event is working with num param: ${num}`);
//   }
//   onButtonClickParams(num: Number, str: String): void {
// 	  console.log(`Click event is working with num param: ${num} and str param: ${str}`);
//   }
//   onButtonClickEvent(event: any): void {
// 	  console.log(`Click event is working with event: `, event);
//   }
}
