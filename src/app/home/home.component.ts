import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Angular2TokenService} from "angular2-token";
import {GroupService} from "../shared/services/group.service"

import { Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [GroupService]
})
export class HomeComponent {
  title = 'home';
  groups = [];
  selectedGroup="";
  notf_val = "+"
  q_content=""
  constructor(private router: Router,public dialog: MatDialog,private authToken: Angular2TokenService,public g_service :GroupService){
  }
  ngOnInit() {
    this.authToken.validateToken().subscribe(
        res =>      console.log(res),
        error => {
          console.log(error)
          this.router.navigate(['']);
        }  
    );
    this.g_service.getGroups()
    .subscribe(
      res=>{
        this.groups = JSON.parse(res["_body"])
        console.log(this.groups )
      },
      error=>{
        console.log(error)
      }
    )

  }
  toggle_marker(){
    if(this.notf_val=="+")
      this.notf_val = "x"
    else
      this.notf_val = "+"
  }
  postQuestion(){
    console.log("entered postQuestion")
    console.log(this.selectedGroup)
    for (let group of this.groups) {
      if(this.selectedGroup==group.title){
        console.log("group matched")
        this.g_service.postQuestion(group.id ,this.q_content)
        .subscribe(
          res=>{
            console.log("question created : success")
            console.log(res)
          },
          error=>{
            console.log("question created : failure")
            console.log(error)
          }
        )
      }

    }
  }
  gotogroup(group){
    this.router.navigate(['groups/'+group.id]);
  }
  logout(){
    this.authToken.signOut().subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
    );
    this.router.navigate(['']);
  }
  joinGroup(){
      this.dialog.open(DialogDataExampleDialog, {});
  }
  createGroup(){
    this.dialog.open(CreateDialog, {});    

  }
}



// ---------------------------------  Dialog Components ---------------------------------------------------
@Component({
  selector: 'dialog-data-example-dialog',
  template: '<mat-form-field class="example-full-width"><input matInput [(ngModel)]="code" placeholder="Hash Code" >'+
  '</mat-form-field><button  (tap)="onNoClick()"   mat-raised-button color="primary">Join</button> ',
  providers: [GroupService]

})
export class DialogDataExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogDataExampleDialog>,public g_service :GroupService) {}
  code="";
  onNoClick(): void {

    this.g_service.joinGroup(this.code)  
    .subscribe(
      res=>{
        //this.authToken.currentAuthHeaders() = res.headers;
        console.log("joined group => success ")
        console.log(res)
      },
      error=>{
        console.log("joined group => failure ")
        console.log(error)
      }
    )


    this.dialogRef.close();
  }

}


@Component({
  selector: 'dialog-data-example-dialog',
  template: '<mat-form-field style="width:50%"><input [(ngModel)]="title"   matInput placeholder="Group Name" ></mat-form-field> '+
  '<mat-form-field style="width:50%"><input matInput [(ngModel)]="code"   placeholder="Hash Code" ></mat-form-field> '+
  '<button  (tap)="onNoClick()"   mat-raised-button color="primary">Create</button>',
  providers: [GroupService]
})
export class CreateDialog {
  constructor(public dialogRef: MatDialogRef<CreateDialog>,public g_service :GroupService,private authToken: Angular2TokenService) {}
  code = ""
  title = ""
  onNoClick(): void {
    console.log("at no click now")
    this.g_service.createGroup(this.code,this.title)  
    .subscribe(
      res=>{
        //this.authToken.currentAuthHeaders() = res.headers;
        console.log("created group => success ")
        console.log(res)
      },
      error=>{
        console.log("created group => failure ")
        console.log(error)
      }
    )

    this.dialogRef.close();

  }

}
// ---------------------------------  Dialog Components ---------------------------------------------------
