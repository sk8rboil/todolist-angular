import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { TodolistModel } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  formvalue !: FormGroup;
  todoModelObj : TodolistModel = new TodolistModel()  //keep data from Model
  todoData !: any;  //get data from getTodoText

  constructor(private formbuilder: FormBuilder,private api: ApiService){ }
  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      ischeck : [],
      todotext: [''],
    })
    this.getTodoData();
  }

  postTodoData(){
    this.todoModelObj.todotext = this.formvalue.value.todotext;

    this.api.postTodotext(this.todoModelObj).subscribe(res=>{
      console.log(res);
      this.formvalue.reset();
      this.getTodoData();
    },_err=>{
      console.error("error");
    })  
  }

  getTodoData(){
    this.api.getTodotext().subscribe(res=>{
      this.todoData = res;
    })
  }

  deleteTodoData(item : any){
    this.api.deleteTodotext(item.id).subscribe(res=>{
      alert("Deleted Todolist");
      this.getTodoData();
    })
  }

  editTodoData(item : any){
    this.todoModelObj.id = item.id;
    this.formvalue.controls['todotext'].setValue(item.todotext);
  }

  updateTodoData(){
    this.todoModelObj.todotext = this.formvalue.value.todotext;
    this.api.updatetodotext(this.todoModelObj,this.todoModelObj.id).subscribe(res=>{
      this.formvalue.reset();
      this.getTodoData();
    })
  }

}
