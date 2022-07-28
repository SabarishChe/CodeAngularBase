import { Injectable } from '@angular/core';
import { UserSession } from '../model/usersession';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  session = new UserSession();
  localStorageSessionKey: string;
  filterArr: any[];

  constructor() { 
    this.localStorageSessionKey = 'sabarish-' + environment.apiBaseUrl + '-AuthData';
  }


  create(session: any) {// jshint ignore:line
    this.setLocalStorageProperties(session);
  }

  destroy() {// jshint ignore:line
    this.setLocalStorageProperties(new UserSession());
    localStorage.removeItem('role');
    localStorage.clear();
  }

  load() { // jshint ignore:line
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData;
  }

  authToken() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).authToken;
  }

  userId(): number {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? 0 : +JSON.parse(jsonData).userId;
  }

  getUserName() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).userFullName;
  }

  roleId(): number {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? 0 : +JSON.parse(jsonData).roleId;
  }

  roleName() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).roleName;
  }


  getClientId() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? [] : JSON.parse(jsonData).clientId;
  }


  getEmail() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? [] : JSON.parse(jsonData).email;
  }

  getLanguageType() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? [] : JSON.parse(jsonData).languageType;
  }


  setLocalStorageProperties(session: any) {// jshint ignore:line
    localStorage.setItem(this.localStorageSessionKey, JSON.stringify(session));
  }

  getLocalStorageWithKey(key: any) {// jshint ignore:line
    return localStorage.getItem(key);
  }

  setLocalStorageWithKey(key: any, session: any) {// jshint ignore:line
    localStorage.setItem(key, JSON.stringify(session));
  }

  isDynamicPassword() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData);
  }

  // getPageUrl(key: any){
  //   this.filterArr = [];
  //   const menu = JSON.parse(this.getLocalStorageWithKey('menucontrols'))
  //   const filterItems = menu.map(e => {
  //   e.submenu.forEach(element => {
  //     this.filterArr.push(element);
  //   });
  //   });
  //   const output = this.filterArr.find(e=>{
  //     return e.path === key;
  //   })
  //   return output.controlAccess;
  // }

}
