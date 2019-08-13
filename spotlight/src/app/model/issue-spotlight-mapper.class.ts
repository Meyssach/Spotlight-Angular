import * as moment from 'moment';
import {Issue} from '../../../publishing-api/models/issue.class';
import {Category} from '../../../publishing-api/models/category.class';
import {Title} from '../../../publishing-api/models/title.class';
import {SpotlightInfoInterface} from './spotlight-info.interface';
import {SpotlightActions} from './actions/spolight-actions.enum';
import { SpotlightDataInterface } from './spotlight-data.interface';

export class IssueToSpotlightMapper {

    constructor() {
    }

    static getFieldValue(issue: Issue, fieldName: string): string {
        switch (fieldName) {
            case 'none':
                return '';
            case 'name':
            case 'defaultName':
                return issue.name;
            case 'subtitle':
                return issue.metadata.subtitle;
            case 'publicationDate':
            default:
                return moment(new Date(issue.publicationDate * 1000)).format('MMMM YYYY');
        }
    }

    static map(
        spotlightInfo: SpotlightInfoInterface,
        issue: Issue,
        parent: Title | Category | Issue = issue,
    ): SpotlightDataInterface {
        return {
            title: IssueToSpotlightMapper.getFieldValue(
                issue,
                (spotlightInfo.options || ({} as any)).titleField || 'defaultName'
            ),
            subtitle: IssueToSpotlightMapper.getFieldValue(
                issue,
                (spotlightInfo.options || ({} as any)).subtitleField || 'publicationDate'
            ),
            label: spotlightInfo.data.label,
            imagesIds: issue.resources.thumbnailIds,
            ratio: 0.7070,
            // ratio: parent.metadata.physicalData.cover.width / parent.metadata.physicalData.cover.height,
            imageAction: {
                buttonTitle: 'semoreinfo',
                buttonAction: SpotlightActions.GOTO,
                params: {
                    state: 'issue',
                    params: {'itemId': issue.id},
                    analytics: {
                        action: 'se_spotlight_click',
                        params: {
                            spotlightItemReferenceType: spotlightInfo.type.toLowerCase(),
                            titleName: issue.titleName,
                            categoryName: parent.name,
                            issueName: issue.name
                        }
                    }
                }
            },
            listButtons: [
                {
                    buttonTitle: 'seread',
                    buttonAction: SpotlightActions.GOTO,
                    filled: true,
                    params: {
                        state: 'read',
                        params: {'itemId': issue.id},
                        analytics: {
                            action: 'ks_read',
                            params: {
                                titleName: issue.titleName,
                                issueName: issue.name
                            }
                        }
                    }
                }
            ]
        };
    }
}
