import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FillFormComponent } from './pages/fill-form/fill-form.component';
import { AppRoutingModule } from './app-routing.module';
import { TemplatePortfolioComponent } from './pages/template-portfolio/template-portfolio.component';
import { HttpClientModule } from '@angular/common/http';
import { InitPortifolioGeneratorComponent } from './pages/init-portifolio-generator/init-portifolio-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    FillFormComponent,
    TemplatePortfolioComponent,
    InitPortifolioGeneratorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
