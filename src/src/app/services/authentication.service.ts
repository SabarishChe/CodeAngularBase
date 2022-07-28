import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { UserSessionService } from './usersession.service';
import * as momenttz from 'moment-timezone';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserSession } from '../model/usersession';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

declare var require: any;
const timezone = require('src/assets/timezones.json');


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = environment.apiBaseUrl;
  timeZones: any[];
  sessionData = new UserSession();

  constructor(private sessionService: UserSessionService,
    private dataService: DataService,
    private http: HttpClient,) { 
      this.getTimeZones();
    }



  login(username: string, password: string, isLogin: boolean) {
    debugger
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
      });

    const timeZone = this.getBrowserTimeZone();
    const data = { username: username, password: password, appType: 3, ucode: timeZone, token: 'token', isForceLogout: isLogin, fcmToken: 'token' };
    return this.http.post<any>(this.baseUrl + '/api/token', data, { headers })
    .pipe(
      map(user => {
        if (user && user.accessToken) {
          this.clearCachedMenu();
          // const decodedToken = jwt_decode(user.accessToken);
          const decodedToken:any = jwt_decode(user.accessToken);
          this.sessionData.email = decodedToken['user.email'];
          this.sessionData.mobileNumber = decodedToken['user.mobilenumber'];
          this.sessionData.authToken = user.accessToken;
          this.sessionData.userId = decodedToken['user.id'];
          this.sessionData.roleId = decodedToken['user.roleId'];
          this.sessionData.roleName = decodedToken['user.rolename'];
          this.sessionData.userFullName = decodedToken['user.fullname'];
          this.sessionData.isDynamicPassword = decodedToken.referrence1 === 'True';
          this.sessionData.languageType = parseInt(decodedToken['user.languagetype']);
          this.sessionService.create(this.sessionData);
        }
        return user;
      })
    )
   
  }


  isAuthenticated() {
    return !!this.sessionService.userId() && !!this.sessionService.authToken();
  }

  hasRequiredPermission(permission: string | any[]) {
    for (let i = 0; i < permission.length; i++) {
      if (permission[i] === this.sessionService.roleId()) {
        return true;
      }
    }
    return false;
  }


  getTimeZones() {
    this.timeZones = timezone.timeZone;
  }

  getBrowserTimeZone(): string {
    const zoneName = momenttz.tz.guess();
    const temptimezone = momenttz.tz(zoneName).zoneAbbr();
    const filterZone = this.timeZones.find(i => i.abbr === temptimezone);
    if (filterZone) {
      return filterZone.value;
    }
    return '';
  }

  clearSession() {
    this.sessionService.destroy();
    this.clearCachedMenu();
  }

  clearCachedMenu() {
    this.dataService.clearCache();
  }

  logOut() {
    this.clearCachedMenu();
    this.sessionService.destroy();
  }

}
