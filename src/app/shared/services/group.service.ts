/* * * ./app/comments/services/comment.service.ts * * */
// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {Angular2TokenService} from "angular2-token";


// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GroupService {
    
     constructor (private http: Http,private authToken: Angular2TokenService) {}

     createGroup(code: string ,title: string ){
        console.log(code,title)
        //return this.http.post("http://localhost:3000/api/groups", {code: code ,title: title}, options) // ...using post request
        return this.authToken.post('/groups', {code: code ,title: title})
     }

     joinGroup(code: string){
        console.log(code)
        return this.authToken.post('join', {code: code })
     }
     getGroups(){
        return this.authToken.get('groups')
     }
     postQuestion(g_id:number,q_content:string){
         console.log("posting question ......")
         return this.authToken.post('groups/'+g_id+'/questions',{content: q_content,group_id:g_id})
     }
     getQuestionsForGroup(g_id){
        console.log("getting questions ......")
        return this.authToken.get('groups/'+g_id+'/questions')
     }
     postAnswer(question,a_content){
        console.log("posting answer . .... ")
        return this.authToken.post('groups/'+question.group_id+'/questions/'+question.id+'/answers',{content:a_content,question_id:question.id})
     }
    
     getAnswersForQuestion(question){
        console.log("getting answers ")
        return this.authToken.get('groups/'+question.group_id+'/questions/'+question.id+'/answers')
     }
     /*
     // private instance variable to hold base url
     private commentsUrl = 'http://localhost:3000/api/comments'; 
     // Fetch all existing comments
     getComments(){

        // ...using get request
        return this.http.get(this.commentsUrl)
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
    }
    // Add a new comment
    addComment (body: Object): Observable<Comment[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.commentsUrl, body, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   

    // Update a comment
    updateComment (body: Object): Observable<Comment[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.put(`${this.commentsUrl}/${body['id']}`, body, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   

    // Delete a comment
    removeComment (id:string): Observable<Comment[]> {
        return this.http.delete(`${this.commentsUrl}/${id}`) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   
    */

}
