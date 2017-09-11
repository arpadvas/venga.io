// import core angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// import custom modules
import { SharedModule } from './shared/shared.module';
import { TimelineModule } from './components/timeline/timeline.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './components/core/core.module';

// import components
import { AppComponent } from './app.component';

// import services
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { ActiveGuard } from './guards/active.guard';
import { NotActiveGuard } from './guards/notActive.guard';
import { ProfileService } from './services/profile.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    TimelineModule,
    AppRoutingModule,
    CoreModule
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
