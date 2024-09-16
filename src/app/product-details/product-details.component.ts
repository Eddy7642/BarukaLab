import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { Product } from '../models/models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  imageIndex: number = 1;
  product!: Product;
  reviewControl = new FormControl('');
  showError = false;
  reviewSaved = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public utilityService: UtilityService
  ) {}

  ngOnInit() : void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let id = params.id;
      this.navigationService.getProduct(id).subscribe((res: any) => {
        this.product = res;

      });
    });
  }

  submitReview() {
    let review = this.reviewControl.value;

    if (review === '' || review === null) {
      this.showError = true;
      return;
    }
  }
}
