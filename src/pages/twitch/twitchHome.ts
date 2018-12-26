import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'twitch-home',
  templateUrl: 'twitchHome.html'
})
export class TwitchPage {

  constructor(public navCtrl: NavController) {

  }

  data: any[] =[
    {url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/33d1f325-5fbe-4067-be1e-99671358bf2b-profile_image-70x70.png', nome:'gaules'},
    {url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/1586eefd-def0-4a99-a27a-38b5944f3c34-profile_image-50x50.jpg', nome:'BiDa'},
    {url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/c46b05a0-db41-4c66-b736-3ff018df99ec-profile_image-70x70.png', nome:'alanzoka'},
  ] 
}
