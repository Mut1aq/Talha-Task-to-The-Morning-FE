import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-b',
  templateUrl: './b.component.html',
  styles: [
  ]
})
export class BComponent implements OnInit {
  @Input() posts: any[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
