import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { TransactionModalComponent } from '../transaction-modal/transaction-modal.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [TransactionModalComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
