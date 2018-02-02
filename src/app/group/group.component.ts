import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Angular2TokenService} from "angular2-token";


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private router: Router,private authToken: Angular2TokenService) { }

  ngOnInit() {
    this.authToken.init({apiBase: 'http://localhost:3000/api'}  );
    this.authToken.validateToken().subscribe(
      res =>      console.log(res),
      error => {
        console.log(error)
        this.router.navigate(['']);
      }  
  );
  }
  dosomething(){
    this.router.navigate(['']);
  }

}
