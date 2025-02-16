import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StakeWithUsPageRoutingModule } from './stake-with-us-routing.module';

import { StakeWithUsPage } from './stake-with-us.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountsModule } from 'src/app/shared/layouts/accounts/accounts.module';
import { LoyaltyModule } from 'src/app/pages/stake-with-us/loyalty/loyalty.module';

@NgModule({
  imports: [
    SharedModule,
    AccountsModule,
    LoyaltyModule,
    StakeWithUsPageRoutingModule
  ],
  declarations: [
    StakeWithUsPage,

  ]
})
export class StakeWithUsPageModule { }
