import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  imports: [CommonModule],
})
export class CardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() customClass: string = '';
}
