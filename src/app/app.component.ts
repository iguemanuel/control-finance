import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'control-finance';

  ngOnInit(): void {
    initFlowbite();
  }
}
