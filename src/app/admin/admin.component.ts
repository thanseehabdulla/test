import {Component, OnInit} from "@angular/core";
import {Services} from "./services";
import {Router} from "@angular/router";
import "jquery";

import "datatables.net";
import {API} from "../api_config/api_config";

@Component({

  selector: 'admin',  // <home></home>

  providers: [
    Services
  ],

  styleUrls: ['./admin.component.css'],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  billArrayList: any;
  billno: any;
  partyname: any;
  sitename: any;
  gstn: any;
  address: any;
  id: any;
  item: any;
  quantity: any;
  rate: any;
  total: any;
  totalwithtax: any;
  edits: boolean;
  userArrayList: any;
  phone: any;
  email: any;
  username: void;
  private admin: boolean;
  private homedata: string;
  private password: string;
  private cpassword: String


  constructor(public services: Services, private router: Router) {

  }

  public ngOnInit() {
    if (localStorage.getItem('User') === 'admin') {
      this.admin = true;
      this.router.navigate(['/admin']);
      this.loadUserData();
    } else if (localStorage.getItem('User') === 'adminBill') {
      this.router.navigate(['/admin']);
      this.admin = false;
    } else {
      this.admin = false;
      this.router.navigate(['/login']);
    }

  }

  public ngAfterViewInit() {

  }


  public logOut() {
    localStorage.removeItem('User');
    this.router.navigate(['/login']);
  }


  public reinitvalues() {
    this.edits = this.phone = this.username = this.password = this.email = null;
  }


  /* visibility code for menus*/

  public clearAllViews() {
    let userDataTable = document.getElementById('userdatatable');
    userDataTable.style.display = 'none';
    let addUserData = document.getElementById('adduserdata');
    addUserData.style.display = 'none';
    let addBillData = document.getElementById('addbilldata');
    addBillData.style.display = 'none';
    let addItemData = document.getElementById('additemdata');
    addItemData.style.display = 'none';
    this.reinitvalues();
  }


  public home() {
    this.homedata = 'Home';
    this.router.navigate(['/admin']);
    this.clearAllViews();
    let userDataTable = document.getElementById('userdatatable');
    userDataTable.style.display = 'block';
    this.loadUserData();
  }

  public addUserData() {
    this.clearAllViews();
    this.edits = false;
    let addUserData = document.getElementById('adduserdata');
    addUserData.style.display = 'block';
    this.homedata = 'Home / Add User ';
  }


  public submitUserForm() {
    if (this.cpassword === this.password) {
      let body = 'name=' + this.username + '&email=' + this.email + '&phone=' + this.phone + '&password=' + this.password;
      this.services.addData(API.API_ADDUSERDATA, 'accesstoken', body).subscribe((data) => {
          this.router.navigate(['/admin']);
        }, (error) => {
          console.log(error);
        }
      );
    }


  }

  public submitBillForm() {

      let body = 'billno=' + this.billno + '&partyname=' + this.partyname + '&sitename=' + this.sitename + '&gstn=' + this.gstn+'&address='+this.address+'&billid='+this.id+'&item='+this.item+'&quantity='+this.quantity+'&rate='+this.rate+'&total='+this.total+'&totalwithtax='+this.totalwithtax;
      this.services.addData(API.API_ADDBILLDATA, 'accesstoken', body).subscribe((data) => {
          this.router.navigate(['/admin']);
        }, (error) => {
          console.log(error);
        }
      );



  }


// load userdata data

  public loadUserData() {
this.services.getData(API.API_GETUSERDATA,'null').subscribe((data)=>{
  this.userArrayList = data;
}),
  ((error)=>{

})
    this.services.getData(API.API_GETBILLDATA,'null').subscribe((data)=>{
      this.billArrayList = data;
    }),
      ((error)=>{

      })
  }




  public print(id){

  }


  /* add bill data*/
  public addBillData() {
    this.clearAllViews();
    let addBillData = document.getElementById('addbilldata');
    addBillData.style.display = 'block';
    this.homedata = 'Home / Add Bill ';
  }


  /*Add item data*/
  public addItemData() {
    this.clearAllViews();
    let addItemData = document.getElementById('additemdata');
    addItemData.style.display = 'block';
    this.homedata = 'Home / Add Item ';
  }


  // edit button press
  public edit(id) {
    this.clearAllViews();
    let addUserData = document.getElementById('adduserdata');
    addUserData.style.display = 'block';
    this.loadSingleUserData(id);
    this.homedata = 'Home / Edit User ';
   this.edits =true;

  }

// load single datta on edit button press
  public loadSingleUserData(id) {
    this.services.getData(API.API_GETUSERDATA+id,'null').subscribe((data)=>{
      this.username = data.name;
      this.phone = data.phone;
      this.email = data.email;
      this.password = this.cpassword = data.password;
    },(error)=>{

    })

  }

// selector value chAnges
  public onChange(newValue) {


  }

  //  update the mahal form
  public updateUserData() {
    let body = 'name='+this.username+'&email='+this.email+'&phone='+this.phone+'&password='+this.password;
    this.services.updateData(API.API_UPDATEUSERDATA,'null',body).subscribe((error)=>{
      this.router.navigate(['/admin']);
    },(error)=>{

    })

  }

// remove mahal data based on id
  public remove(id) {
    this.services.deleteData(API.API_REMOVEUSERDATA+id,'null').subscribe((data)=>{
      this.router.navigate(['/admin'])
    },(error)=>{
      console.log(error)
    })
  }


}
