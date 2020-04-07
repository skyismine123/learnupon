import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {UserListViewComponent} from './components/user-list-view/user-list-view.component';
import {CreateUserComponent} from './components/create-user/create-user.component';

const contentRoutes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'users', component: UserListViewComponent
  },
  {
    path: 'create-user', component: CreateUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(contentRoutes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {
}
