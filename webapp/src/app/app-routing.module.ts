import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FillFormComponent } from './pages/fill-form/fill-form.component';
import { RouterModule, Routes } from '@angular/router';
import { TemplatePortfolioComponent } from './pages/template-portfolio/template-portfolio.component';
import { InitPortifolioGeneratorComponent } from './pages/init-portifolio-generator/init-portifolio-generator.component';

const routes: Routes = [
  { path: '', component: InitPortifolioGeneratorComponent },
  { path: 'form/:action', component: FillFormComponent },
  { path: 'form/:action/:id', component: FillFormComponent },
  { path: 'template/:id', component: TemplatePortfolioComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
