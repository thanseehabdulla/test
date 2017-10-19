import {Component, OnInit} from "@angular/core";
import {Title} from "./services";
import {Router} from "@angular/router";
import "rxjs/add/operator/map";
import {API} from "../api_config/api_config";


@Component({
  selector: 'login',  // <home></home>
  providers: [
    Title
  ],
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public email: any;
  public password: any;


  constructor(public service: Title, private router: Router) {

  }

  public ngOnInit() {
    if (localStorage.getItem('User') === 'admin') {
      this.router.navigate(['/admin']);
    }else if (localStorage.getItem('User') === 'adminBill') {
      this.router.navigate(['/admin']);
    }else {
      this.router.navigate(['/login']);
    }
  }

  // on login button press
  public Login() {

    console.log('reached login');
    // if admin
    if (this.email === 'admin' && this.password === 'admin123') {
      // pre register admin
      localStorage.setItem('User', 'admin');
      this.router.navigate(['/admin']);

    }
    else
    {
     // this.service.attemptLogin(this.email,this.password).subscribe((data)=>{
       localStorage.setItem('User', 'adminBill');
       this.router.navigate(['/admin']);
     // })

    }
  }

}
