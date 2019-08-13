import {TestBed} from '@angular/core/testing';
import {EntitiesService} from '../../../publishing-api/services/entities.service';
import {SpotlightService} from './spotlight.service';
import {ApiResponseArray} from '../../../publishing-api/models/api-response-array.interface';
import {of} from 'rxjs';
import {issue1, issue2} from '../../../publishing-api/models/issue.mock';
import {SpotlightInfoInterface} from '../model/spotlight-info.interface';
import {StateService} from '@uirouter/core';
import {SpotlightActions} from '../model/actions/spolight-actions.enum';
import {AnalyticsService} from '../../../analytics/service/analytics.service';
import {category1} from '../../../publishing-api/models/category.mock';
import { TranslateService } from '@ngx-translate/core';
import { SpotlightDataInterface } from '../model/spotlight-data.interface';

describe('SpotlightService', () => {
    let entitiesServices: jasmine.SpyObj<EntitiesService>;
    let stateService: jasmine.SpyObj<StateService>;
    let translateService: jasmine.SpyObj<TranslateService>;
    const analyticsServiceSpy: jasmine.SpyObj<AnalyticsService> = jasmine.createSpyObj('AnalyticsService', ['sendEventTrack']);
    let analyticsServiceMock: AnalyticsService;
    let spotlightService: SpotlightService;

    const spotLightExecutedForCategory1: SpotlightDataInterface = {
        title: 'Un mundo mejor es posible',
        subtitle: 'May 2019',
        label: 'hello',
        ratio: 0.7070,
        imagesIds: ['5453725'],
        imageAction: {
            buttonTitle: 'semoreinfo-translated',
            buttonAction: 'goto',
            params: {
                state: 'issue',
                params: {itemId: '4A4D0387E848183B5404858185FE3CC9'},
                analytics: {
                    action: 'se_spotlight_click',
                    params: {
                        spotlightItemReferenceType: 'category',
                        categoryName: 'coucou',
                        titleName: 'Alienta Editorial',
                        issueName: 'Un mundo mejor es posible',
                    }
                }
            }
        },
        listButtons: [
            {
                buttonTitle: 'seread-translated',
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

    const spotLightExecutedForIssue1: SpotlightDataInterface = {
        title: 'Un mundo mejor es posible',
        subtitle: 'May 2019',
        label: 'hello',
        ratio: 0.7070,
        imagesIds: ['5453725'],
        imageAction: {
            buttonTitle: 'semoreinfo-translated',
            buttonAction: 'goto',
            params: {
                state: 'issue',
                params: {itemId: '4A4D0387E848183B5404858185FE3CC9'},
                analytics: {
                    action: 'se_spotlight_click',
                    params: {
                        spotlightItemReferenceType: 'issue',
                        categoryName: 'Un mundo mejor es posible',
                        titleName: 'Alienta Editorial',
                        issueName: 'Un mundo mejor es posible',
                    }
                }
            }
        },
        listButtons: [
            {
                buttonTitle: 'seread-translated',
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

    beforeEach(() => {
        entitiesServices = jasmine.createSpyObj('TitlesService', [
            'getEntityItems',
            'getEntityDetails',
        ]);

        stateService = jasmine.createSpyObj('StateService', ['go']);
        stateService.params = {
            $inherit: () => null,
            locale: 'en'
        };
        translateService = jasmine.createSpyObj('TranslateService', ['instant']);
        translateService.instant.and.callFake(key => key + '-translated');

        TestBed.configureTestingModule({
            providers: [
                {provide: EntitiesService, useValue: entitiesServices},
                {provide: StateService, useValue: stateService},
                {provide: TranslateService, useValue: translateService},
                {provide: AnalyticsService, useValue: analyticsServiceSpy}
            ]
        });
        analyticsServiceMock = TestBed.get(AnalyticsService);
        spotlightService = TestBed.get(SpotlightService);
    });

    it('should return a spotlight model from a category with a custom reference', (done) => {
        const data: SpotlightInfoInterface = {
            type: 'category',
            data: {
                reference: '1',
                label: 'hello'
            }
        };

        entitiesServices.getEntityItems.and.returnValue(of(<ApiResponseArray<any>>{data: [issue1, issue2], moreToLoad: false}));
        entitiesServices.getEntityDetails.and.returnValue(of(category1));

        spotlightService.getSpotlight(data).subscribe((spotlight) => {
            expect(spotlight).toEqual(spotLightExecutedForCategory1);
            done();
        });
    });

    it('should return a spotlight model from an issue reference', (done) => {
        const data: SpotlightInfoInterface = {
            'data': {
                'label': 'hello',
                'reference': 'C872ED61201C4C57994DFA35C6F20BD9',
            },
            'options': {
                'subtitleField': 'publicationDate',
                'titleField': 'defaultName'
            },
            'type': 'ISSUE',
        };

        entitiesServices.getEntityDetails.and.returnValue(of(issue1));

        spotlightService.getSpotlight(data).subscribe((spotlight) => {
            expect(spotlight).toEqual(spotLightExecutedForIssue1);
            done();
        });
    });

    it('should execute a goTo action', () => {
        const action = {
            buttonTitle: 'seread-translated',
            buttonAction: SpotlightActions.GOTO,
            params: {
                state: 'read',
                params: {itemId: 'issueId'},
                analytics: {
                    action: 'ks_read',
                    params: {
                        titleName: 'Alienta Editorial',
                        issueName: 'Un mundo mejor es posible',
                    }
                }
            },
        };
        spotlightService.executeAction(action);
        expect(stateService.go).toHaveBeenCalledWith(action.params.state, action.params.params);
    });
});
