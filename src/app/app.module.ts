import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TwitchPage } from '../paginas/twitch/twitchHome';
import { ConfiguracoesPage } from '../paginas/configuracoes/configuracoes';
import { YoutubePage } from '../paginas/youtube/youtubeHome';
import { TabsPage } from '../paginas/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TwitchPage,
    ConfiguracoesPage,
    YoutubePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TwitchPage,
    ConfiguracoesPage,
    YoutubePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
