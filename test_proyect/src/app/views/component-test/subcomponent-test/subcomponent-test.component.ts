import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-subcomponent-test',
  templateUrl: './subcomponent-test.component.html',
  styleUrls: ['./subcomponent-test.component.scss']
})
export class SubcomponentTestComponent implements OnInit {

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
  }


  @Input() data = {
    title: '',
    description: '',
    price: '',
    image: ''
  };

  addCart() {
    this.cartService.addProduct(this.data);
  }
}
