import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionModalComponent } from './transaction-modal.component';
import { FormsModule } from '@angular/forms';
import { TransactionModel } from '../../models/transaction';

describe('TransactionModalComponent', () => {
  let component: TransactionModalComponent;
  let fixture: ComponentFixture<TransactionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionModalComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta as mudanças no componente
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize transaction model with default values', () => {
    expect(component.transaction.name).toBe('');
    expect(component.transaction.type).toBe('IN');
    expect(component.transaction.category).toBe('');
    expect(component.transaction.value).toBe(0);
    expect(component.transaction.description).toBe('');
  });

  it('should call submitForm and log the transaction data', () => {
    spyOn(console, 'log'); // Espia o método console.log

    // Modifica alguns dados da transação para testar
    component.transaction.name = 'Venda Produto A';
    component.transaction.value = 100;
    component.transaction.category = 'Venda';
    component.transaction.type = 'IN';

    component.submitForm();

    // Verifica se o console.log foi chamado
    expect(console.log).toHaveBeenCalledWith({
      name: 'Venda Produto A',
      type: 'IN',
      category: 'Venda',
      value: 100,
      date: undefined,
      description: undefined,
    });
  });
});
