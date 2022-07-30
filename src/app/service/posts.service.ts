import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Post } from '../app.component';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<Post[]>('http://localhost:3000/posts')
  }

  addPost(post) {
    console.log(post)
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post("http://localhost:3000/posts", { title: post.title, textBody: post.textBody, likes: parseInt(post.likes) }, { headers });
  }

  deletePost(id: number) {
    return this.http.delete(`http://localhost:3000/posts/${id}`)
  }
}
