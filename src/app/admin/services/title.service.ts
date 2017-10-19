import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class Services {

  public value = 'Angular 2';

  constructor(
    public http: Http
  ) {}

  public getData(url: any, accesstoken: any): any {
    let head2 = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
      // 'Authorization': 'Bearer ' + accesstoken
    });

    return this.http.get(url, {
      headers: head2
    })
      .map((res) => res.json());
  }

  public updateData(url: any, accesstoken: any, body2: any): any {
    let head2 = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
      // 'Authorization': 'Bearer ' + accesstoken
    });

    return this.http.put(url, body2, {headers: head2})
      .map((res) => res.json());
  }

  public deleteData(url: any, accesstoken: any): any {
    let head2 = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + accesstoken
    });

    return this.http.delete(url, {
      headers: head2
    })
      .map((res) => {
        return res.json();
      });
  }

  public addData(url: any, accesstoken: any, body2: any): any {
    let head2 = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
      // 'Authorization': 'Bearer ' + accesstoken
    });
    return this.http.post(url, body2, {headers: head2})
      .map((res) => res.json());
  }
}
