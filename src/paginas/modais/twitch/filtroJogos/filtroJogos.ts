import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, ModalController } from 'ionic-angular';
import { twitchService } from '../../../../provedores/apiTwitch.service';
import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { PaginaJogoModal } from '../paginaJogo/jogo';

@Component({
  selector: "filtro-jogos",
  templateUrl: "filtroJogos.html"
})
export class FiltroJogosModal implements OnInit{
    public jogos: any;
    public game: any = {};
  constructor(public navCtrl: NavController, public twitchService: twitchService, public viewCtrl: ViewController, public modalCtrl: ModalController) { }

  ngOnInit(){
    registerLocaleData(localePtBr);
  }

  procurarJogo(name){
      this.twitchService.gamesByName(name).then((res) => {
        this.jogos = res.games
        console.log(this.jogos)
      }).catch((res) => {
        this.jogos = [];
      })
  }

  modalPaginaJogo(game) {
    this.game = { game: game };
    console.log(this.game);
    let modal = this.modalCtrl.create(PaginaJogoModal, { 'jogoSelect': this.game} );
    modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
