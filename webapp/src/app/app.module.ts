import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FillFormComponent } from './pages/fill-form/fill-form.component';
import { AppRoutingModule } from './app-routing.module';
import { TemplatePortfolioComponent } from './pages/template-portfolio/template-portfolio.component';
import { SecondTemplatePortfolioComponent } from './pages/second-template-portfolio/second-template-portfolio.component';

@NgModule({
  declarations: [
    AppComponent,
    FillFormComponent,
    TemplatePortfolioComponent,
    SecondTemplatePortfolioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
