import { Component } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/Models';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent {

  form;
  user = {} as User;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
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

  onSubmit() {
    this.user = this.form.value;
    this.userService.addUser(this.user);
    console.log(this.user);
    console.log(this.user.professionalBackground[0].startDate)
    console.log(typeof this.user.professionalBackground[0].startDate)
    this.router.navigate(['/template', this.user.username]);
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
      isCurrentlyJob: [''],
    })
  }

  addProfessionalBackground() {
    this.professionalBackground.push(this.newProfessionalBackground());
  }

  addAcademicInfo() {
    this.academicInfo.push(this.newAcademicInfo());
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
    if (type == 'interests')
      this.interests.push(this.formBuilder.control(''));
    else if (type == 'skills')
      this.skills.push(this.formBuilder.control(''));
  }

  deleteRow(index: number, type: string) {
    if (type == 'interests')
      this.interests.removeAt(index);
    else if (type == 'skills')
      this.skills.removeAt(index);
  }
}
