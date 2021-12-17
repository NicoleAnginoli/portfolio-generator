import { NgModule } from '@angular/core';
import { FillFormComponent } from './pages/fill-form/fill-form.component';
import { RouterModule, Routes } from '@angular/router';
import { TemplatePortfolioComponent } from './pages/template-portfolio/template-portfolio.component';
import { SecondTemplatePortfolioComponent } from './pages/second-template-portfolio/second-template-portfolio.component';

const routes: Routes = [
  { path: 'template/:id', component: TemplatePortfolioComponent },
  { path: 'fill-form', component: FillFormComponent },
  { path: 'template2', component: SecondTemplatePortfolioComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
