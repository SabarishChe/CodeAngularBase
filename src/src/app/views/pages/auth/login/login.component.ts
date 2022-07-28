import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavigationService } from 'src/app/services/navigation.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  userName: any;
  password: any;
  show: boolean;

  constructor(private formBuilder: FormBuilder,
    public navigationService:NavigationService,
    private alertService: AlertService,
    private userIdle: UserIdleService,
    private navigation: NavigationService,
    private authService: AuthenticationService,
    private router: Router,) { }

  ngOnInit(): void {

    this.initializeValidators();
  }

  initializeValidators() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password:['', [Validators.required]],
    });
  }


  passwordclick() {
    this.show = !this.show;
  }

  goToRegister(){
    this.navigationService.goToRegister();
  }

  onLogin() {
    debugger
    if (this.loginForm.valid) {
      this.authService.clearSession();
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password, true).subscribe((res: { failures: string | any[]; issystem_generated: boolean; }) => {
        if (res && res.failures && res.failures.length > 0) {
          if (res.failures[0].toString().includes('Unauthorized user')) {
            swal.fire({
              title: 'Confirmation',
              text: 'Another user logged in to your account, You want to force login',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
            }).then((result) => {
              if (result.value) {
                this.confirmLogout();
              }
            })
          } else
            this.alertService.error(res.failures[0]);
        }
        else if (res) {
          debugger
          if (res.issystem_generated == true) {
          } else {
            this.userIdle.onTimerStart().subscribe(count => {
            });
            this.userIdle.onTimeout().subscribe(() => {
              this.userIdle.stopTimer();
              this.userIdle.stopWatching();
              this.authService.logOut();
              this.navigation.goToLogin();
              localStorage.setItem('isLoggedin', 'true');
              this.router.navigate(['/dashboard']);
            });
            localStorage.setItem('isLoggedin', 'true');
              this.router.navigate(['/dashboard']);
          }
        }
      });
    } else {
      this.validateFormControl();
    }
  }

  


  confirmLogout() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password, true).subscribe((result: { failures: string | any[]; issystem_generated: boolean; }) => {
      if (result && result.failures && result.failures.length > 0) {
        this.alertService.error(result.failures[0]);
      }
      else if (result) {
        debugger
        if (result.issystem_generated == true) {
        } else {
          this.userIdle.onTimerStart().subscribe(count => {
          });
          this.userIdle.onTimeout().subscribe(() => {
            this.userIdle.stopTimer();
            this.userIdle.stopWatching();
            this.authService.logOut();
            this.navigation.goToLogin();
          });
        }
      }
    });
  }

  validateFormControl() {
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }

}
