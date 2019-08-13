import {jsonTitle1, title2, jsonTitle2} from './../models/title.mock';
import {TestBed} from '@angular/core/testing';

import {TitlesService} from './titles.service';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';
import {title1} from '../models/title.mock';
import {issue1, jsonIssue1} from '../models/issue.mock';


describe('TitlesService', () => {
    let service: TitlesService;
    let httpTestController: HttpTestingController;

    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ]
    }));
    beforeEach(() => {
        service = TestBed.get(TitlesService);
        httpTestController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpTestController.verify();
    });

    it('should return the detail of a title', (done) => {
        service.get('myTitleId').subscribe(title => {
            expect(title).toEqual(title1);
            done();
        });

        httpTestController
            .match(request => {
                return request.urlWithParams === '/api/title/get/?titleId=myTitleId';
            })[0]
            .flush({
                data: jsonTitle1,
                result: {
                    status: '0',
                    message: '',
                }
            });
        httpTestController.verify();
    });

    it('should return all titles', (done) => {
        service.getAllTitles(10, 5).subscribe(titlesResponse => {
            expect(titlesResponse).toEqual({
                data: [title1, title2],
                moreToLoad: false,
            });
            done();
        });

        httpTestController
            .match(request => {
                return request.url === '/api/title/getAll'
                    && request.params.get('limit') === '10'
                    && request.params.get('offset') === '5';
            })[0]
            .flush({
                data: {
                    titles: [
                        jsonTitle1,
                        jsonTitle2
                    ]
                },
                result: {
                    status: '0',
                    message: '',
                }
            });
        httpTestController.verify();
    });

    it('should get titles content', (done) => {
        const serverSentData = {
            data: {
                issues: [jsonIssue1],
                moreToLoad: true,
                totalCount: null,
                typeContained: 'aqf\cloudconnect\data\application\Issue'
            },
            result: {
                message: 'random message',
                status: 'ok'
            }
        };

        service.getTitleContent('2', 10).subscribe((result) => {
            expect(result).toEqual({
                data: [issue1],
                moreToLoad: true
            });
            done();
        });

        httpTestController
            .match(request => {
                return request.url === '/api/issue/getAll'
                    && request.params.get('limit') === '10'
                    && request.params.get('offset') === '0';
            })[0]
            .flush(serverSentData);
        httpTestController.verify();
    });
});
