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
  public tabAtual: string;
  public tab: string;
  public canal: any;
  public stream: any;
  public toastLive: boolean;
  public clipsAndVideos: any = [];
  constructor(
    public navCtrl: NavController,
    public twitchService: twitchService,
    public viewCtrl: ViewController,
    public params: NavParams,
    public util: UtilService
  ) {}

  ngOnInit() {
    this.canalSelecionado = this.params.get("canalSelect");
    this.tabAtual = this.params.get("tabSelect");
    this.canal = "";
    this.stream = "";
    this.toastLive = true;
    this.obterCanal();
    this.obterClipsCanal();
    registerLocaleData(localePtBr);
    this.tab = this.tabAtual;
  }

  async obterCanal() {
    await this.twitchService.channelById(this.canalSelecionado.id).then(res => {
      this.canal = res;
      console.log(this.canal);
      this.verificarStreamLive();
    });
  }

  async verificarStreamLive() {
    await this.twitchService
      .liveChannelsById(this.canalSelecionado.id)
      .then(res => {
        this.stream = res.stream;
        console.log(this.stream);
      });
  }

  async obterClipsCanal() {
    await this.twitchService.clips(this.canalSelecionado.id).then(response => {
      this.clipsAndVideos = response.data;
      console.log(this.clipsAndVideos);
    });
  }

  async mudarCategoria(tab) {
    if (this.tab == tab) {
      return;
    } else {
      this.tab = tab;
      if (this.tabAtual == "videos") {
        await this.twitchService
          .videoById(this.canalSelecionado.id)
          .then(response => {
            this.clipsAndVideos = []
            response.data.map(f => {
              f.thumbnail_url = f.thumbnail_url.replace("%{width}", "480");
              f.thumbnail_url = f.thumbnail_url.replace("%{height}", "272");
              this.clipsAndVideos.push(f)
            })
            this.clipsAndVideos.forEach((f, index) => {
              if(f.duration){
                this.clipsAndVideos.splice(index, 1)
              }
            });
            this.clipsAndVideos.sort(function(a, b) {
              if (a.view_count > b.view_count) {
                return -1;
              }
              if (a.view_count < b.view_count) {
                return 1;
              }
              return 0;
            });
            console.log(this.clipsAndVideos);
          });
      } else {
        await this.twitchService
          .clips(this.canalSelecionado.id)
          .then(response => {
            this.clipsAndVideos = response.data;
            console.log(this.clipsAndVideos);
          });
      }
    }
  }

  desativarNot() {
    this.util.desativarNotificacao(this.canalSelecionado);
    this.canalSelecionado.notificacao = !this.canalSelecionado.notificacao;
  }

  irParaCanal() {
    window.location.href = this.stream.channel.url;
  }

  fecharAviso() {
    this.toastLive = false;
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
