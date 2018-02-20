import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { 
	// this.getTasks();
	// this.retrieveTask();
	// this.deleteTask();
  }


  getTasks(){
	// let tempObservable = this._http.get('/tasks');
	// tempObservable.subscribe(data => console.log("Got our tasks!", data));
	return this._http.get('/tasks');
  }

  addTask(newtask) {
	  return this._http.post('/tasks', newtask)
  }

  retrieveTask(){
	  let retrieveTaskObservable = this._http.get('/tasks/5a84fe9beb4a9c11b6c17bef');
	  retrieveTaskObservable.subscribe(data => console.log("Retrieved a task!", data));
  }

  deleteTask(id){
	//   let deleteTaskObservable = this._http.delete('tasks/5a84fe9beb4a9c11b6c17bef');
	//   deleteTaskObservable.subscribe(data => console.log("Deleted a task!", data));
	return this._http.delete(`/tasks/${id}`);
  }

  commitEditTask(updatedTask){
	return this._http.put(`/tasks/${updatedTask.id}`, updatedTask);
  }

}
