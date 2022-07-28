import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../../layout/directives/directives.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSelectFilterModule } from 'mat-select-filter';


const routes: Routes = [

  {
    path:'',
    component: AuthComponent,
    children : [
      {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'register',
        component:RegisterComponent
      }
    ]
  }

]



@NgModule({
  declarations: [LoginComponent, AuthComponent, RegisterComponent],
  providers: [AuthenticationService],
  imports: [
    CommonModule,
    NgbModule,
    MatDialogModule,
    TranslateModule,
    FormsModule,
    DirectivesModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatSelectFilterModule,
  ]
})
export class AuthModule { }
