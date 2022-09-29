import { StarshipsService } from './../starships/starships.service';
import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './../services/authentication.service';
import { Observable } from 'rxjs';
/*import { UserService } from '../_services/user.service';*/

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  content?: string;
  public starships: Observable<any> = this.starshipsService.getStarships();


  constructor(private authenticationService: AuthenticationService,
    private starshipsService: StarshipsService) { }

  ngOnInit(): void {
    /*this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });*/
  }

  logout(): void {
    this.authenticationService.logout();
  }

}
