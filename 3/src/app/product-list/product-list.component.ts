import { Component } from '@angular/core';
import { products } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  products = products;
  share(product: any) {
    window.alert('Поділитися: ' + product.name);
  }
  onNotify(message: string) {
    window.alert(message);
  }
}
