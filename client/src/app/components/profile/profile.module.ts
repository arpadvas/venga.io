import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProfileService } from '../../services/profile.service';
import { BgPicComponent } from './bg-pic/bg-pic.component';
import { ProfilePicComponent } from './profile-pic/profile-pic.component';
import { ProfDescComponent } from './prof-desc/prof-desc.component';

@NgModule({
    declarations: [
        ProfileComponent,
        BgPicComponent,
        ProfilePicComponent,
        ProfDescComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        SharedModule
    ],
    providers: [
        ProfileService
    ]
})
export class ProfileModule {}