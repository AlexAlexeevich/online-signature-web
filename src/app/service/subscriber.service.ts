import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

// const SUBSCRIBER_API = 'http://localhost:8080';
const SUBSCRIBER_API = 'http://185.46.9.99:8080/api/subscriber';
@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private http: HttpClient) { }

  getSms(subscriberPhone: string | null, shortUrl: string | null): Observable<any> {
    // @ts-ignore
    let params = new HttpParams().set('subscriber_phone', subscriberPhone).set('short-url', shortUrl);
    return this.http.get(SUBSCRIBER_API + '/get_sms', {params: params})
  }

  sendCodeFromSubscriber(subscriberPhone: string, code: string): Observable<any> {
    let body: HttpParams = new HttpParams();
    body = body.append('subscriber_phone', subscriberPhone);
    body = body.append('code', code);
    return this.http.post(SUBSCRIBER_API + '/send_code', body);
  }

  openContract(id: number): Observable<any> {
     const headers = new HttpHeaders({ 'Content-Type': 'application/pdf', 'Accept' : 'application/pdf'})
    // // let params = new HttpParams().set('link_contract', linkContract);
    //  console.log("openContract");
    // // return this.http.get(SUBSCRIBER_API + '/get_sms',  {params: params});
    return this.http.get<Blob>(SUBSCRIBER_API + '/open_contract/' + id,
      {headers: headers, responseType: 'arrayBuffer'  as 'json'});
  }

  getSmsForSign(subscriberPhone: string | null, subscriberEmail: string | null): Observable<any> {
    // @ts-ignore
    let params = new HttpParams().set('subscriber_phone', subscriberPhone).set('subscriber_email', subscriberEmail);
    return this.http.get(SUBSCRIBER_API + '/get_sms_for_signing', {params: params})
  }

  signContract(code: string, subscriberPhone: string): Observable<any> {
    let body: HttpParams = new HttpParams();
    body = body.append('code', code);
    body = body.append('subscriber_phone', subscriberPhone);
    return this.http.post(SUBSCRIBER_API + '/sign_contract', body)
  }
}
