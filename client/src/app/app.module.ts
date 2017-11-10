import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/shared.module';
import { TimelineModule } from './components/timeline/timeline.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './components/core/core.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { LoadAscentDataEffectService } from './store/effects/load-ascent-data-effect.service';
import { AscentsService } from './services/ascents.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store/reducers';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AddAscentEffectService } from 'app/store/effects/add-ascent-effect.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([LoadAscentDataEffectService, AddAscentEffectService]),
    // EffectsModule.forRoot([LoadAscentDataEffectService]),
    BrowserModule,
    HttpModule,
    SharedModule,
    TimelineModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    AscentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
