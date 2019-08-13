import { CCIssue } from './cc-issue.interface';

/**
 * An issue from CloudConnect application API.
 * Note: The typings could be stricter.
 */
export class Issue {
    name: string;
    defaultName: string;
    publicationDate: number;
    metadata: any;
    resources: any;
    data?: any;
    id: string;
    titleName: string;

    constructor(jsonIssue: CCIssue) {
        Object.assign(this, jsonIssue.issue);
        this.publicationDate = parseInt(jsonIssue.issue.publicationDate, 10);
    }
}
