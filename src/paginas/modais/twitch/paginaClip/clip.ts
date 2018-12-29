import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { twitchService } from '../../../../provedores/apiTwitch.service';
import { DomSanitizer } from '@angular/platform-browser';
import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: "clip-pagina",
  templateUrl: "clip.html"
})
export class PaginaClipModal implements OnInit{
    public clipSelecionado: any;
    public clipGame: any = '';
    public criadoPor: string;
    public imgCriado: string;
  constructor(public navCtrl: NavController, public twitchService: twitchService, public viewCtrl: ViewController, public params: NavParams, public sanitizer: DomSanitizer) { }

  ngOnInit(){
    this.clipSelecionado = this.params.get('clipSelect');
    registerLocaleData(localePtBr);
    this.obterJogo();
    console.log(this.clipSelecionado)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  async obterJogo(){
    await this.twitchService.clipById(this.clipSelecionado.id).then((response) => {
        this.clipGame = response;
        this.imgCriado = response.curator.logo;
        this.criadoPor = response.curator.display_name;
        console.log(this.clipGame)
    }).catch((response) => {

    })
  }
  
}
