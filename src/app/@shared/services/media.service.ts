import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Media } from '../models/media';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MediaService{

  constructor(public http: HttpClient) {
  }

  public getImages(): Observable<Media[]>{
    return this.http
      .get<Media[]>(`${environment.api}images`);
  }

  public getVideos(): Observable<Media[]>{
    return this.http
      .get<Media[]>(`${environment.api}videos`);
  }

  public getImage(id): Observable<Media[]>{
    return this.http
      .get<Media[]>(`${environment.api}image/${id}`);
  }

  public getVideo(id): Observable<Media[]>{
    return this.http
      .get<Media[]>(`${environment.api}video/${id}`);
  }

  public getAudio(id): Observable<Media[]>{
    return this.http
      .get<Media[]>(`${environment.api}audio/${id}`);
  }
}
