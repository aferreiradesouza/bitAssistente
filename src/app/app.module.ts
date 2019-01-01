import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TwitchPage } from '../paginas/twitch/twitchHome';
import { ConfiguracoesPage } from '../paginas/configuracoes/configuracoes';
import { YoutubePage } from '../paginas/youtube/youtubeHome';
import { TabsPage } from '../paginas/tabs/tabs';

import { filtroClipsModal } from '../paginas/modais/twitch/filtroClips/filtro';
import { PaginaJogoModal } from '../paginas/modais/twitch/paginaJogo/jogo';
import { PaginaClipModal } from '../paginas/modais/twitch/paginaClip/clip';
import { FiltroJogosModal } from '../paginas/modais/twitch/filtroJogos/filtroJogos';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AjaxService } from '../shared/ajax.service';
import { twitchService } from '../provedores/apiTwitch.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    TwitchPage,
    ConfiguracoesPage,
    YoutubePage,
    TabsPage,
    filtroClipsModal,
    PaginaJogoModal,
    PaginaClipModal,
    FiltroJogosModal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TwitchPage,
    ConfiguracoesPage,
    YoutubePage,
    TabsPage,
    filtroClipsModal,
    PaginaJogoModal,
    PaginaClipModal,
    FiltroJogosModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AjaxService,
    twitchService,
    HttpClient,
    IonicStorageModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
