import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from "@angular/router";
import {Angular2TokenService} from "angular2-token";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogDataExampleDialog, CreateDialog } from '../home/home.component';
import { GroupService } from '../shared/services/group.service';
import { ActivatedRoute } from '@angular/router';
import { last } from 'rxjs/operator/last';



@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  providers: [GroupService]

})
export class GroupComponent implements OnInit {

  groups = [];
  selectedGroup="";
  notf_val = "+"
  c_g_title="";
  id: number;
  private sub: any;
  q_content="";
  a_content=""
  questions= []
  constructor(private route: ActivatedRoute,private router: Router,private authToken: Angular2TokenService,public dialog: MatDialog,public g_service :GroupService) { }

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
      for(let group of this.groups){
        if(group.id == this.id){
          this.c_g_title = group.title;
          console.log("found matching title")
        }
      }
    },
    error=>{
      console.log(error)
    }
  )
  

  this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log("current group id ",this.id)
      for(let group of this.groups){
        if(group.id == this.id){
          this.c_g_title = group.title;
          console.log("found matching title")
        }
      }
  });

  this.getQuestions()
  }
  getAnswersForQuestion(question){
    console.log("reached getting answers")
    this.g_service.getAnswersForQuestion(question)
    .subscribe(
      res=>{
        console.log("posted answer ; success")
        console.log(res["_body"])
        question.answers = JSON.parse(res["_body"])
        console.log(question.answers )

        for(let q of this.questions){
          if(q.id == question.id )
            q = question
        }
      },
      error=>{
        console.log("posted answer ; failure")
        console.log(error)
      }
    )
  }
  postAnswer(question){
    console.log("reached posting answer")
    this.g_service.postAnswer(question,this.a_content)
    .subscribe(
      res=>{
        console.log("posted answer ; success")
        console.log(res)
      },
      error=>{
        console.log("posted answer ; failure")
        console.log(error)
      }
    )
  }
  getQuestions(){
    this.g_service.getQuestionsForGroup(this.id)
    .subscribe(
      res=>{
        console.log("got questions : success")
        this.questions = JSON.parse(res["_body"])
        console.log(this.questions)

      },
      error=>{
        console.log("got questions : failure")
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
    console.log("entered post question")
    this.g_service.postQuestion(this.id,this.q_content)
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
  gotogroup(group){
    this.router.navigate(['groups/'+group.id]);
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
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
