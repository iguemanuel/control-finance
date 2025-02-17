// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TransactionModalComponent } from '../../components/transaction-modal/transaction-modal.component';
import { CommonModule } from '@angular/common';
import { DashboardChartsComponent } from '../../components/dashboard-charts/dashboard-charts.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    SidebarComponent,
    CommonModule,
    DashboardChartsComponent,
    TransactionModalComponent,
    NavbarComponent,
  ],
})
export class DashboardComponent implements OnInit {
  userId: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId'); // Obtém o ID da URL
    console.log('User ID da URL:', this.userId);
  }
}
