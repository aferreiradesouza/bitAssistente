import { Component, OnInit } from "@angular/core";
import { NavController, ViewController, NavParams } from "ionic-angular";
import { twitchService } from "../../../../provedores/apiTwitch.service";
import localePtBr from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";
import { UtilService } from "../../../../provedores/util.service";

@Component({
  selector: "canal-pagina",
  templateUrl: "canal.html"
})
export class PaginaCanalModal implements OnInit {
  public canalSelecionado: any;
  public tab: string;
  public canal: any;
  public stream: any;
  public toastLive: boolean;
  constructor(
    public navCtrl: NavController,
    public twitchService: twitchService,
    public viewCtrl: ViewController,
    public params: NavParams,
    public util: UtilService
  ) {}

  ngOnInit() {
    this.canalSelecionado = this.params.get("canalSelect");
    this.tab = this.params.get("tabSelect")
    this.canal = "";
    this.stream = "";
    this.toastLive = true;
    this.obterCanal();
    registerLocaleData(localePtBr);
  }

  async obterCanal() {
    await this.twitchService
      .channelById(this.canalSelecionado.id)
      .then(res => {
        this.canal = res;
        console.log(this.canal);
        this.verificarStreamLive();
      });
  }

  async verificarStreamLive() {
    await this.twitchService
      .liveChannelsById(this.canalSelecionado.id)
      .then(res => {
        this.stream = res.stream
        console.log(this.stream)
      });
  }

  desativarNot(){
    this.util.desativarNotificacao(this.canalSelecionado)
    this.canalSelecionado.notificacao = !this.canalSelecionado.notificacao
  }

  irParaCanal(){
    window.location.href=this.stream.channel.url
  }

  fecharAviso(){
    this.toastLive = false
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
