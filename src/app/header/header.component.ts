import { Component, OnInit } from '@angular/core';
import { NavigationItem } from '../models/models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  navigationList: NavigationItem[] = [
    {
      category: 'abbigliamento',
      subcategories: ['scarpe', 'giacche']
    },
    {
      category: 'accessori',
      subcategories: ['portachiavi', 'calzolaio']
    }, // add more categories as needed
  ];
  constructor() {}

  ngOnInit(): void {

  }
}

