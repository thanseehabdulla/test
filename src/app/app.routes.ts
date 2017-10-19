import {Routes} from "@angular/router";
import {LoginComponent} from "./login";
import {NoContentComponent} from "./no-content";
// import the required animation functions from the angular animations module
import {animate, style, transition, trigger} from "@angular/animations";
import {AdminModule} from './admin/admin.module'


export const fadeInAnimation =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('fadeInAnimation', [

    // route 'enter' transition
    transition(':enter', [

      // css styles at start of transition
      style({ opacity: 0 }),

      // animation and styles at end of transition
      animate('.3s', style({ opacity: 1 }))
    ]),
  ]);

export const ROUTES: Routes = [
  { path: '',      component: LoginComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'admin',  loadChildren: './admin#AdminModule'},
  { path: '**',    component: NoContentComponent }
];
