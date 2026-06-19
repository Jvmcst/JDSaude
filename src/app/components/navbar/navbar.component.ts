import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isScrolled = signal(false);

  constructor(private auth: AuthService, private router: Router) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 10);
  }

  closeMenu(): void {}

  estaAutenticado(): boolean {
    return this.auth.estaAutenticado();
  }

  sair(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}