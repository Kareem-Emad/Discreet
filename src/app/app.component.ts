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
    /*
    this.authToken.init({apiBase: 'http://localhost:3000/api'}  );
    this.authToken.signIn({
      email:    'example@example.org',
      password: 'secretPassword'
  }).subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
  );
  */
  }

}
