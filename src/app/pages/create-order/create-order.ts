import { Component, OnInit } from '@angular/core';
import { Master } from '../../services/master';
import { APIResponseModel, CartData, OrderModel } from '../../model/Product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-order.html',
  styleUrl: './create-order.css'
})
export class CreateOrder implements OnInit {

  cartData: CartData[] = [];
  orderObj: OrderModel = new OrderModel();


  constructor(private masterService: Master) { }


  ngOnInit(): void {
    this.getCartItems();

  }


  getCartItems() {
    this.masterService.getCartByCustomerId(this.masterService.loggedUserData.custId).subscribe((res: APIResponseModel) => {
      this.cartData = res.data;

    });
  }

  getTotalQuantity(): number {
    return this.cartData.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartData.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);
  }


  placeOrder(){
    this.orderObj.custId = this.masterService.loggedUserData.custId;
    this.orderObj.totalInvoiceAmount = this.getTotalPrice();
    this.masterService.placeOrder(this.orderObj).subscribe((res:APIResponseModel)=>{
      if(res.result){
      alert("Order Placed Successfully");
      this.getCartItems();
      this.orderObj = new OrderModel();
      }else{
        alert(res.message)
      }

    })

  }


}
