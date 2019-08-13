import {IssueToSpotlightMapper} from './issue-spotlight-mapper.class';
import {issue1} from '../../../publishing-api/models/issue.mock';
import {EntityTypes} from '../../../publishing-api/models/entity-types.enum';
import {title1} from '../../../publishing-api/models/title.mock';
import { SpotlightDataInterface } from './spotlight-data.interface';

describe('IssueToSpotlightMapper', () => {
    it('should convert an Issue to a spotlight model', () => {
        const spotlightInfo = {type: EntityTypes.Issue, data: {label: 'foo', reference: undefined}};
        const expected: SpotlightDataInterface = {
            title: 'Un mundo mejor es posible',
            subtitle: 'May 2019',
            label: 'foo',
            ratio: 0.7070,
            imagesIds: ['5453725'],
            imageAction: {
                buttonTitle: 'semoreinfo',
                buttonAction: 'goto',
                params: {
                    state: 'issue',
                    params: {itemId: '4A4D0387E848183B5404858185FE3CC9'},
                    analytics: {
                        action: 'se_spotlight_click',
                        params: {
                            spotlightItemReferenceType: 'issue',
                            categoryName: 'al',
                            titleName: 'Alienta Editorial',
                            issueName: 'Un mundo mejor es posible',
                        }
                    }
                }
            },
            listButtons: [
                {
                    buttonTitle: 'seread',
                    buttonAction: 'goto',
                    filled: true,
                    params: {
                        state: 'read',
                        params: {itemId: '4A4D0387E848183B5404858185FE3CC9'},
                        analytics: {
                            action: 'ks_read',
                            params: {
                                titleName: 'Alienta Editorial',
                                issueName: 'Un mundo mejor es posible',
                            }
                        }
                    }
                }
            ]
        };
        const res = IssueToSpotlightMapper.map(spotlightInfo, issue1, title1);
        expect(res).toEqual(expected);
    });

    it('should convert an Issue to a spotlight with custom title and subtitle', () => {
        const spotlightInfo = {
            type: EntityTypes.Issue,
            data: {label: 'foo', reference: undefined},
            options: {titleField: 'publicationDate', subtitleField: 'subtitle'}
        };
        const expected: SpotlightDataInterface = {
            title: 'May 2019',
            subtitle: 'Cómo podemos ayudar a los más desfavorecidos',
            label: 'foo',
            ratio: 0.7070,
            imagesIds: ['5453725'],
            imageAction: {
                buttonTitle: 'semoreinfo',
                buttonAction: 'goto',
                params: {
                    state: 'issue',
                    params: {itemId: '4A4D0387E848183B5404858185FE3CC9'},
                    analytics: {
                        action: 'se_spotlight_click',
                        params: {
                            spotlightItemReferenceType: 'issue',
                            categoryName: 'al',
                            titleName: 'Alienta Editorial',
                            issueName: 'Un mundo mejor es posible',
                        }
                    }
                }
            },
            listButtons: [
                {
                    buttonTitle: 'seread',
                    buttonAction: 'goto',
                    filled: true,
                    params: {
                        state: 'read',
                        params: {itemId: '4A4D0387E848183B5404858185FE3CC9'},
                        analytics: {
                            action: 'ks_read',
                            params: {
                                titleName: 'Alienta Editorial',
                                issueName: 'Un mundo mejor es posible',
                            }
                        }
                    }}
            ]
        };
        const res = IssueToSpotlightMapper.map(spotlightInfo, issue1, title1);
        expect(res).toEqual(expected);
    });

    it('should get issue property value from a given field name', () => {
        const fieldsNames = ['none', 'name', 'defaultName', 'subtitle', 'publicationDate'];
        const expected = ['', issue1.name, issue1.name, issue1.metadata.subtitle, 'May 2019'];

        const res = fieldsNames.map((field) => IssueToSpotlightMapper.getFieldValue(issue1, field));

        expect(res).toEqual(expected);
    });
});
