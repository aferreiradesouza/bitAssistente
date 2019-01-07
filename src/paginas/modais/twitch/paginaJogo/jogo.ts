import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { twitchService } from '../../../../provedores/apiTwitch.service';
import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { StorageService } from '../../../../provedores/storage.service';
import { UtilService } from '../../../../provedores/util.service';

@Component({
  selector: "jogo-pagina",
  templateUrl: "jogo.html"
})
export class PaginaJogoModal implements OnInit{
    public gameSelecionado: any;
    public gameObtido: any;
    public detalhesGames: any;
    public channels: any[];
  constructor(public navCtrl: NavController, public twitchService: twitchService, public viewCtrl: ViewController, public params: NavParams, public storage: StorageService, public util: UtilService) { }

  ngOnInit(){
    this.gameSelecionado = this.params.get('jogoSelect');
    console.log(this.gameSelecionado)
    this.detalhesGames = {channels: '', viewers: ''};
    this.channels = [];
    this.channels = this.util.obterLista("Channels");
    this.obterJogo();
    this.obterDetalhes();
    registerLocaleData(localePtBr);
  }

  async obterDetalhes(){
    await this.twitchService.gameSummary(this.gameSelecionado.game.name).then((response) => {
        this.detalhesGames = response;
        console.log(this.detalhesGames)
    })
  }

  async obterJogo(){
    await this.twitchService.streams(this.gameSelecionado.game._id).then((response) => {
        this.gameObtido = response.data;
        this.util.verificarCanal(this.gameObtido);
        console.log(this.gameObtido)
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  obterChannel(item){
    if(item.adicionado){
      this.util.removerCanal(item);
      item.adicionado = false;
      this.util.toastRemove();
    }else{
      item.loading = true
      this.twitchService.channelById(item.user_id)
        .then((res) => {
        item.loading = false
        this.adicionarChannel(res.display_name, res.logo, res._id, res.profile_banner);
        item.adicionado = true;
        this.util.toastSuccess();
      })
    }
  }

  async adicionarChannel(
    display_name: string,
    logo: string,
    _id: number,
    profile_banner:string,
  ) {
    await this.twitchService.liveChannelsById(_id)
      .then((res) => {
        let obj = {
          display_name: display_name,
          logo: logo,
          id: _id,
          profile_banner: profile_banner,
          status: res.stream == null ? null : res.stream.stream_type,
          notificacao: true
        };
        this.channels.unshift(obj);
        this.storage.salvarObjeto("Channels", this.channels);
      })
      .catch((res) => {

      })
  }
  
}
