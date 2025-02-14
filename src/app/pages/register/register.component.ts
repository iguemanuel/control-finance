import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

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
      alert('As senhas não coincidem!');
      return;
    }

    try {
      const user = await this.authService.register(
        this.name,
        this.email,
        this.password
      );
      console.log('Usuário cadastrado:', user);
      alert('Cadastro realizado com sucesso!');
    } catch (error) {
      alert('Erro ao fazer cadastro!');
    }
  }
}
