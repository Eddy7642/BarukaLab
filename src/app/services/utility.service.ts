import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Product, User } from '../models/models';
import { Subject } from 'rxjs';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  changeCart = new Subject();

  constructor(
    private navigationService: NavigationService,
    private jwt: JwtHelperService) { }

  applyDiscount(price: number, discount: number): number {
    let finalPrice: number = price - price * (discount / 100);
    return finalPrice;
  }

   // JWT Helper Service : npm install @auth0/angular-jwt

   getUser(): User {
    let token = this.jwt.decodeToken();
    let user: User = {
      id: token.id,
      firstName: token.firstName,
      lastName: token.lastName,
      address: token.address,
      mobile: token.mobile,
      email: token.email,
      password: '',
      createdAt: token.createdAt,
      modifiedAt: token.modifiedAt,
    };
    return user;
  }

  setUser(token: string) {
    localStorage.setItem('user', token);
  }

  isLoggedIn() {
    return localStorage.getItem('user') ? true : false;
  }

  logoutUser() {
    localStorage.removeItem('user');
  }

  addToCart(product: Product) {
    let productid = product.id;
    let userid = this.getUser().id;

    this.navigationService.addToCart(userid, productid).subscribe((res) => {
      if (res.toString() === 'inserted') this.changeCart.next(1);
    });
  }
}
