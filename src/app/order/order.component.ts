import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { Cart, Order, Payment, PaymentMethod } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  selectedPaymentMethodName = '';
  selectedPaymentMethod = new FormControl('0');

  address = '';
  mobileNumber = '';
  displaySpinner = false;
  message = '';
  classname = '';

  paymentMethods: PaymentMethod[] = [];

  usersCart!: Cart;
  usersPaymentInfo!: Payment;

  constructor(
    private navigationService: NavigationService,
    public utilityService: UtilityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize usersCart and usersPaymentInfo after utilityService is available
    const user = this.utilityService.getUser();

    this.usersCart = {
      id: 0,
      user: user,
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

    // Get Payment Methods
    this.navigationService.getPaymentMethods().subscribe((res) => {
      this.paymentMethods = res;
    });

    this.selectedPaymentMethod.valueChanges.subscribe((res: any) => {
      if (res === '0') this.selectedPaymentMethodName = '';
      else this.selectedPaymentMethodName = res.toString();
    });

    // Get Cart
    this.navigationService
      .getActiveCartOfUser(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersCart = res;
        this.utilityService.calculatePayment(res, this.usersPaymentInfo);
      });

    // Set address and phone number
    this.address = this.utilityService.getUser().address;;
    this.mobileNumber = this.utilityService.getUser().mobile;
  }

  getPaymentMethod(id: string) {
    let x = this.paymentMethods.find((v) => v.id === parseInt(id));
    return x?.type + ' - ' + x?.provider;
  }

  placeOrder() {
    this.displaySpinner = true;
    let isPaymentSuccessful = this.payMoney();

    if (!isPaymentSuccessful) {
      this.displaySpinner = false;
      this.message = 'Qualcosa è andato storto! Il pagamento non è andato a buon fine!';
      this.classname = 'text-danger';
      return;
    }

    let step = 0;
    const count = timer(0, 3000).subscribe(() => {
      ++step;
      if (step === 1) {
        this.message = 'Pagamento in corso';
        this.classname = 'text-success';
      } else if (step === 2) {
        this.message = 'Pagamento riuscito';
        this.classname = 'text-success';
        this.storeOrder();
      } else if (step === 3) {
        this.message = 'Il tuo ordine è stato effettuato';
        this.classname = 'text-success';
        this.displaySpinner = false;
      } else if (step === 4) {
        this.router.navigateByUrl('/home');
        count.unsubscribe();
      }
    });
  }

  payMoney() {
    return true;
  }

  storeOrder() {
    let payment: Payment;
    let pmid = 0;
    if (this.selectedPaymentMethod.value)
      pmid = parseInt(this.selectedPaymentMethod.value);

    payment = {
      id: 0,
      paymentMethod: {
        id: pmid,
        type: '',
        provider: '',
        available: false,
        reason: '',
      },
      user: this.utilityService.getUser(),
      totalAmount: this.usersPaymentInfo.totalAmount,
      shipingCharges: this.usersPaymentInfo.shipingCharges,
      amountReduced: this.usersPaymentInfo.amountReduced,
      amountPaid: this.usersPaymentInfo.amountPaid,
      createdAt: '',
    };

    this.navigationService
      .insertPayment(payment)
      .subscribe((paymentResponse: any) => {
        payment.id = parseInt(paymentResponse);
        let order: Order = {
          id: 0,
          user: this.utilityService.getUser(),
          cart: this.usersCart,
          payment: payment,
          createdAt: '',
        };
        this.navigationService.insertOrder(order).subscribe((orderResponse) => {
          this.utilityService.changeCart.next(0);
        });
      });
  }
}

