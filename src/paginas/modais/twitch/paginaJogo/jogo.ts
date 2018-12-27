import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { twitchService } from '../../../../provedores/apiTwitch.service';

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
    this.obterJogo();
  }

  async obterJogo(){
    await this.twitchService.channels(this.gameSelecionado.game.name).then((response) => {
        this.gameObtido = response;
        console.log(this.gameObtido)
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
