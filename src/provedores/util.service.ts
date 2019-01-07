import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { twitchService } from "./apiTwitch.service";
import { ToastController } from "ionic-angular";


@Injectable()
export class UtilService {
    public channels: any;
    constructor(public storage: StorageService, public twitchService: twitchService, public toastCtrl: ToastController) { }

    public removerCanal(channel) {
        let canais = this.obterLista("Channels")
        if (channel.user_id != undefined) {
            for (let i = 0; i < canais.length; i++) {
                if (canais[i].id == channel.user_id) {
                    canais.splice(i, 1);
                    this.storage.salvarObjeto("Channels", canais);
                }

            }
        } else {
            for (let i = 0; i < canais.length; i++) {
                if (canais[i].id == channel.id) {
                    canais.splice(i, 1);
                    this.storage.salvarObjeto("Channels", canais);
                }

            }
        }
    }

    public verificarCanal(streams) {
        let canais = this.obterLista("Channels")
        streams.forEach(f => {
            f.adicionado = false;
        });
        for (let i = 0; i < canais.length; i++) {
            for (let o = 0; o < streams.length; o++) {
                if (canais[i].id == streams[o].user_id) {
                    streams[o].adicionado = true;
                }
            }
        }
    }

    obterLista(res) {
        var consultas = [];

        var consultasAux = this.storage.obterObjeto(res);
        if (consultasAux != "") {
            consultas = this.storage.converterParaObjeto(consultasAux);
        }

        return consultas;
    }

    toastSuccess() {
        let toast = this.toastCtrl.create({
            message: "Canal adicionado com Sucesso",
            duration: 1000,
            position: "bottom",
            cssClass: ".toast"
        });

        toast.onDidDismiss(() => {
            console.log("Dismissed toast");
        });

        toast.present();
    }

    toastRemove() {
        let toast = this.toastCtrl.create({
            message: "Canal removido",
            duration: 1000,
            position: "bottom",
            cssClass: ".toast"
        });

        toast.onDidDismiss(() => {
            console.log("Dismissed toast");
        });

        toast.present();
    }
}