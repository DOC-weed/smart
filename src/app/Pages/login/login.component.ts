import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ServiceService } from '../../service/service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
strEmail: string;
strPassword: string;

  constructor(public service: ServiceService, public router: Router) { }

  ngOnInit() {
  	if(localStorage.getItem('token')){
  		this.router.navigateByUrl('home');

  	}
  }
  Login(myform: NgForm) {
    this.service.login(this.strEmail, this.strPassword);
    myform.reset();
  }

}
