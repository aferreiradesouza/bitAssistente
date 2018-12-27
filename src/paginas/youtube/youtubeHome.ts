import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'youtube-home',
  templateUrl: 'youtubeHome.html'
})
export class YoutubePage {

  constructor(public navCtrl: NavController) {

  }

  data: any[] =[
    {url: 'dawdwa', nome:''},
    {url: 'dawdwa', nome:''},
    {url: 'dawdwa', nome:''},
  ] 

}
