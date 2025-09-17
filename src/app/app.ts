// app.ts
import { OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { APIResponseModel, CartData, Customer, LoginModel } from './model/Product';
import { FormsModule } from '@angular/forms';
import { Master } from './services/master';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var bootstrap: any; // Bootstrap JS ke liye

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('bigBasket');

  constructor(private masterService: Master) { }

  registerObj: Customer = new Customer();
  loginObj: LoginModel = new LoginModel();
  loggedUserData: Customer = new Customer();

  // 🔹 Cart toggle ke liye variable
  showCart: boolean = false;
  cartData: CartData[] = [];


  removeFromCart(cartId: number) {
    this.masterService.deleteCartProduct(cartId).subscribe((res:APIResponseModel) =>{
      console.log("product removed");
      this.getCartItems();
    });
  }

  getTotalQuantity(): number {
    return this.cartData.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartData.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);
  }


  ngOnInit(): void {
    const isUser = localStorage.getItem('logincustomer');
    if (isUser != null) {
      const parseObj = JSON.parse(isUser);
      this.loggedUserData = parseObj;
      this.getCartItems();
    }

    this.masterService.onCartAdded.subscribe((res:boolean)=>{
      if(res){
        this.getCartItems();

      }

    })
  }





  // 🔹 Logout
  logout() {
    localStorage.removeItem('logincustomer');
    this.loggedUserData = new Customer();
    this.showCart = false; // logout ke time cart bhi close
    location.reload();
  }

  // 🔹 Register
  onRegister() {
    this.masterService.registerNewCustomerName(this.registerObj)
      .subscribe((res: APIResponseModel) => {
        if (res.result) {
          this.registerObj = new Customer();

          // Close the register modal
          const registerModal = document.getElementById('registerModal');
          if (registerModal) {
            const modal =
              bootstrap.Modal.getInstance(registerModal) ||
              new bootstrap.Modal(registerModal);
            modal.hide();
          }

          location.reload();

        } else {
          alert(res.message);
        }
      });
  }



  getCartItems() {
    this.masterService.getCartByCustomerId(this.loggedUserData.custId).subscribe((res: APIResponseModel) => {
      this.cartData = res.data;

    });
  }


  // 🔹 Login
  onLogin() {
    this.masterService.onLogin(this.loginObj)
      .subscribe((res: APIResponseModel) => {
        if (res.result) {
          localStorage.setItem("logincustomer", JSON.stringify(res.data));
          this.loginObj = new LoginModel();

          // Close the login modal
          const loginModal = document.getElementById('loginModal');
          if (loginModal) {
            const modal =
              bootstrap.Modal.getInstance(loginModal) ||
              new bootstrap.Modal(loginModal);
            modal.hide();
          }

          location.reload();

        } else {
          alert(res.message);
        }
      });
  }

  // 🔹 Cart toggle
  toggleCart() {
    this.showCart = !this.showCart;
  }
}
