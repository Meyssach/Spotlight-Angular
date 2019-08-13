import { CCIssue } from './cc-issue.interface';
import { CCTitle } from './cc-title.interface';

export interface CCRequestResponseArray {
    data: {
        issues?: CCIssue[],
        titles?: CCTitle[],
        moreToLoad?: boolean,
    };
    result: {
        message: string,
        status: string,
    };
}
