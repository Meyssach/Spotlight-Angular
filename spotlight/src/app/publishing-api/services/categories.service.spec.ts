import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {CategoriesService} from './categories.service';
import {CCResponseEntity} from '../models/cc-response-entity.interface';
import {CCCategory} from '../models/cc-category.interface';
import {Category} from '../models/category.class';
import {category1, jsonCategory1} from '../models/category.mock';
import {jsonTitle1, jsonTitle2, title1, title2} from '../models/title.mock';

describe('CategoriesService', () => {
    let categoriesService: CategoriesService;
    let httpTestController: HttpTestingController;

    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ]
    }));

    beforeEach(() => {
        categoriesService = TestBed.get(CategoriesService);
        httpTestController = TestBed.get(HttpTestingController);
    });

    it('should get categories', () => {
        const serverSentData: CCResponseEntity<CCCategory> = {
            data: jsonCategory1,
            result: {
                message: 'random message',
                status: 'ok'
            }
        };

        categoriesService.get('1').subscribe((result: Category) => {
            expect(result).toEqual(category1);
        });

        const endPoint = '/api/category/get/?categoryId=1';
        const request = httpTestController.expectOne(endPoint);
        expect(request.request.method).toEqual('GET');
        request.flush(serverSentData);
        httpTestController.verify();
    });

    it('should get categories content', (done) => {
        const serverSentData = {
            data: {
                content: {
                    categories: [],
                    typeContained: 'aqf\\cloudconnect\\data\\application\\Title',
                    totalCount: 0,
                    moreToLoad: true,
                    titles: [jsonTitle1, jsonTitle2]
                }
            },
            result: {
                message: 'random message',
                status: 'ok'
            }
        };

        categoriesService.getContent('2', 10).subscribe((result) => {
            expect(result).toEqual({
                data: [title1, title2],
                moreToLoad: true
            });
            done();
        });

        httpTestController
            .match(request => {
                return request.url === '/api/category/getContent'
                    && request.params.get('limit') === '10'
                    && request.params.get('offset') === '0';
            })[0]
            .flush(serverSentData);
        httpTestController.verify();
    });
});
