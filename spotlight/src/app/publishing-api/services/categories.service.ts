import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category.class';
import {CCCategory} from '../models/cc-category.interface';
import {CCResponseEntity} from '../models/cc-response-entity.interface';
import {map} from 'rxjs/operators';
import {CCCategoryContent} from '../models/cc-category-content.interface';
import {CategoryTypesContained} from '../models/category-item-types.enum';
import {ApiResponseArray} from '../models/api-response-array.interface';
import {Issue} from '../models/issue.class';
import {Title} from '../models/title.class';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    constructor(private http: HttpClient) {
    }

    get(categoryId: string): Observable<Category> {
        const url = '/api/category/get/';
        const params = new HttpParams()
            .set('categoryId', categoryId);

        return this.http.get<CCResponseEntity<CCCategory>>(url, {params})
            .pipe(map((result) => {
                return new Category(result.data);
            }));
    }

    getContent(categoryId: string, limit: number, offset = 0): Observable<ApiResponseArray<Title | Issue>> {
        const url = '/api/category/getContent';

        const params = new HttpParams()
            .set('categoryId', categoryId.toString())
            .set('limit', limit.toString())
            .set('offset', offset.toString());


        return this.http.get<CCResponseEntity<CCCategoryContent>>(url, {params})
            .pipe(
                map((result) => {
                    let typeContained = CategoryTypesContained[result.data.content.typeContained];
                    if (!typeContained) {
                        typeContained = result.data.content.titles.length > 0 ? 'titles' : 'issues';
                    }
                    const categories = result.data.content[typeContained]
                        .map((res) => typeContained === 'issues' ? new Issue(res) : new Title(res));
                    return {
                        data: categories,
                        moreToLoad: result.data.content.moreToLoad
                    };
                })
            );
    }

}
