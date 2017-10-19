import { AdminComponent } from './admin.component';

export const routes = [
  { path: '', children: [
    { path: '', component: AdminComponent }
    // { path: 'adduser', loadChildren: './html#AddUserModule' }
  ]},
];
