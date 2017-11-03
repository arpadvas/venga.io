import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/shared.module';
import { TimelineModule } from './components/timeline/timeline.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './components/core/core.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoadUserDataEffectService } from './store/effects/load-user-data-effect.service';
import { AscentsService } from './services/ascents.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store/reducers';

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
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([LoadUserDataEffectService]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    AscentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
