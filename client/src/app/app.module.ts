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

import { StoreModule, Action } from '@ngrx/store';
import { ApplicationState } from './store/application-state';
import { StoreData, INITIAL_STORE_DATA } from './store/store-data';
import { UiState, INITIAL_UI_STATE } from './store/ui-state';
import { ActionReducerMap } from '@ngrx/store';
import { GET_ASCENTS_ACTION, GetUserDataAction } from './store/actions';

export const reducers: ActionReducerMap<ApplicationState> = {
  storeData: storeDataReducer,
  uiState: uiStateReducer
};

function storeDataReducer(state: StoreData = INITIAL_STORE_DATA, action: Action): StoreData {

  switch (action.type) {
      case GET_ASCENTS_ACTION:
          return handleGetAscentsAction(state, action);

      default:
          return state;
  }
}

function uiStateReducer(state: UiState = INITIAL_UI_STATE, action: Action): UiState {
  
      return state;
  }

function handleGetAscentsAction(state: StoreData, action: GetUserDataAction): StoreData {
  const ascents = action.payload;
  const newState: StoreData = Object.assign({}, state);
  newState.ascents = ascents;
  return newState;
}

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
    StoreModule.forRoot(reducers)
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
