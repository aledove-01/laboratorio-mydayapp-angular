import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TaskComponent } from './components/task/task.component';
import { FooterComponent } from './components/footer/footer.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { FormsModule } from '@angular/forms';
import { LocalBDService } from './services/local-bd.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskComponent,
    FooterComponent,
    AutofocusDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [LocalBDService],
  bootstrap: [AppComponent],
})
export class AppModule {}
