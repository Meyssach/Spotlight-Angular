import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {Issue} from '../models/issue.class';
import {Observable} from 'rxjs';
import {CCResponseEntity} from '../models/cc-response-entity.interface';
import {CCIssue} from '../models/cc-issue.interface';

@Injectable({
    providedIn: 'root'
})
export class IssuesService {

    constructor(private http: HttpClient) {
    }

    getIssueById(issueId: string): Observable<Issue> {
        const url = '/api/issue/get/';
        const params = new HttpParams()
            .set('issueId', issueId);
        return this.http.get<CCResponseEntity<CCIssue>>(url, {params})
            .pipe(
                map(result => {
                    return new Issue(result.data);
                })
            );
    }

}
