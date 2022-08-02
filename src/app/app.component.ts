import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsService } from './service/posts.service';
export interface Post {
  id: number,
  title: string,
  textBody: string,
  likes: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  edit: boolean = false
  posts: Post[] = []
  updatePost: Post
  rowCount
  // posts$: Observable<Post[]>

  constructor(private postsService: PostsService) {
    // this.posts$ = this.postsService.getPosts()
  }
  ngOnInit() {
    this.getPosts(3 || this.rowCount)
  }
  getPosts(rows) {
    this.postsService.getPosts(rows).subscribe((data) => {
      this.rowCount = rows
      this.posts = data[0] as any
    })
  }
  addPost(title: string, textBody: string, likes: number) {
    const post = {
      title,
      textBody,
      likes
    }
    this.postsService.addPost(post).subscribe(data => {
      this.getPosts(this.rowCount)

    })


  }

  putPost(id: number, title: string, textBody: string, likes: number) {
    console.log(id)

    this.updatePost = {
      id,
      title: title,
      textBody: textBody,
      likes: likes
    }

    this.postsService.putPost(this.updatePost).subscribe(data => {
      console.log(data)
      this.getPosts(this.rowCount)

    })

  }


  deletePost(id: number) {
    this.postsService.deletePost(id).subscribe(res => {
      console.log(res)
      this.getPosts(this.rowCount)

    })

  }


}
