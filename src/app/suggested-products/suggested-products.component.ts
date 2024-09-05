import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../models/models';

@Component({
  selector: 'app-suggested-products',
  templateUrl: './suggested-products.component.html',
  styleUrl: './suggested-products.component.scss'
})
export class SuggestedProductsComponent implements OnInit {
  @Input() category: Category = {
    id: 0,
    category: '',
    subcategory: ''
  }
@Input() count: number = 3;
  constructor() {}

  ngOnInit(): void {

}
}
