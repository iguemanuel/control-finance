import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

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
    console.log('Email:', this.email);
    console.log('Senha:', this.password);
    try {
      const user = await this.authService.login(this.email, this.password);
      console.log('Usuário logado:', user);
      alert('Login realizado com sucesso!');
      this.router.navigate(['/home']); // Redirecionar após login
    } catch (error) {
      alert('Erro ao fazer login!');
    }
  }
}
