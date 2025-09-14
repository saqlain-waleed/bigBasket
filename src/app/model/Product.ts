export interface APIResponseModel {
    message: string,
    result: boolean,
    data: any,
}



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


export interface CategoryList {
    categoryId: number;
    categoryName: string;
    parentCategoryId: number;
    userId: null;
}



export class Customer {
  CustId: number;
  Name: string;
  MobileNo: string;
  Password: string;

  constructor() {
    this.CustId = 0;
    this.Name = '';
    this.MobileNo = '';
    this.Password = '';
  }
}

