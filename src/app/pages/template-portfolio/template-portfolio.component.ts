import { Component, OnInit } from '@angular/core';
import { AcademicInfo, Contacts, Person, ProfessionalBackGround } from 'src/app/shared/interfaces/Models';

@Component({
  selector: 'app-template-portfolio',
  templateUrl: './template-portfolio.component.html',
  styleUrls: ['./template-portfolio.component.scss']
})
export class TemplatePortfolioComponent implements OnInit {

  constructor() { }

  showContacts: boolean = false;
  showInterests: boolean = false;
  showAcademicInfo: boolean = false;
  showProfessionalInfo: boolean = false;
  showskills: boolean = false;

  person = {} as Person;
  contacts = {} as Contacts;
  interests: Array<String> = [];
  skills: Array<String> = [];
  academic = {} as AcademicInfo;
  academicArray: Array<AcademicInfo> = [];
  experience = {} as ProfessionalBackGround;
  experience2 = {} as ProfessionalBackGround;
  experienceArray: Array<ProfessionalBackGround> = [];

  ngOnInit(): void {
    this.contacts.email = "email@email.com";
    this.contacts.linkedin = "linkedin.com/nome";
    this.contacts.phone = "(11) 1111111";

    this.interests.push("web development");
    this.interests.push("software engineer");
    this.interests.push("fullstack development");

    this.skills.push("Angular");
    this.skills.push("Java");
    this.skills.push("GIT");
    this.skills.push("Github");
    this.skills.push("HTML");
    this.skills.push("CSS");
    this.skills.push("Javascript");

    this.academic.course = "Sistemas de Informação";
    this.academic.institution = "Universidade de São Paulo";
    this.academic.startDate = new Date("2018, 01, 01");
    this.academic.endDate = new Date("2021, 12, 31") ;
    this.academicArray.push(this.academic)

    this.experience.company = "Company";
    this.experience.role = "Software Engineer"
    this.experience.roleDescription = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, distinctio ad    corporis, laboriosam unde provident, architecto tenetur ea odio debitis delectus explicabo eum obcaecati    vitae facere iusto laborum consequuntur neque."
    this.experience.startDate = new Date("2018, 01, 01");
    this.experience.endDate = new Date("2019, 01, 01");
    this.experience.isCurrentlyJob = false;

    this.experience2.company = "Company";
    this.experience2.role = "Software Engineer"
    this.experience2.roleDescription = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, distinctio ad    corporis, laboriosam unde provident, architecto tenetur ea odio debitis delectus explicabo eum obcaecati    vitae facere iusto laborum consequuntur neque."
    this.experience2.startDate = new Date("2019, 01, 01");
    this.experience2.isCurrentlyJob = true;

    this.experienceArray.push(this.experience2);
    this.experienceArray.push(this.experience);

    this.person.name = "Nome Sobrenome";
    this.person.description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, distinctio ad    corporis, laboriosam unde provident, architecto tenetur ea odio debitis delectus explicabo eum obcaecati    vitae facere iusto laborum consequuntur neque."
    this.person.contacts = this.contacts;
    this.person.interests = this.interests;
    this.person.skills = this.skills;
    // this.person.academicInfo = this.academicArray;
    // this.person.professionalBackground = this.experienceArray;
  }

  teste(divToShow: string) {

    this.hideAll()

    switch(divToShow) { 
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
