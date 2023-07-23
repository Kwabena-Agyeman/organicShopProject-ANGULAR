import { NgModule, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { redirectUnauthorizedTo, AuthGuard } from '@angular/fire/auth-guard';
import { map, tap } from 'rxjs/operators';
import { User } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';

const redirectUnauthorizedToLogin = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.user$.pipe(
    map((user) => {
      if (user) return true;

      router.navigate(['/login']);
      return false;
    })
  );
};

const adminOnly = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const userService = inject(UserService);
  return authService.user$.pipe(
    map((user) => {
      if (user) {
        return user.uid;
      } else {
        return false;
      }
    }),
    map((uid) => {
      if (typeof uid === 'string') {
        userService.getUserDoc(uid).subscribe(
          (data) => {
            const isAdmin: boolean = data?.['isAdmin'];
            if (isAdmin) {
              return true;
            } else {
              router.navigate(['/']);
              return false;
            }
          },
          (error) => {
            console.error(error);
            router.navigate(['/']);
            return false;
          }
        );
      } else {
        router.navigate(['/login']);
        return false;
      }
      return;
    })
  );
};

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [redirectUnauthorizedToLogin],
  },
  { path: 'my/orders', component: MyOrdersComponent },
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [adminOnly],
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [adminOnly],
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [adminOnly],
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [adminOnly],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
