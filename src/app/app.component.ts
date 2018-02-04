import { Component } from '@angular/core';
import {Angular2TokenService} from "angular2-token";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  hide = true;
  constructor(private authToken: Angular2TokenService){
    //https://shielded-lowlands-81772.herokuapp.com/api
    this.authToken.init({apiBase: 'http://localhost:3000/api'}  )

  }

}
