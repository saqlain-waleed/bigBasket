import { Component, OnInit } from '@angular/core';
import { APIResponseModel, saleItemsData } from '../../model/Product';
import { map, Observable } from 'rxjs';
import { Master } from '../../services/master';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css'
})
export class MyOrders implements OnInit {


  saleItemData: Observable<saleItemsData[]> = new Observable<saleItemsData[]>();


  constructor(private masterService: Master) { }


  ngOnInit(): void {
    this.loadSaleItemsData();

  }



loadSaleItemsData() {
  this.saleItemData = this.masterService.getSaleItemsByCustomerId(
    this.masterService.loggedUserData.custId
  ).pipe(
    map((res: APIResponseModel) => {
      if (res.result) {
        return res.data;  
      } else {
        alert(res.message);
        return [];  
      }
    })
  );
}

}
