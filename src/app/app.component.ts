import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter, map } from 'rxjs/operators';
/*import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { 

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(
    /*private storageService: StorageService, 
    private authService: AuthService,*/
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private router: Router
  ) { }

  ngOnInit(): void {

    /*this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }    

    this.setPageTitle();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });*/
  }

  /*private setPageTitle(): void {
    const defaultPageTitle = 'Star Wars';

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;

        if (!child) {
          return this.activatedRoute.snapshot.data['pageTitle'] || defaultPageTitle;
        }

        while (child.firstChild) {
          child = child.firstChild;
        }

        if (child.snapshot.data['pageTitle']) {
          return child.snapshot.data['pageTitle'] || defaultPageTitle;
        }
      })
    ).subscribe((title: string) => this.title.setTitle(title));
  }*/
}
