import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Post } from '../app.component';
import { invalid } from '@angular/compiler/src/render3/view/util';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts(rows) {
    return this.http.get<Post[]>(`http://localhost:3000/posts/${rows}`)
  }
  getAllPosts() {
    return this.http.get<Post[]>(`http://localhost:3000/posts`)
  }

  addPost(post) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post("http://localhost:3000/posts", { title: post.title, textBody: post.textBody, likes: parseInt(post.likes) }, { headers });
  }

  deletePost(id: number) {
    return this.http.delete(`http://localhost:3000/posts/${id}`)
  }


  putPost(post): any {
    console.log(post)
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.put(`http://localhost:3000/posts/${post.id}`, { title: post.title, textBody: post.textBody, likes: parseInt(post.likes) }, { headers })
  }

  findPost(id: number) {
    return this.http.get<Post>(`http://localhost:3000/posts/${id}`)

  }
  postFile(fileToUpload: File) {
    const formData: FormData = new FormData(); //'Content-Type': 'file'
    const headers = new HttpHeaders().set('Content-Type', 'file')

    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(`http://localhost:3000/posts/file`, formData, { headers })

  }
}
