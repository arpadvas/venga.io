// import core angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// import custom modules
import { SharedModule } from './shared/shared.module';
import { ProfileModule } from './components/profile/profile.module';
import { AppRoutingModule } from './app-routing.module';

// import components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegFormComponent } from './components/reg-form/reg-form.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ActivateComponent } from './components/activate/activate.component';

// import services
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { ActiveGuard } from './guards/active.guard';
import { NotActiveGuard } from './guards/notActive.guard';
import { ProfileService } from './services/profile.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TimelineComponent,
    LoginFormComponent,
    RegFormComponent,
    SpinnerComponent,
    ActivateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SharedModule,
    ProfileModule,
    AppRoutingModule
  ],
  providers: [
    AuthService, 
    AuthGuard, 
    NotAuthGuard, 
    ActiveGuard, 
    NotActiveGuard, 
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
