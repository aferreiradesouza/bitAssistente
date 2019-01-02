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
import { UtilService } from "../../provedores/util.service";
import { ToastController } from 'ionic-angular';

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
    public util: UtilService,
    private toastCtrl: ToastController,
  ) {}

  ngOnInit() {
    this.obterGames();
    this.buttonClip = true;
    this.errorMensagem = "É necessário buscar um canal";
    this.channels = []
    this.channels = this.obterLista("Channels")
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
        this.adicionarChannel(data.name, data.display_name, data.logo, data._id, data.followers, data.profile_banner, data.views)
      }
    });
    modal.present();
  }

  modalFiltroJogos() {
    const modal = this.modalCtrl.create(FiltroJogosModal);
    modal.present();
  }

  modalPaginaJogo(game) {
    console.log(game);
    let modal = this.modalCtrl.create(PaginaJogoModal, { jogoSelect: game });
    modal.present();
  }

  modalPaginaClip(clip) {
    console.log(clip);
    let modal = this.modalCtrl.create(PaginaClipModal, { clipSelect: clip });
    modal.present();
  }

  adicionarChannel(name: string, display_name: string, logo: string, _id: number, followers: number, profile_banner: string, views: number){
    let obj = {name: name, display_name: display_name, logo: logo, _id: _id, followers: followers, profile_banner: profile_banner, views: views}
    this.channels.unshift(obj);
    this.util.salvarObjeto('Channels', this.channels);
    this.presentToast()
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Canal adicionado com Sucesso',
      duration: 2500,
      position: 'bottom',
      cssClass: '.toast'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  obterLista(res) {

    var consultas = [];

    var consultasAux = this.util.obterObjeto(res);
    if (consultasAux != "") {
        consultas = this.util.converterParaObjeto(consultasAux);
    }

    return consultas;
}

  data: any[] = [
    {
      url:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/33d1f325-5fbe-4067-be1e-99671358bf2b-profile_image-70x70.png",
      nome: "gaules"
    },
    {
      url:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/1586eefd-def0-4a99-a27a-38b5944f3c34-profile_image-50x50.jpg",
      nome: "BiDa"
    },
    {
      url:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/c46b05a0-db41-4c66-b736-3ff018df99ec-profile_image-70x70.png",
      nome: "alanzoka"
    }
  ];
}
