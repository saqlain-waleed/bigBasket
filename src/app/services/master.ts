import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { APIResponseModel, CartData, CartModel, Customer, LoginModel, OrderModel, updateProfile } from '../model/Product';


@Injectable({
  providedIn: 'root'
})
export class Master {
  cartData: CartData[] = [];

  loggedUserData: Customer = new Customer();


  constructor(private http: HttpClient) {
    const isUser = localStorage.getItem('logincustomer');
    if (isUser != null) {
      const parseObj = JSON.parse(isUser);
      this.loggedUserData = parseObj;
      this.getCartItems();

    }
  }

  apiUrl: string = "/api/BigBasket/";


  onCartAdded: Subject<boolean> = new Subject<boolean>();



  getCartItems() {
    this.getCartByCustomerId(this.loggedUserData.custId).subscribe((res: APIResponseModel) => {
      this.cartData = res.data;

    });
  }


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

  updateProfile(obj: updateProfile): Observable<APIResponseModel> {
    const url = `${this.apiUrl}UpdateProfile`
    return this.http.put<APIResponseModel>(url, obj)

  }

  registerNewCustomerName(obj: Customer): Observable<APIResponseModel> {
    const url = `${this.apiUrl}RegisterCustomer`
    return this.http.post<APIResponseModel>(url, obj)

  }



  onLogin(obj: LoginModel): Observable<APIResponseModel> {
    debugger;

    const url = `${this.apiUrl}Login`
    return this.http.post<APIResponseModel>(url, obj)

  }


  addToCart(obj: CartModel): Observable<APIResponseModel> {
    const url = `${this.apiUrl}AddToCart`
    return this.http.post<APIResponseModel>(url, obj)

  }



  getCartByCustomerId(loggedUserId: number): Observable<APIResponseModel> {
    const url = `${this.apiUrl}GetCartProductsByCustomerId?id=${loggedUserId}`
    return this.http.get<APIResponseModel>(url)

  }


  deleteCartProduct(cartId: number): Observable<APIResponseModel> {
    const url = `${this.apiUrl}DeleteProductFromCartById?id=${cartId}`
    return this.http.get<APIResponseModel>(url)

  }


  placeOrder(obj: OrderModel): Observable<APIResponseModel> {
    const url = `${this.apiUrl}PlaceOrder`
    return this.http.post<APIResponseModel>(url, obj)

  }


  getSaleItemsByCustomerId(customerId: number): Observable<APIResponseModel> {
    const url = `${this.apiUrl}GetAllSaleByCustomerId?id=${customerId}`
    return this.http.get<APIResponseModel>(url)

  }



}
