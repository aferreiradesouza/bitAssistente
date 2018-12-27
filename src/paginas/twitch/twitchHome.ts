import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { twitchService } from '../../provedores/apiTwitch.service';
import { ModalController } from 'ionic-angular';
import { filtroClipsModal } from '../modais/twitch/filtroClips/filtro';
import { PaginaJogoModal } from '../modais/twitch/paginaJogo/jogo'

@Component({
  selector: 'twitch-home',
  templateUrl: 'twitchHome.html'
})
export class TwitchPage implements OnInit{
  public clips: any[];
  public buttonClip: boolean;
  public errorMensagem: string;
  public games: any;

  constructor(public navCtrl: NavController, public twitchService: twitchService, public modalCtrl: ModalController) { }

  ngOnInit(){
    this.obterGames();
    this.buttonClip = true;
    this.errorMensagem = 'É necessário buscar um canal'
  }

  obterClips(channel){
    this.twitchService.clips(channel)
      .then((response) => {
        this.clips = response.clips
        if(this.clips.length == 0){
          this.buttonClip = true;
          this.errorMensagem = 'Nenhum clip encontrado desse canal';
        }else{
          this.buttonClip = false;
        }
        console.log(this.clips)
      })
      .catch((response) => {
        console.log(response)
      })
  }

  obterGames(){
    this.twitchService.games()
      .then((response) => {
        this.games = response.top
        console.log(this.games)
      })
      .catch((response) => {
        console.log(response)
      })
  }

  modalFiltroClips() {
    const modal = this.modalCtrl.create(filtroClipsModal);
    modal.onDidDismiss(data => {
      if(data != 'fechar'){
        this.obterClips(data.name)
      }
    });
    modal.present();
  }

  modalPaginaJogo(game) {
    let modal = this.modalCtrl.create(PaginaJogoModal, { 'jogoSelect': game} );
    modal.present();
  }

  data: any[] =[
    {url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/33d1f325-5fbe-4067-be1e-99671358bf2b-profile_image-70x70.png', nome:'gaules'},
    {url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/1586eefd-def0-4a99-a27a-38b5944f3c34-profile_image-50x50.jpg', nome:'BiDa'},
    {url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/c46b05a0-db41-4c66-b736-3ff018df99ec-profile_image-70x70.png', nome:'alanzoka'},
  ] 
}
