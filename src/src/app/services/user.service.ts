import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private dataService: DataService) { }

  logout(refresh: boolean) {
    return this.dataService.getData('/api/user/logout', refresh);
}

}
