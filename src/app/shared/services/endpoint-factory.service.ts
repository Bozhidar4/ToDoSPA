import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class EndpointFactory {
  static readonly apiVersion: string = '1';
  public appVersion: string = '1.0.0';

  constructor(protected http: HttpClient, private injector: Injector) {}

  protected getRequestHeaders(): {
    headers: HttpHeaders | { [header: string]: string | string[] };
  } {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `application/vnd.iman.v${EndpointFactory.apiVersion}+json, application/json, text/plain, */*`,
      'App-Version': this.appVersion,
      'Cache-Control':
        'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      Pragma: 'no-cache',
      Expires: '0',
      'Authorization': `Bearer ${environment.token}`
    });

    return { headers: headers };
  }
}
