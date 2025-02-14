import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, FormsModule],
  providers: [AuthService], // Adicione esta linha
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    try {
      const user = await this.authService.login(this.email, this.password);
      Swal.fire({
        title: 'Logado com sucesso!',
        icon: 'success',
        draggable: true,
        footer: 'Bem-vindo, ' + user.name,
      });
      this.router.navigate(['/home']); // Redirecionar após login
    } catch (error) {
      alert('Erro ao fazer login!');
    }
  }
}
