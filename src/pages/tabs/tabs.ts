import { Component } from '@angular/core';

import { TwitchPage } from '../twitch/twitchHome';
import { ContactPage } from '../contact/contact';
import { YoutubePage } from '../youtube/youtubeHome';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = YoutubePage;
  tab2Root = TwitchPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
