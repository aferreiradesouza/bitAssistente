import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

@Injectable()
export class AjaxService {

    constructor(private http: HttpClient,
        public storageService: IonicStorageModule,
    ) { }

    public async get<T>(url: string, params: { [param: string]: string | string[] } = {}) {
        
        const headers = {
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Client-ID': `7we2f4tm6shfzfnmqlwxn4i8j8v9qy`
        };
        return this.http.get<T>(url, { params, headers }).toPromise();
    }
    public async post<T>(url: string, body: any = {}) {

        const options = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `OAuth 7we2f4tm6shfzfnmqlwxn4i8j8v9qy`
            }
        };

        return this.http.post<T>(url, body, options).toPromise();
    }
}
