import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'products',
    component: ProductsListComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products' },
];
