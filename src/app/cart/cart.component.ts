import { UtilityService } from './../services/utility.service';
import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { Cart, Payment } from '../models/models';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  usersCart!: Cart;
  usersPaymentInfo!: Payment;
  usersPreviousCarts: Cart[] = [];

  constructor(
    public utilityService: UtilityService,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    const user = this.utilityService.getUser();

    this.usersCart= {
      id: 0,
      user: this.utilityService.getUser(),
      cartItems: [],
      ordered: false,
      orderedOn: '',
    };

    this.usersPaymentInfo = {
      id: 0,
      user: user,
      paymentMethod: {
        id: 0,
        type: '',
        provider: '',
        available: false,
        reason: '',
      },
      totalAmount: 0,
      shipingCharges: 0,
      amountReduced: 0,
      amountPaid: 0,
      createdAt: '',
    };

    this.navigationService
      .getActiveCartOfUser(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersCart = res;

        this.utilityService.calculatePayment(
          this.usersCart,
          this.usersPaymentInfo
        );
      });

      this.navigationService
      .getAllPreviousCarts(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersPreviousCarts = res;
      });

  }
}
