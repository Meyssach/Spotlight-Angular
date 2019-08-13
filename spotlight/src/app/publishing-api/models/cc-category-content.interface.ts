import {CCIssue} from './cc-issue.interface';
import {CCTitle} from './cc-title.interface';

export interface CCCategoryContent {
    content: {
        categories: [],
        typeContained: string,
        totalCount: number,
        moreToLoad: boolean,
        issues?: CCIssue[],
        titles?: CCTitle[]
    };
}
