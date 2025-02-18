import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TransactionModalComponent } from './components/transaction-modal/transaction-modal.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard/:userId',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },

  { path: 'transaction', component: TransactionModalComponent },

  { path: 'sidebar', component: SidebarComponent },

  { path: '**', redirectTo: '/login' },
];
