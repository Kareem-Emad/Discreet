import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  hide = true;
  constructor(private router: Router){
    
  }
  dosomething(){
    this.router.navigate(['']);
  }
}
