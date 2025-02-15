import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  // constructor(private route: Router, private authService: AuthService) {}
  // logout() {
  //   this.authService.logout();
  //   this.route.navigate(['/login']);
  // }
}
