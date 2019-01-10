import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { twitchService } from "../../provedores/apiTwitch.service";
import { ModalController } from "ionic-angular";
import { filtroClipsModal } from "../modais/twitch/filtroClips/filtro";
import { FiltroCanaisModal } from "../modais/twitch/filtroChannels/filtro";
import { PaginaJogoModal } from "../modais/twitch/paginaJogo/jogo";
import localePtBr from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";
import { PaginaClipModal } from "../modais/twitch/paginaClip/clip";
import { FiltroJogosModal } from "../modais/twitch/filtroJogos/filtroJogos";
import { StorageService } from "../../provedores/storage.service";
import { PaginaCanalModal } from "../modais/twitch/paginaCanal/canal";
import { ToastController } from "ionic-angular";
import { UtilService } from "../../provedores/util.service";

@Component({
  selector: "twitch-home",
  templateUrl: "twitchHome.html"
})
export class TwitchPage implements OnInit {
  public clips: any[];
  public buttonClip: boolean;
  public errorMensagem: string;
  public games: any;
  public channels: any[] = [];

  constructor(
    public navCtrl: NavController,
    public twitchService: twitchService,
    public modalCtrl: ModalController,
    public storage: StorageService,
    private toastCtrl: ToastController,
    public util: UtilService
  ) {}

  ngOnInit() {
    this.obterGames();
    this.buttonClip = true;
    this.errorMensagem = "É necessário buscar um canal";
    this.channels = [];
    this.channels = this.util.obterLista("Channels");
    registerLocaleData(localePtBr);
  }

  obterClips(channel) {
    this.twitchService
      .clips(channel)
      .then(response => {
        this.clips = response.data;
        if (this.clips.length == 0) {
          this.buttonClip = true;
          this.errorMensagem = "Nenhum clip encontrado desse canal";
        } else {
          this.buttonClip = false;
        }
        this.twitchService
          .channelById(this.clips[0].broadcaster_id)
          .then(res => {
            this.clips.forEach(f => {
              f.logo = res.logo;
            });
          });
        console.log(this.clips);
      })
      .catch(response => {});
  }

  obterGames() {
    this.twitchService
      .games()
      .then(response => {
        this.games = response.top;
        console.log(this.games);
      })
      .catch(response => {
        console.log(response);
      });
  }

  modalFiltroClips() {
    const modal = this.modalCtrl.create(filtroClipsModal);
    modal.onDidDismiss(data => {
      if (data != "fechar") {
        this.obterClips(data._id);
      }
    });
    modal.present();
  }

  modalFiltroChannel() {
    const modal = this.modalCtrl.create(FiltroCanaisModal);
    modal.onDidDismiss(data => {
      if (data != "fechar") {
        this.adicionarChannel(
          data.display_name,
          data.logo,
          data._id,
          data.profile_banner
        );
      }
    });
    modal.present();
  }

  modalFiltroJogos() {
    const modal = this.modalCtrl.create(FiltroJogosModal);
    modal.onDidDismiss(data => {
      this.channels = this.util.obterLista("Channels");
    })
    modal.present();
  }

  modalPaginaJogo(game) {
    console.log(game);
    let modal = this.modalCtrl.create(PaginaJogoModal, { jogoSelect: game, detalhes: '' });
    modal.onDidDismiss(data => {
      this.channels = this.util.obterLista("Channels");
    });
    modal.present();
  }

  modalPaginaCanal(canal) {
    console.log(canal);
    let modal = this.modalCtrl.create(PaginaCanalModal, { canalSelect: canal });
    modal.present();
  }

  modalPaginaClip(clip) {
    console.log(clip);
    let modal = this.modalCtrl.create(PaginaClipModal, { clipSelect: clip });
    modal.present();
  }

  adicionarChannel(
    display_name: string,
    logo: string,
    _id: number,
    profile_banner:string,
  ) {
    this.twitchService.liveChannelsById(_id)
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
        this.toastSuccess();
      })
      .catch((res) => {

      })
  }

  desativarNot(channel){
    this.util.desativarNotificacao(channel)
    this.channels = this.util.obterLista("Channels");
  }

  removerCanal(channel){
    console.log(channel)
    this.util.removerCanal(channel);
    this.channels = this.util.obterLista("Channels");
  }

  toastSuccess() {
    let toast = this.toastCtrl.create({
      message: "Canal adicionado com Sucesso",
      duration: 2500,
      position: "bottom",
      cssClass: ".toast"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
