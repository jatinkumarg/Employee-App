import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Position } from './position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private url = "https://sleepy-stream-11662.herokuapp.com";

  constructor(private http:HttpClient) { }

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.url}/positions`)
  }

  savePosition(Position) : Observable<any>{
    return this.http.put<any>(`${this.url}/position/`+ Position._id, Position);
  }

  getPosition(id) : Observable<Position[]> {
    return this.http.get<Position[]>(`${this.url}/position/`+ id);
  }
}
