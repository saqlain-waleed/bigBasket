import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIResponseModel, updateProfile } from '../../model/Product';
import { Master } from '../../services/master';

@Component({
  selector: 'app-update-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-profile.html',
  styleUrl: './update-profile.css'
})
export class UpdateProfile implements OnInit {

  constructor(private masterService: Master) { }

  profileObj: updateProfile = new updateProfile();

  ngOnInit(): void {

  }



  onUpdateProfile() {

    this.profileObj.CustId = this.masterService.loggedUserData.custId;
    this.masterService.updateProfile(this.profileObj).subscribe((res: APIResponseModel) => {
      if (res.result) {

        alert("profile updated successfully");
      }
      else {
        alert(res.message)
      }
    })


  }

}
