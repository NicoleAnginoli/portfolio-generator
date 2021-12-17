import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/shared/interfaces/Models';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-template-portfolio',
  templateUrl: './template-portfolio.component.html',
  styleUrls: ['./template-portfolio.component.scss']
})
export class TemplatePortfolioComponent implements OnInit {
  service: any;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  showContacts: boolean = false;
  showInterests: boolean = false;
  showAcademicInfo: boolean = false;
  showProfessionalInfo: boolean = false;
  showskills: boolean = false;
  person = {} as Person;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    let user: Person | undefined;
    if (id) {
      user = this.userService.getUser(id);
      if (user) {
        this.person = user;
      }
    }
  }

  showSection(divToShow: string) {

    this.hideAll();

    switch (divToShow) {
      case "contacts": {
        this.showContacts = true;
        break;
      }
      case "interests": {
        this.showInterests = true;
        break;
      }
      case "academic": {
        this.showAcademicInfo = true;
        break;
      }
      case "professional": {
        this.showProfessionalInfo = true;
        break;
      }
      case "skills": {
        this.showskills = true;
        break;
      }
    }
  }

  hideAll() {
    this.showContacts = false;
    this.showInterests = false;
    this.showAcademicInfo = false;
    this.showProfessionalInfo = false;
    this.showskills = false;
  }
}
