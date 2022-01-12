import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class GetApiService{
    constructor(private http:HttpClient){}
    private baseURL = 'http://localhost:8000/posts/'

    apiCall(){
        return this.http.get(this.baseURL)
    }

    createRecord(newRecord: object){
        return this.http.post(this.baseURL,newRecord)
    }
    deleteRecord(deleteID: number){
        return this.http.delete(this.baseURL+deleteID)
    }
    getEditRecord(editID: number){
        return this.http.get(this.baseURL+editID)
    }
    editRecord(editRecord: any){
        return this.http.put(this.baseURL+editRecord['id'],editRecord)
    }
}