import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  standalone: true
})
export class ButtonComponent {
  @Input() label: string = ''; // Propriedade para o texto do botão
}
