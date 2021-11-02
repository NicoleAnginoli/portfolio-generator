import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FillFormComponent } from './pages/fill-form/fill-form.component';
import { RouterModule, Routes } from '@angular/router';
import { TemplatePortfolioComponent } from './pages/template-portfolio/template-portfolio.component';

const routes: Routes = [
  { path: '', component: TemplatePortfolioComponent },
  { path: 'fill-form', component: FillFormComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
