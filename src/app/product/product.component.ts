import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
@Input() view: 'grid' | 'list' | 'currcartitem' | 'prevcartitem' = 'grid';
constructor() {}

ngOnInit(): void {

}
}
