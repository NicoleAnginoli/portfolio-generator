import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-init-portifolio-generator',
  templateUrl: './init-portifolio-generator.component.html',
  styleUrls: ['./init-portifolio-generator.component.scss']
})
export class InitPortifolioGeneratorComponent implements OnInit {
  form;
  disabledButton: Boolean = true;
  messageNotFound: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      username: ['']
    })
  }

  ngOnInit(): void {
  }

  disableButton() {
    this.messageNotFound = false;
    this.form.get('username')?.value == '' ? this.disabledButton = true : this.disabledButton = false;
  }

  onSubmit() {
    console.log(this.form.value);
  }

  goFillForm() {
    this.router.navigate(['/form/fill']);
  }

  goUserAction(action: string) {
    const username = this.form.get('username')?.value;
    this.userService.getUserById(username).subscribe((resp)=> {
     if(resp) {
      action == 'template' ? this.router.navigate(['/template', username]) : this.router.navigate(['/form/edit', username]);
     }
     else {
       this.messageNotFound = true;
     }
    },
    (error) => {
      // TO DO - tela sistema indisponível
      console.log("err", error)
    })
  }
}
