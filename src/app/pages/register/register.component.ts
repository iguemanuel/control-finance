import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService) {}

  async onRegister() {
    if (this.password !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'As senhas não estão iguais!',
        text: 'Tente novamente.',
      });
      return;
    }

    try {
      const user = await this.authService.register(
        this.name,
        this.email,
        this.password
      );
      console.log('Usuário cadastrado:', user);

      Swal.fire({
        title: 'Cadastro realizado com sucesso!',
        icon: 'success',
        draggable: true,
        footer: `Agora você pode realizar o login. <a href="/login">Clique aqui</a>`,
      });
    } catch (error) {
      console.error('Erro no cadastro:', error); // Log do erro

      Swal.fire({
        icon: 'error',
        title: 'Algo deu errado!',
        text: 'Tente novamente.',
      });
    }
  }
}
