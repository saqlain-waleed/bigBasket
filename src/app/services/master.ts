import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel, Customer } from '../model/Product';


@Injectable({
  providedIn: 'root'
})
export class Master {

  constructor(private http: HttpClient) { }

  apiUrl: string = "/api/BigBasket/";

  getAllProducts(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(this.apiUrl + "GetAllProducts")

  }

  getAllCategories(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(this.apiUrl + "GetAllCategory")

  }


  getProductByCategoryId(categoryId: number): Observable<APIResponseModel> {
    const url = `${this.apiUrl}GetAllProductsByCategoryId?id=${categoryId}`
    return this.http.get<APIResponseModel>(url)

  }



  registerNewCustomerName(obj: Customer): Observable<APIResponseModel> {
    const url = `${this.apiUrl}RegisterCustomer`
    return this.http.post<APIResponseModel>(url, obj)

  }

}
