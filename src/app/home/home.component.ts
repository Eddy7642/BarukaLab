
import { Component, OnInit } from '@angular/core';
import { SuggestedProduct } from '../models/models';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
suggestedProducts: SuggestedProduct[] = [
{
  banerimage: "",
  category: {
    id: 1,
    category: 'calzature',
    subcategory: 'scarpe'
  },
},
{
  banerimage: "",
  category: {
    id: 1,
    category: 'abbigliamento',
    subcategory: 'giubotti'
  },
},
{
  banerimage: "",
  category: {
    id: 1,
    category: 'accessori',
    subcategory: 'portachiavi'
  },
},
{
  banerimage: "",
  category: {
    id: 1,
    category: 'accessori',
    subcategory: 'calzolaio'
  },
}


];
constructor() {}

ngOnInit(): void {

}
}
