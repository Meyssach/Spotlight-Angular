import { CCTitle } from '../models/cc-title.interface';
import { Issue } from '../models/issue.class';
import { Title } from '../models/title.class';
import { ApiResponseArray } from '../models/api-response-array.interface';
import { CCRequestResponseArray } from '../models/cc-response-array.interface';
import { CCResponseEntity } from '../models/cc-response-entity.interface';

import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitlesService {

    constructor(private http: HttpClient) { }

    /**
     *  Fetches and returns an unfiltered list of Title objects
     */
    getAllTitles(limit: number, offset: number = 0): Observable<ApiResponseArray<Title>> {
        const url = '/api/title/getAll';

        const params = new HttpParams()
            .set('limit', limit.toString())
            .set('offset', offset.toString());
        return this.http.get<CCRequestResponseArray>(url, {params})
            .pipe(
                map(result => {
                    const titles = result.data.titles.map(title => new Title(title));
                    return {
                        data: titles,
                        moreToLoad: result.data.moreToLoad || false
                    };
                }
            ));
    }

    /**
     * Fetches and returns a formatted Title object
     */
    get(titleId: string): Observable<Title> {
        const url = '/api/title/get/';

        const params = new HttpParams()
            .set('titleId', titleId);

        return this.http.get<CCResponseEntity<CCTitle>>(url, {params})
            .pipe(map(result =>
                new Title(result.data)
            ));
    }

    /**
     * Fetches and returns the Issues contained in a Title
     */
    getTitleContent(titleId: string, limit: number, offset: number = 0): Observable<ApiResponseArray<Issue>> {
        const url = '/api/issue/getAll';

        const params = new HttpParams()
            .set('titleId', titleId)
            .set('limit', limit.toString())
            .set('offset', offset.toString());

        return this.http.get<CCRequestResponseArray>(url, {params})
            .pipe(
                map(result => {
                    const issues = result.data.issues.map(issue => new Issue(issue));
                    return {
                        data: issues,
                        moreToLoad: result.data.moreToLoad || false,
                    };
                }
            ));
    }
}
