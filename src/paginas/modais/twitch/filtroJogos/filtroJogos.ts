import { Component, OnInit } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { twitchService } from '../../../../provedores/apiTwitch.service';
import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: "filtro-jogos",
  templateUrl: "filtroJogos.html"
})
export class FiltroJogosModal implements OnInit{
    public jogos: any;
  constructor(public navCtrl: NavController, public twitchService: twitchService, public viewCtrl: ViewController) { }

  ngOnInit(){
    registerLocaleData(localePtBr);
  }

  procurarJogo(name){
      this.twitchService.gamesByName(name).then((res) => {
        this.jogos = res.games
        console.log(this.jogos)
      })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
