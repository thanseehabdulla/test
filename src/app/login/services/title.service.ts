import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {API} from '../../api_config/api_config';

@Injectable()
export class Title {

  constructor(public http: Http) {
  }

  public getData(url: any, accesstoken: any): any {
    let head2 = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + accesstoken
    });

    return this.http.get(url, {
      headers: head2
    })
      .map((res) => res.json());
  }

  public attemptLogin(email: any, password: any): any {
    let urlaccess = API.API_LOGIN;
    let body2 = 'username=' + email + '&password=' + password ;

    // let authdata = btoa('test' + ':' + 'secret');
    let head2 = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
      // 'Access-Control-Allow-Origin': '*',
      // 'Authorization': 'Basic ' + authdata
    });

    return this.http.post(urlaccess, body2, {headers: head2})
      .map((res) => res.json());
  }
}
