import { Component, OnInit } from '@angular/core';
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

  constructor(private postsService: PostsService) {

  }
  ngOnInit() {
    this.getPosts()
  }
  getPosts() {
    this.postsService.getPosts().subscribe(data => {
      this.posts = data
    })
  }
  addPost(title: string, textBody: string, likes: number) {
    const post = {
      title,
      textBody,
      likes
    }
    this.postsService.addPost(post).subscribe(data => {
      console.log("added ", post)
    })
    this.getPosts()


  }

  updatePost(id: number) {
    const titleId = document.getElementById(`title${id}`)
    titleId.removeAttribute('readOnly')

    const textId = document.getElementById(`text${id}`)
    textId.removeAttribute('readOnly')

    const likesId = document.getElementById(`likes${id}`)
    likesId.removeAttribute('readOnly')

    const editButton = document.getElementById(`edit${id}`)
    editButton.setAttribute('disabled', 'disabled')

    this.edit = true

    console.log(id)
  }

  putPost(id: number) {
    console.log(id)
  }

  deletePost(id: number) {
    console.log(id)

    this.postsService.deletePost(id).subscribe(res => {
      console.log(res)
    })
    this.getPosts()

  }

}
