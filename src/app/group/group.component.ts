import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Angular2TokenService} from "angular2-token";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogDataExampleDialog, CreateDialog } from '../home/home.component';



@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private router: Router,private authToken: Angular2TokenService,public dialog: MatDialog) { }

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
  joinGroup(){
    this.dialog.open(DialogDataExampleDialog, {});
  }
  createGroup(){
    this.dialog.open(CreateDialog, {});    
  }

}
