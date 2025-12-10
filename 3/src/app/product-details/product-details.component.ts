import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from '../products';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  constructor(private route: ActivatedRoute, private cartService: CartService) {}
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('productId'));
    this.product = products[id];
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);
    window.alert('Додано в кошик: ' + product.name);
  }
}
