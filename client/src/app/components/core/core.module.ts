// import angular core modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// import modules and components
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegFormComponent } from './reg-form/reg-form.component';

// import services
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../guards/auth.guard';

@NgModule({
    declarations: [
        HomeComponent,
        NavbarComponent,
        LoginFormComponent,
        RegFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        SharedModule
    ],
    providers: [
        AuthService, 
        AuthGuard
    ],
    exports: [
        AppRoutingModule,
        NavbarComponent
    ]
})
export class CoreModule {}