import { Component } from '@angular/core';

import { TwitchPage } from '../twitch/twitchHome';
import { ConfiguracoesPage } from '../configuracoes/configuracoes';
import { YoutubePage } from '../youtube/youtubeHome';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TwitchPage;
  tab2Root = YoutubePage;
  tab3Root = ConfiguracoesPage;

  constructor() {

  }
}
