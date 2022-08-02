import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, interval, Observable, of, Subscription } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';
import { UserService } from '../../service/user.service';

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  imageUrl: string;
  phone: string;
  website: string;
  company: Company;
}


@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css']
})
export class AComponent implements OnInit {

  users$: Observable<User[]>
  posts$: Observable<{ id: number; name?: string }[]>;

  data$


  constructor(
    private userService: UserService
  ) {
    this.users$ = this.userService.getUsers().pipe(
      delay(3000),
      map(users => users.map((user, i) => {
        return {
          ...user,
          imageUrl: `https://avatars.dicebear.com/api/female/${i}.svg`
        }
      })))


    this.posts$ = of([{ id: 1, name: 'post one' }, { id: 2, name: 'post two' }]).pipe(
      delay(2000)
    )


    this.data$ = combineLatest([
      this.users$,
      this.posts$
    ]).pipe(
      map(([users, posts]) => {
        return {
          users,
          posts
        }

      })
    )
  }

  ngOnInit(): void {
  }
}
