import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StatusBadgeComponent } from '../components/status-badge/status-badge.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    // Standalone components
    StatusBadgeComponent,
    NavbarComponent,
    FooterComponent,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    StatusBadgeComponent,
    NavbarComponent,
    FooterComponent,
  ],
})
export class SharedModule {}
