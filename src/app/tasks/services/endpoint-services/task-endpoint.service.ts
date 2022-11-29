import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EndpointFactory } from "src/app/shared/services/endpoint-factory.service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Result } from "../../models/result-model";
import { CreateTask } from "../../models/create-task-model";
import { EditTask } from "../../models/edit-task-model";

@Injectable()
export class TaskEndpointService extends EndpointFactory {
    private readonly _getBaseUrl = `${environment.baseAPIUrl}todo`;

    constructor(protected override http: HttpClient, injector: Injector) {
        super(http, injector);
    }

    public getList(): Observable<Result> {
        return this.http.get<Result>(this._getBaseUrl, this.getRequestHeaders());
    }

    public get(taskId: number): Observable<Result> {
        return this.http.get<Result>(`${this._getBaseUrl}/${taskId}`, this.getRequestHeaders());
    }

    public add(addItemRequest: CreateTask): Observable<any> {
        return this.http.post(this._getBaseUrl, addItemRequest, this.getRequestHeaders());
    }

    public edit(editItemRequest: EditTask): Observable<any> {
        return this.http.put(
            this._getBaseUrl,
            editItemRequest,
            this.getRequestHeaders());
    }

    public delete(taskId: number): Observable<any> {
        return this.http.delete<Result>(`${this._getBaseUrl}/${taskId}`, this.getRequestHeaders());
    }
}