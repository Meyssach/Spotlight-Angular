import { jsonIssue1, issue1 } from './../models/issue.mock';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {CCIssue} from '../models/cc-issue.interface';
import {CCResponseEntity} from '../models/cc-response-entity.interface';
import {Issue} from '../models/issue.class';
import {HttpClientModule} from '@angular/common/http';
import {IssuesService} from './issues.service';

describe('IssuesService', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let service: IssuesService;
    let httpTestController: HttpTestingController;

    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
            HttpClientModule
        ]
    }));

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = TestBed.get(IssuesService);
        httpTestController = TestBed.get(HttpTestingController);
    });

    it('should get issues by their Id', function () {
        const serverSentData: CCResponseEntity<CCIssue> = {
                data: jsonIssue1,
                result: {
                    message: 'random message',
                    status: 'ok',
                }
            }
        ;

        const expected: Issue = issue1;

        service.getIssueById('1').subscribe((result: Issue) => {
            expect(result).toEqual(expected);
        });

        const endPoint = '/api/issue/get/?issueId=1';
        const request = httpTestController.expectOne(endPoint);
        expect(request.request.method).toEqual('GET');
        request.flush(serverSentData);
        httpTestController.verify();
    });
});
