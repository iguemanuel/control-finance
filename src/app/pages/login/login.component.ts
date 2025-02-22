import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, FormsModule],
  providers: [AuthService],
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
      // Redireciona para o dashboard e passa o ID do usuário na URL
      this.router.navigate(['/dashboard', user.id]);
    } catch (error) {
      if (this.email === '' || this.password === '') {
        Swal.fire({
          icon: 'error',
          title: 'Preencha todos os campos!',
          text: 'E-mail e senha são obrigatórios.',
        });
      }
      if (this.email !== '' && this.password !== '') {
        Swal.fire({
          icon: 'error',
          title: 'E-mail ou senha incorretos!',
          text: 'Tente novamente.',
        });
      }
    }
  }
}
