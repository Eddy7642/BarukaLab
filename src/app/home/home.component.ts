
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
  banerimage: '../../assets/Images/Baner/Baner scarpe.jpg',
  category: {
    id: 1,
    category: 'calzature',
    subcategory: 'scarpe'
  },
},
{
  banerimage: "../../assets/Images/Baner/Baner giacche.jpg",
  category: {
    id: 1,
    category: 'abbigliamento',
    subcategory: 'giubotti'
  },
},
{
  banerimage: "../../assets/Images/Baner/Baner portachiavi.jpg",
  category: {
    id: 1,
    category: 'accessori',
    subcategory: 'portachiavi'
  },
},
{
  banerimage: "../../assets/Images/Baner/Baner calzolaio.jpg",
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
