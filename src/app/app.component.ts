import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="app-layout">
      <app-navbar />
      <main class="main-content">
        <div class="page-container page-enter">
          <router-outlet />
        </div>
      </main>
      <app-footer />
    </div>
  `,
})
export class AppComponent {
  title = 'JD Sistema de Saúde';
}
