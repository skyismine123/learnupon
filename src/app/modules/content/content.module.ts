import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateUserComponent} from './components/create-user/create-user.component';
import {HomeComponent} from './components/home/home.component';
import {UserListViewComponent} from './components/user-list-view/user-list-view.component';
import {ContentRoutingModule} from './content-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    CreateUserComponent,
    HomeComponent,
    UserListViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ContentRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatSnackBarModule,
  ]
})
export class ContentModule {
}
