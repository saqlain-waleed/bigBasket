import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Master } from '../../services/master';
import { APIResponseModel, CartModel, CategoryList, Customer, ProductList } from '../../model/Product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit {

  productList: WritableSignal<ProductList[]> = signal<ProductList[]>([]);
  categories: Observable<CategoryList[]> = new Observable<CategoryList[]>();


  constructor(private masterService: Master) {

  }



  ngOnInit(): void {
    this.loadAllProducts();
    this.loadAllCategories();
  }

  loadAllProducts() {
    this.masterService.getAllProducts().subscribe((res: APIResponseModel) => {
      this.productList.set(res.data);
    });
  }

  loadAllCategories() {
    this.categories = this.masterService.getAllCategories().pipe(
      map(res => [{ categoryId: 0, categoryName: 'All', parentCategoryId: 0, userId: null }, ...res.data])
    );
  }



  onAddToCart(id: number) {
    const newObj: CartModel = new CartModel();
    newObj.productId = id;
    newObj.custId = this.masterService.loggedUserData.custId;
    this.masterService.addToCart(newObj).subscribe((res: APIResponseModel) => {
      if(res.result){
        this.masterService.onCartAdded.next(true)
      }else{
        alert(res.message);
      }


    });

  }





  getProductByCategoryId(categoryId: number) {

    console.log('Selected Category ID:', categoryId); // categoryId check

    this.masterService.getProductByCategoryId(categoryId).subscribe((res: APIResponseModel) => {
      if (categoryId === 0) {
        this.loadAllProducts();
        console.log('Products response:', res); // server response check

      } else {
        console.log('Products response:', res); // server response check
        this.productList.set(res.data);
      }

    });
  }

}
