
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
    subCategory: 'scarpe'
  },
},
{
  banerimage: "../../assets/Images/Baner/Baner giacche.jpg",
  category: {
    id: 1,
    category: 'abbigliamento',
    subCategory: 'giubotti'
  },
},
{
  banerimage: "../../assets/Images/Baner/Baner portachiavi.jpg",
  category: {
    id: 1,
    category: 'accessori',
    subCategory: 'portachiavi'
  },
},
{
  banerimage: "../../assets/Images/Baner/Baner calzolaio.jpg",
  category: {
    id: 1,
    category: 'accessori',
    subCategory: 'calzolaio'
  },
}


];
constructor() {}

ngOnInit(): void {

}
}
