import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-component-test',
  templateUrl: './component-test.component.html',
  styleUrls: ['./component-test.component.scss']
})
export class ComponentTestComponent implements OnInit {

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }
  cartItems: any = [];

  data = [
    {
      title: 'Monitor',
      description: 'Monitor Ultra Grande Gamer',
      price: '100.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Mouse',
      description: 'Mouse Ultra Grande Gamer',
      price: '50.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Teclado',
      description: 'Teclado Ultra Grande Gamer',
      price: '80.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'CPU Ryzen 7',
      description: 'CPU Ultra Gamer',
      price: '2800.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    },
    {
      title: 'Parlantes',
      description: 'Parlantes Ultra Grandes Gamers',
      price: '120.00',
      image: 'https://www.cybermarket.pe/wp-content/uploads/2021/08/PC-Core-i7.jpg'
    }
  ]

}
