import { signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APIResponseModel, Customer } from './model/Product';
import { FormsModule } from '@angular/forms';
import { Master } from './services/master';
import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']

})
export class App {
  protected readonly title = signal('bigBasket');



  constructor(private masterService: Master) { }


  registerObj: Customer = new Customer();







  onRegister() {
    this.masterService.registerNewCustomerName(this.registerObj)
      .subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert("Registration successful");
          this.registerObj = new Customer();
        } else {
          alert(res.message);
        }
      });
  }

}
