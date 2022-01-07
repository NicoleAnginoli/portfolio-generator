import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { atLeastOneField } from 'src/app/shared/directives/require-end-date.directive';
import { User } from 'src/app/shared/interfaces/Models';
import { UserService } from 'src/app/shared/services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {

  form;
  user = {} as User;
  userToUpdate = {} as User;
  editForm: boolean = false;
  userAlreadyExists: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      contacts: this.formBuilder.group({
        email: ['', Validators.required],
        linkedin: ['', Validators.required],
        phone: ['', Validators.required],
      }),
      interests: this.formBuilder.array([
        this.formBuilder.control('', Validators.required)
      ]),
      skills: this.formBuilder.array([
        this.formBuilder.control('', Validators.required)
      ]),
      professionalBackground: this.formBuilder.array([
        this.formBuilder.group({
          company: ['', Validators.required],
          role: ['', Validators.required],
          startDate: ['', Validators.required],
          endDate: [''],
          roleDescription: ['', Validators.required],
          isCurrentJob: ['', Validators.required],
        }, { validator: atLeastOneField('isCurrentJob', 'endDate') })
      ]),
      academicInfo: this.formBuilder.array([
        this.formBuilder.group({
          institution: ['', Validators.required],
          course: ['', Validators.required],
          startDate: ['', Validators.required],
          isCurrentCourse: [''],
          endDate: [''],
        }, { validator: atLeastOneField('isCurrentCourse', 'endDate') })
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
    if (action == 'edit') {
      this.editForm = true;
      this.createFormToEdit();
    }
  }

  createFormToEdit() {
    const id = this.route.snapshot.paramMap.get('id');
    let user: User | undefined;
    if (id) {
      this.userService.getUserById(id).subscribe((resp) => {
        if (resp) {
          this.userToUpdate = resp;
          this.cleanInitialFormArray();
          this.fillEditForm();
          this.form.setValue(this.userToUpdate);
        }
      },
        (error) => {
          // TO DO - tela sistema indisponível
          console.log("err", error)
        })
    }
  }

  validateUsername() {
    const username = this.form.get('username')?.value;
    if(username == ''){
      this.userAlreadyExists = false
    }
    else {
       this.userService.getUserById(username)
      .subscribe(
        (res) => {
          if (res) {
            this.userAlreadyExists = true;
          } else {
            this.userAlreadyExists = false
          }
        }
      )
    }   
  }

  onSubmit() {
    this.user = this.form.value;
    if (this.editForm)
      this.editUser(this.user);
    else
      this.addUser(this.user);
  }

  addUser(user: User) {
    this.userService.postUser(this.user).subscribe(() => {
      this.router.navigate(['/template', this.user.username]);
    });
  }

  editUser(user: User) {
    this.userService.putUser(this.user).subscribe(() => {
      this.router.navigate(['/template', this.user.username]);
    });
  }

  newAcademicInfo() {
    return this.formBuilder.group({
      institution: ['', Validators.required],
      course: ['', Validators.required],
      startDate: ['', Validators.required],
      isCurrentCourse: ['', Validators.required],
      endDate: [''],
    }, { validator: atLeastOneField('isCurrentCourse', 'endDate') })
  }

  newProfessionalBackground() {
    return this.formBuilder.group({
      company: ['', Validators.required],
      role: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      roleDescription: ['', Validators.required],
      isCurrentJob: ['', Validators.required],
    }, { validator: atLeastOneField('isCurrentJob', 'endDate') })
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
        this.interests.push(this.formBuilder.control('', Validators.required));
        break;
      case 'skills':
        this.skills.push(this.formBuilder.control('', Validators.required));
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
    this.userToUpdate.academicInfo.forEach((user, i) => {
      this.addRow("academic");
      if(user.isCurrentCourse)
        this.academicInfo.at(i).get('endDate')?.disable();
    })
    this.userToUpdate.professionalBackground.forEach((user, i) => {
      this.addRow("professional");
      if(user.isCurrentJob)
        this.professionalBackground.at(i).get('endDate')?.disable()
    });
  }

  onAcademicCheckboxChange(i: number) {
    if (this.academicInfo.at(i).get('isCurrentCourse')?.value)
      this.academicInfo.at(i).get('endDate')?.disable()
    else
      this.academicInfo.at(i).get('endDate')?.enable()
  }

  onProfessionalCheckboxChange(i: number) {
    if (this.professionalBackground.at(i).get('isCurrentJob')?.value)
      this.professionalBackground.at(i).get('endDate')?.disable()
    else
      this.professionalBackground.at(i).get('endDate')?.enable()
  }

}