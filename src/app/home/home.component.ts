import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'home';
  constructor(private router: Router,public dialog: MatDialog){
  }
  gotogroup(){
    this.router.navigate(['groups']);
  }
  logout(){
    this.router.navigate(['']);
  }
  joinGroup(){
      this.dialog.open(DialogDataExampleDialog, {});
  }
  createGroup(){
    this.dialog.open(CreateDialog, {});    
  }
}


@Component({
  selector: 'dialog-data-example-dialog',
  template: '<mat-form-field class="example-full-width"><input matInput placeholder="Hash Code" ></mat-form-field><button  (tap)="onNoClick()"   mat-raised-button color="primary">Join</button> ',
})
export class DialogDataExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogDataExampleDialog>) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'dialog-data-example-dialog',
  template: '<mat-form-field style="width:50%"><input matInput placeholder="Group Name" ></mat-form-field> '+
  '<mat-form-field style="width:50%"><input matInput placeholder="Hash Code" ></mat-form-field> '+
  '<button  (tap)="onNoClick()"   mat-raised-button color="primary">Create</button>',
})
export class CreateDialog {
  constructor(public dialogRef: MatDialogRef<CreateDialog>) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

}