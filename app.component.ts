import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatrixComponent } from "./matrix/matrix.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatrixComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'matrix_calculation';
}
