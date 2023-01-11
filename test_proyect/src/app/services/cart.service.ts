import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private mycart: Object[] = [];

  private cartItems = new BehaviorSubject<Object[] | null>(null);
  cartItems$ = this.cartItems.asObservable();

  constructor() { }

  addProduct(data: Object) {
    this.mycart.push(data);
    this.cartItems.next(this.mycart);
  }
}
