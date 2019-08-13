import { Category } from './../models/category.class';
import { EntityTypes } from './../models/entity-types.enum';
import { Title } from './../models/title.class';
import { Issue } from '../models/issue.class';
import { ApiResponseArray } from '../models/api-response-array.interface';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TitlesService } from './titles.service';
import { CategoriesService } from './categories.service';
import { IssuesService } from './issues.service';

@Injectable({
    providedIn: 'root',
})
export class EntitiesService {
    constructor(private titlesService: TitlesService,
                private categoriesService: CategoriesService,
                private issuesService: IssuesService) {}

    getEntityDetails(type: EntityTypes, reference: string): Observable<Title | Issue | Category> {
        let entityDetails$: Observable<any>;

        switch (type) {
            case EntityTypes.Category:
                entityDetails$ = this.categoriesService.get(reference);
                break;

            case EntityTypes.Title:
                entityDetails$ = this.titlesService.get(reference);
                break;

            case EntityTypes.Issue:
                entityDetails$ = this.issuesService.getIssueById(reference);
                break;

            default:
                throw new Error(`Unknown type ${type}`);
        }
        return entityDetails$;
    }

    getEntityItems(
        type: EntityTypes,
        reference: string | null,
        limit: number,
        offset: number = 0
    ): Observable<ApiResponseArray<Issue | Title>> {
        let content$: Observable<ApiResponseArray<Issue | Title>>;

        switch (type) {
            case EntityTypes.Category:
                content$ = this.categoriesService.getContent(reference, limit, offset);
                break;
            case EntityTypes.AllTitles:
                content$ = this.titlesService.getAllTitles(limit, offset);
                break;
            case EntityTypes.Title:
                content$ = this.titlesService.getTitleContent(reference, limit, offset);
                break;
            default:
                throw new Error(`Unknown type ${type}`);
        }
        return content$;
    }
}
