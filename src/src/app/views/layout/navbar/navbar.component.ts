import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public translate: TranslateService,
    private navigationService: NavigationService,
    private authService: AuthenticationService,
    private userService: UserService,) { }

  ngOnInit(): void {
  }

    /**
   * Logout
   */
     onLogout(e: { preventDefault: () => void; }) {
      e.preventDefault();
      const title = this.translate.instant('LogoutConfirmation');
      const txt = this.translate.instant('Youwanttologout');
      const Yes = this.translate.instant('Yes');
      const No = this.translate.instant('No');
      swal.fire({
        title,
        text: txt,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: Yes,
        cancelButtonText: No,
      }).then((result) => {
        if (result.value) {
          debugger;
          this.userService.logout(true).subscribe((res: any) => {
            this.navigationService.goToLogin();
            this.authService.logOut();
          });
        }
      })
    }

}
