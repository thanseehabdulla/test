import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MyDatePickerModule} from 'mydatepicker';
import {ApplicationRef, NgModule} from '@angular/core';
import {createInputTransfer, createNewHosts, removeNgStyles} from '@angularclass/hmr';
import {PreloadAllModules, RouterModule} from '@angular/router';
/*
 * Platform and Environment providers/directives/pipes
 */
import {ENV_PROVIDERS} from './environment';
import {ROUTES} from './app.routes';
// App is our top level component
import {AppComponent} from './app.component';
import {APP_RESOLVER_PROVIDERS} from './app.resolver';
import {AppState, InternalStateType} from './app.service';
import {LoginComponent} from './login';
import {NoContentComponent} from './no-content';
import {SelectModule} from 'ng2-select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import '../styles/styles.scss';
import '../styles/headings.css';
import {MomentModule} from 'angular2-moment';
import {Ng2DeviceDetectorModule} from 'ng2-device-detector';
import {ValidationMessagesModule} from 'ng2-custom-validation';
import {OnsenModule} from 'ngx-onsenui';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    NoContentComponent,

  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    MomentModule, BrowserAnimationsModule, Ng2DeviceDetectorModule.forRoot(), ValidationMessagesModule.forRoot(),
    MyDatePickerModule,
    FormsModule, OnsenModule,
    HttpModule, SelectModule,
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules})
  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(public appRef: ApplicationRef,
              public appState: AppState) {
  }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
