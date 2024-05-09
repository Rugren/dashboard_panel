import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiServer } from "../apiServer";

@Injectable({
  providedIn: 'root'
})

export class EntityService {

  private apiUrl: string = apiServer.serverUrl;

  constructor(private http: HttpClient) { }

  getDatas(entityName: string) {
    return this.http.get(this.apiUrl + entityName)
  }

}