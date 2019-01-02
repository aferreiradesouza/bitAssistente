import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { twitchService } from '../../../../provedores/apiTwitch.service';
import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: "jogo-pagina",
  templateUrl: "jogo.html"
})
export class PaginaJogoModal implements OnInit{
    public gameSelecionado: any;
    public gameObtido: any;
  constructor(public navCtrl: NavController, public twitchService: twitchService, public viewCtrl: ViewController, public params: NavParams) { }

  ngOnInit(){
    this.gameSelecionado = this.params.get('jogoSelect');
    console.log(this.gameSelecionado)
    this.obterJogo();
    registerLocaleData(localePtBr);
  }

  async obterJogo(){
    await this.twitchService.streams(this.gameSelecionado.game._id).then((response) => {
        this.gameObtido = response.data;
        console.log(this.gameObtido)
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
