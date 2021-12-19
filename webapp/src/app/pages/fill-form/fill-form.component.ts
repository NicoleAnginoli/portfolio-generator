import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/Models';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {

  form;
  user = {} as User;
  userToUpdate = {} as User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      username: [''],
      name: [''],
      description: [''],
      contacts: this.formBuilder.group({
        email: [''],
        linkedin: [''],
        phone: [''],
      }),
      interests: this.formBuilder.array([
        this.formBuilder.control('')
      ]),
      skills: this.formBuilder.array([
        this.formBuilder.control('')
      ]),
      professionalBackground: this.formBuilder.array([
        this.formBuilder.group({
          company: [''],
          role: [''],
          startDate: [''],
          endDate: [''],
          roleDescription: [''],
        })
      ]),
      academicInfo: this.formBuilder.array([
        this.formBuilder.group({
          institution: [''],
          course: [''],
          startDate: [''],
          endDate: [''],
        })
      ]),
    });
  }

  get interests() {
    return this.form.get('interests') as FormArray;
  }

  get skills() {
    return this.form.get('skills') as FormArray;
  }

  get professionalBackground() {
    return this.form.get('professionalBackground') as FormArray;
  }

  get academicInfo() {
    return this.form.get('academicInfo') as FormArray;
  }

  ngOnInit(): void {
    const action = this.route.snapshot.paramMap.get('action');
    if (action == 'edit')
      this.createFormToEdit();
  }

  createFormToEdit() {
    this.userService.getUsers().subscribe((resp) => {
      console.log(resp)
      this.userToUpdate = resp[2];
      this.cleanInitialFormArray();
      this.fillEditForm();
      this.form.setValue(this.userToUpdate);
    },
      (error) => {
        console.log("erro", error)
      })
  }

  onSubmit() {
    this.user = this.form.value;
    console.log(this.user);
    this.userService.postUser(this.user).subscribe(() => {
      this.router.navigate(['/template', this.user.username]);
    });
  }

  newAcademicInfo() {
    return this.formBuilder.group({
      institution: [''],
      course: [''],
      startDate: [''],
      endDate: [''],
    })
  }

  newProfessionalBackground() {
    return this.formBuilder.group({
      company: [''],
      role: [''],
      startDate: [''],
      endDate: [''],
      roleDescription: [''],
      // isCurrentlyJob: [''],
    })
  }

  verifyLastInterest() {
    if (this.interests.at(this.interests.length - 1).value == '') {
      return true;
    }
    else {
      return false;
    }
  }

  verifyLastSkill() {
    if (this.skills.at(this.skills.length - 1).value == '') {
      return true;
    }
    else {
      return false;
    }
  }

  addRow(type: string) {
    switch (type) {
      case 'interests':
        this.interests.push(this.formBuilder.control(''));
        break;
      case 'skills':
        this.skills.push(this.formBuilder.control(''));
        break;
      case 'academic':
        this.academicInfo.push(this.newAcademicInfo());
        break;
      case 'professional':
        this.professionalBackground.push(this.newProfessionalBackground());
        break;
    }
  }

  deleteRow(index: number, type: string) {
    switch (type) {
      case 'interests':
        this.interests.removeAt(index);
        break;
      case 'skills':
        this.skills.removeAt(index);
        break;
      case 'academic':
        this.academicInfo.removeAt(index);
        break;
      case 'professional':
        this.professionalBackground.removeAt(index);
        break;
    }
  }

  cleanInitialFormArray() {
    this.deleteRow(0, 'interests');
    this.deleteRow(0, 'skills');
    this.deleteRow(0, 'academic');
    this.deleteRow(0, 'professional');
  }

  fillEditForm() {
    this.userToUpdate.interests.forEach(() => this.addRow("interests"))
    this.userToUpdate.skills.forEach(() => this.addRow("skills"))
    this.userToUpdate.academicInfo.forEach(() => this.addRow("academic"))
    this.userToUpdate.professionalBackground.forEach(() => this.addRow("professional"));
  }
}