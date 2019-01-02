import { Component, OnInit } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { twitchService } from '../../../../provedores/apiTwitch.service';

@Component({
  selector: "filtro-canais",
  templateUrl: "filtro.html"
})
export class FiltroCanaisModal implements OnInit{
    public channels: any[] = [];
  constructor(public navCtrl: NavController, public twitchService: twitchService, public viewCtrl: ViewController) { }

  ngOnInit(){
  }

  dismiss(channel) {
        let data = channel;
        this.viewCtrl.dismiss(data);
  }

  procurarChannel(channel){
    this.twitchService.channels(channel)
      .then((response) => {
          this.channels = response.channels;
          console.log(this.channels)
      })
      .catch((response) => {
          console.log(response)
      })
  }
}
