import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/shared.module';
import { TimelineModule } from './components/timeline/timeline.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './components/core/core.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { AscentsService } from './services/ascents.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ascentsReducers } from './store/reducers/ascents.reducers';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { LoadAscentDataEffectService } from 'app/store/effects/ascents/load-ascent-data-effect.service';
import { AddAscentEffectService } from 'app/store/effects/ascents/add-ascent-effect.service';
import { CragsService } from 'app/services/crags.service';
import { TypeaheadService } from 'app/shared/components/typeahead/typeahead.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    StoreModule.forRoot(ascentsReducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([LoadAscentDataEffectService, AddAscentEffectService]),
    BrowserModule,
    HttpModule,
    SharedModule,
    TimelineModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    AscentsService,
    CragsService,
    TypeaheadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
