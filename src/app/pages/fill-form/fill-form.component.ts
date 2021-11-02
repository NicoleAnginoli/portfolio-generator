import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Person } from 'src/app/shared/interfaces/Models';

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {

  showMessage: boolean | undefined;
  isCurrentlyJob: boolean = false;

  interest: String ="";
  interests: Array<String> = [];

  skill: String ="";
  skills: Array<String> = [];

  person = {} as Person;

  constructor() { }

  ngOnInit() {
    this.showMessage = false;
  }


  addInterests(event: String) {
    if(event) {
      this.interests.push(event)
      this.interest = "";
    }
  }

  addSkills(event: String) {
    console.log("a",event)
    if(event) {
      this.skills.push(event)
      this.skill = "";
    }
  }

  onCheckChange(event: any) {
    if(event.target.checked) {
      this.isCurrentlyJob = true;
    }
    else {
      this.isCurrentlyJob = false;
    }
    console.log(this.isCurrentlyJob)
  }

  post(form: NgForm) {
    console.log(form)
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    // funcionario = {} as Funcionario;
  }
}
