import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Auth } from '../../../auth/auth';

@Component({
  selector: 'app-shell',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './shell.html',
  styleUrl: './shell.scss'
})
export class Shell {
  private auth = inject(Auth);
  
  protected userProfile$ = this.auth.userProfile$;
  
  protected logout(): void {
    this.auth.logout();
  }
}
