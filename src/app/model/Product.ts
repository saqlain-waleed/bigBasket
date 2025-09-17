// ✅ Generic API Response
export interface APIResponseModel {
  message: string;
  result: boolean;
  data: any;
}

// ✅ Product List
export interface ProductList {
  productId: number;
  productSku: string;
  productName: string;
  productPrice: number;
  productShortName: string;
  productDescription: string;
  createdDate: Date;
  deliveryTimeSpan: string;
  categoryId: number;
  productImageUrl: string;
  categoryName: string;
}

// ✅ Category List
export interface CategoryList {
  categoryId: number;
  categoryName: string;
  parentCategoryId: number;
  userId: number | null;
}

// ✅ Customer Class
export class Customer {
  custId: number;
  name: string;
  mobileNo: string;
  password: string;

  constructor() {
    this.custId = 0;
    this.name = '';
    this.mobileNo = '';
    this.password = '';
  }
}

// ✅ Login Model
export class LoginModel {
  userName: string;
  userPassword: string;

  constructor() {
    this.userName = '';
    this.userPassword = '';
  }
}

// ✅ Cart Model
export class CartModel {
  cartId: number;
  custId: number;
  productId: number;
  quantity: number;
  addedDate: Date;

  constructor() {
    this.cartId = 0;
    this.custId = 0;
    this.productId = 0;
    this.quantity = 1;
    this.addedDate = new Date(); // set current date and time
  }
}

// ✅ Order Model
export class OrderModel {
  saleId: number;
  custId: number;
  saleDate: Date;
  totalInvoiceAmount: number;
  discount: number;
  paymentNaration: string;
  deliveryAddress1: string;
  deliveryAddress2: string;
  deliveryCity: string;
  deliveryPinCode: string;
  deliveryLandMark: string;
  isCanceled: boolean;

  constructor() {
    this.saleId = 0;
    this.custId = 0;
    this.saleDate = new Date();
    this.totalInvoiceAmount = 0;
    this.discount = 0;
    this.paymentNaration = '';
    this.deliveryAddress1 = '';
    this.deliveryAddress2 = '';
    this.deliveryCity = '';
    this.deliveryPinCode = '';
    this.deliveryLandMark = '';
    this.isCanceled = false;
  }
}

// ✅ Cart Data Interface
export interface CartData {
  cartId: number;
  custId: number;
  productId: number;
  quantity: number;
  productShortName: string;
  productName: string;
  categoryName: string;
  productImageUrl: string;
  productPrice: number;
  addedDate: Date;
}



export interface saleItemsData {
    saleId:             number;
    custId:             number;
    saleDate:           Date;
    totalInvoiceAmount: number;
    discount:           number;
    paymentNaration:    string;
    deliveryAddress1:   string;
    deliveryAddress2:   string;
    deliveryCity:       string;
    deliveryPinCode:    string;
    deliveryLandMark:   string;
    isCanceled:         boolean;
}



export class updateProfile {
    CustId:   number;
    Name:     string;
    MobileNo: string;
    Password: string;

    constructor(){
      this.CustId = 0;
      this.Name = "";
      this.MobileNo = "";
      this.Password = "";
    }
}

