import { Injectable } from "@angular/core";
import { AjaxService } from "../shared/ajax.service";


@Injectable()
export class twitchService {
    constructor(private ajax: AjaxService) { }

    async clips(channel) {
        const url = `https://api.twitch.tv/kraken/clips/top?channel=${channel}&period=all&trending=true&limit=10`
        const clips = await this.ajax.get<any>(url);
        return clips;
    }
    async games() {
        const url = `https://api.twitch.tv/kraken/games/top?limit=20`
        const games = await this.ajax.get<any>(url);
        return games;
    }
    async channels(canal) {
        const url = `https://api.twitch.tv/kraken/search/channels?query=${canal}`
        const channel = await this.ajax.get<any>(url);
        return channel;
    }
    async streams(game) {
        const url = `https://api.twitch.tv/kraken/search/channels?query=${game}`
        const channel = await this.ajax.get<any>(url);
        return channel;
    }
}