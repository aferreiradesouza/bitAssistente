import { Injectable } from "@angular/core";
import { AjaxService } from "../shared/ajax.service";


@Injectable()
export class twitchService {
    constructor(private ajax: AjaxService) { }

    async clips(channel) {
        const url = `https://api.twitch.tv/helix/clips?broadcaster_id=${channel}`
        const clips = await this.ajax.get<any>(url);
        return clips;
    }
    async games() {
        const url = `https://api.twitch.tv/kraken/games/top?limit=20`
        const games = await this.ajax.get<any>(url);
        return games;
    }
    async gamesByName(name) {
        const url = `https://api.twitch.tv/kraken/search/games?query=${name}`
        const games = await this.ajax.get<any>(url);
        return games;
    }
    async gameSummary(name) {
        const url = `https://api.twitch.tv/kraken/streams/summary?game=${name}`
        const games = await this.ajax.get<any>(url);
        return games;
    }
    async clipById(id){
        const url = `https://api.twitch.tv/kraken/clips/${id}`
        const games = await this.ajax.get<any>(url);
        return games;
    }
    async channels(canal) {
        const url = `https://api.twitch.tv/kraken/search/channels?query=${canal}`
        const channel = await this.ajax.get<any>(url);
        return channel;
    }
    async channelById(id){
        const url = `https://api.twitch.tv/kraken/channels/${id}`;
        const channel = await this.ajax.get<any>(url);
        return channel;
    }
    async liveChannelsById(id){
        const url = `https://api.twitch.tv/kraken/streams/${id}`;
        const channel = await this.ajax.get<any>(url);
        return channel;
    }

    async streams(id) {
        const url = `https://api.twitch.tv/helix/streams?game_id=${id}`
        const channel = await this.ajax.get<any>(url);
        return channel;
    }
}