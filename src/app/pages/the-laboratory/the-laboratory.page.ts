import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { DefiApp, LabIntro } from 'src/app/models';
import { DefiTourComponent } from 'src/app/shared/components';
import { BehaviorSubject } from 'rxjs';
import { SolblazeFarmerService } from './strategies-builder/solblaze-farmer.service';

@Component({
  selector: 'app-the-laboratory',
  templateUrl: './the-laboratory.page.html',
  styleUrls: ['./the-laboratory.page.scss'],
})
export class TheLaboratoryPage implements OnInit {

  constructor(
    private nav: NavController,
    private _popoverController:PopoverController,
    private _solblazeFarmerService:SolblazeFarmerService
    ) { }

  async ngOnInit() {

    // init solblaze strategy APY
      const apy = (await this._solblazeFarmerService.getStrategyAPY()).strategyAPY
      this.labProduct[0].apy = apy

    // this.labProduct[0].userDeposit = userDeposit

  }
  public searchTerm: string = "";
  public searchItem(term: any) {
    this.searchTerm = term.value;
  }

  //strategy = defi protocol participate + 
  public labProduct: LabIntro[] = [
    // {
    //   id:1,
    //   strategy: 'marinade-plus',
    //   apy: 0,
    //   // description: `Simple strategy that stake your SOL with mariande platform, get mSOL in return, and deposit them on solend for extra MNDE reward`,
    //   defiParticipate: ['marinade','solend'],
    //   strategies: ['staking', 'liquidity provider'],
    //   rewardAsssets: ['/assets/images/icons/solana-logo.webp', '/assets/images/icons/marinade-logo-small.svg'],
    //   learnMoreLink: 'https://solana.org/stake-pools',
    //   active: true,
    //   riskLevel: 1,
    //   userDeposit: async () => (await this._marinadePlusService.getTotalBalance()).mSOL_holding > 0
    // },
    {
      id:2,
      strategy: 'solblaze-farmer',
      apy: 0,
      // description: `dual yield for farmerers, taking SOL and stake with bSOL, and deposit SOL & bSOL into metora bSOL-sol pool for additional APY`,
      defiParticipate: ['solblaze','meteora'],
      strategies: ['staking', 'farming', 'liquidity provider'],
      rewardAsssets: ['/assets/images/icons/solana-logo.webp', '/assets/images/icons/blze.png'],
      learnMoreLink: 'https://solana.org/stake-pools',
      active: true,
      riskLevel:2,
      userDeposit: null
    },
  ]
  public labProduct$: BehaviorSubject<LabIntro[]> = new BehaviorSubject(this.labProduct as LabIntro[]);

  public onSortChange(ev){
    const trigger = ev.detail.value
    const sortedLabProduct = this.labProduct.sort((p1,p2) => p1[trigger] > p2[trigger] ? -1 : 1
    );
    this.labProduct$.next(sortedLabProduct);
  }
  public goToStrategy(dapp: LabIntro) {
    this.nav.navigateForward('/the-laboratory/' +dapp.strategy)
  }

  public defiTour = [{
    title: 'welcome to SolanaHub Laboratory',
    description: `Don't let your hard-earned assets sit idle – let us empower you to reach new 1-click yield strategies! and btw, we do not involves any smart contract from our end`,
  },
  // 
  {
    title: 'Lab product',
    description: `Every product in our lab is crafted using the most reliable, audited, and verified DeFi protocols. Once we identify the most suitable strategy, we strive to seamlessly connect the dots, providing you with a 1-click yield strategy on your SOL`,
  },
  {
    title: 'Simplification',
    description: `While our primary goal is to maintain a 1-click strategy for your convenience, 
    we are equally enthusiastic about educating you on our methods, the process involved,
     the associated risks, and the underlying engagement with each protocol. 
     Our commitment is to ensure that you don't just "ape-in" blindly,
     but that you also "ape-up" by understanding the intricacies and nuances of the strategies we employ.`,

  },
  {
    title: 'DYOR',
    description: `We are dedicated to offering you the most powerful DeFi experience on Solana. 
    It is essential to note that our service operates solely as a 3rd-party aggregator service. 
    We do not have control over the activities that occur within the integrated protocols within our app.
     Therefore, we urge you to stay safe and always maintain your risk tolerance.`,
    button: 'see products',
  }

  ]

  async showLabTourSlide(e: Event) {
    const popover = await this._popoverController.create({
      component: DefiTourComponent,
      // event: e,
      componentProps:{defiTour:this.defiTour},
      alignment: 'start',
      cssClass: 'defi-tour-popup',
    });
    await popover.present();
  }

  showOnlyDeposit(ev){
    const showDepositsStrategy = ev.detail.checked;
    
    if(showDepositsStrategy){
      const filteredStrategies = this.labProduct.filter(p => p.userDeposit);
      this.labProduct$.next(filteredStrategies)
    }else{
      this.labProduct$.next(this.labProduct)
    }
  }
}
