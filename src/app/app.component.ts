import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

//El modulo CommonModule es para los elements  ngIf, ngForm, ngCalss
//El modulo FormsModule es para los elements ngModel

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Aplicación De Calculadora';

  ans = '';
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    this.keyEvent(event);
  }

  keyEvent(event: KeyboardEvent) {
    let key = event.key;
    switch (key) {
      case '0': case '1': case '2': case '3': case '4':
      case '5': case '6': case '7': case '8': case '9':
        this.addNumber(key);
        break;
      case '+': case '-': case '*': case '/':
        this.addOperator(key);
        break;
      case 'Enter': // Para el botón igual
        this.calcOperation();
        break;
      case 'Escape': // Para el botón C
        this.clearAll();
        break;
      case 'Backspace': // Para el botón x
        this.clearDigits();
        break;
      case '.': // Para el botón del Punto .
        this.addOperator('.');
        break;
      default:
        // Ignorar cualquier otra tecla
        break;
    }
  }
  
  addOperator(op: string) {
    this.ans += op;
  }
  
  addNumber(num: string) {
    if (this.ans === '0') {
      this.ans = num;
    } else {
      this.ans += num;
    }
  }
  
  clearAll() {
    this.ans = '0';
  }
  
  clearDigits() {
    this.ans = this.ans.slice(0, -1);
  }
  
  calcOperation() {
    let result;
    if (this.ans.includes('+')) {
      const numbers = this.ans.split('+');
      if (numbers.length === 2) {
        let num1 = Number(numbers[0]);
        // Calculamos el IGV
        let num2 = numbers[1].includes('%') ? Number(numbers[1].slice(0, -1)) / 100 * num1 : Number(numbers[1]);
        // Calculamos la suma
        if (!isNaN(num1) && !isNaN(num2)) {
          result = num1 + num2;
        } else {
          console.log('Error en la suma');
        }
      }
    } else if (this.ans.includes('-')) {
      const numbers = this.ans.split('-');
      if (numbers.length === 2) {
        const num1 = Number(numbers[0]);
        const num2 = Number(numbers[1]);
        if (!isNaN(num1) && !isNaN(num2)) {
          result = num1 - num2;
        } else {
          console.log('Error en la resta');
        }
      }
    } else if (this.ans.includes('*')) {
      const numbers = this.ans.split('*');
      if (numbers.length === 2) {
        const num1 = Number(numbers[0]);
        const num2 = Number(numbers[1]);
        if (!isNaN(num1) && !isNaN(num2)) {
          result = num1 * num2;
        } else {
          console.log('Error en la multiplicación');
        }
      }
    } else if (this.ans.includes('÷') || this.ans.includes('/')) {
      const operator = this.ans.includes('÷') ? '÷' : '/';
      const numbers = this.ans.split(operator);
      if (numbers.length === 2) {
        const num1 = Number(numbers[0]);
        const num2 = Number(numbers[1]);
        if (!isNaN(num1) && !isNaN(num2)) {
          result = num1 / num2;
        } else {
          console.log('Error en la división');
        }
      }
    } else if (this.ans.endsWith('%')) {
      let num = Number(this.ans.slice(0, -1)) / 100;
      if (!isNaN(num)) {
        result = num;
      } else {
        console.log('Error en el porcentaje');
      }
    }
    this.ans = result !== undefined ? String(result) : this.ans;
  }
}
