import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from '../service/posts.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../app.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input() posts: Post[] = []
  @Input() rowCount
  exportedPosts: Post[] = []

  fileToUpload: File | null = null;
  edit: boolean = true
  SERVER_URL = "http://localhost:3000/posts/file";
  uploadForm: FormGroup;

  myForm = new FormGroup({
    file: new FormControl(''),
    fileSource: new FormControl('')
  });

  constructor(private postsService: PostsService, private formBuilder: FormBuilder, private http: HttpClient) { }

  async exportCSV(exportedAmount) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')

    if (exportedAmount === 'allPosts') {
      this.exportedPosts = await this.postsService.getAllPosts().toPromise()
      console.log(this.exportedPosts);
      this.http.post('http://localhost:3000/posts/exportCSV', { posts: this.exportedPosts }, { headers })
        .subscribe(res => {
          console.log(res);
        })
    } else {
      this.exportedPosts = await this.postsService.getPosts(this.rowCount).toPromise()
      console.log(this.exportedPosts);
      this.http.post('http://localhost:3000/posts/exportCSV', { posts: this.exportedPosts[0] }, { headers })
        .subscribe(res => {
          console.log(res);
        })
    }


  }

  getPosts() {
    this.postsService.getPosts(this.rowCount).subscribe(data => {
      this.exportedPosts = data[0] as any
      console.log(this.exportedPosts)

    })
  }
  getAllPosts() {
    this.postsService.getAllPosts().subscribe(data => {
      this.exportedPosts = data as any
      console.log(this.exportedPosts)

    })
  }
  onFileChange(event) {
    this.edit = false

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource').value);
    this.http.post(this.SERVER_URL, formData)
      .subscribe(res => {
        console.log(res);
        return this.getPosts()
      })
  }


  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: new FormControl('file')
    });
  }


}
