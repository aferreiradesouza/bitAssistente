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
import { UtilService } from '../provedores/util.service';
import { FiltroCanaisModal } from '../paginas/modais/twitch/filtroChannels/filtro';
import { PaginaCanalModal } from '../paginas/modais/twitch/paginaCanal/canal';

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
    FiltroJogosModal,
    FiltroCanaisModal,
    PaginaCanalModal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
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
    FiltroJogosModal,
    FiltroCanaisModal,
    PaginaCanalModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AjaxService,
    twitchService,
    UtilService,
    HttpClient,
    IonicStorageModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
