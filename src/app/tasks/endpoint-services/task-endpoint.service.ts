import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EndpointFactory } from "src/app/shared/services/endpoint-factory.service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Task } from "../models/task-model";
import { Result } from "../models/result-model";

@Injectable()
export class TaskEndpointService extends EndpointFactory {
    private readonly _getBaseUrl = `${environment.baseAPIUrl}todo`;

  constructor(protected override http: HttpClient, injector: Injector) {
    super(http, injector);
  }

  public getList(): Observable<Result> {
    return this.http.get<Result>(this._getBaseUrl, this.getRequestHeaders());
  }
}