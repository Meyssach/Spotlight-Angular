import { issue1, issue2 } from './../models/issue.mock';
import { title1, title2 } from './../models/title.mock';
import { category1 } from './../models/category.mock';
import {TitlesService} from './titles.service';
import {CategoriesService} from './categories.service';
import {IssuesService} from './issues.service';
import {TestBed} from '@angular/core/testing';

import {EntitiesService} from './entities.service';
import { of } from 'rxjs';
import { EntityTypes } from '../models/entity-types.enum';

describe('EntitiesService', () => {
    let titlesService: jasmine.SpyObj<TitlesService>;
    let categoriesService: jasmine.SpyObj<CategoriesService>;
    let issuesService: jasmine.SpyObj<IssuesService>;
    let service: EntitiesService;
    beforeEach(() => {
        titlesService = jasmine.createSpyObj('TitlesService', [
            'get',
            'getAllTitles',
            'getTitleContent',
        ]);
        categoriesService = jasmine.createSpyObj('CategoriesService', [
            'get',
            'getContent',
        ]);
        issuesService = jasmine.createSpyObj('IssuesService', [
            'getIssueById',
        ]);
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: TitlesService,
                    useValue: titlesService,
                },
                {
                    provide: CategoriesService,
                    useValue: categoriesService,
                },
                {
                    provide: IssuesService,
                    useValue: issuesService,
                },
            ],
        });
    });
    beforeEach(() => {
        service = TestBed.get(EntitiesService);
    });
    describe('get entity details', () => {
        it('should return a Category\'s details', (done) => {
            categoriesService.get.and.returnValue(of(category1));
            const titleDetails$ = service.getEntityDetails(EntityTypes.Category, 'myCategoryReference');

            titleDetails$.subscribe(details => {
                expect(details).toEqual(category1);
                done();
            });
            expect(categoriesService.get).toHaveBeenCalledWith('myCategoryReference');
        });
        it('should return a Title\'s details', (done) => {
            titlesService.get.and.returnValue(of(title1));
            const titleDetails$ = service.getEntityDetails(EntityTypes.Title, 'myTitleReference');

            titleDetails$.subscribe(details => {
                expect(details).toEqual(title1);
                done();
            });
            expect(titlesService.get).toHaveBeenCalledWith('myTitleReference');
        });
        it('should return an Issue\'s details', (done) => {
            issuesService.getIssueById.and.returnValue(of(issue1));
            const titleDetails$ = service.getEntityDetails(EntityTypes.Issue, 'myIssueReference');

            titleDetails$.subscribe(details => {
                expect(details).toEqual(issue1);
                done();
            });
            expect(issuesService.getIssueById).toHaveBeenCalledWith('myIssueReference');
        });
    });

    describe('get entity contents', () => {
        it('should return a Title\'s contents', (done) => {
            titlesService.getTitleContent.and.returnValue(of({
                data: [issue1, issue2],
                moreToLoad: false
            }));
            const titleDetails$ = service.getEntityItems(EntityTypes.Title, 'myTitleReference', 10, 0);

            titleDetails$.subscribe(details => {
                expect(details).toEqual({
                    data: [issue1, issue2],
                    moreToLoad: false
                });
                done();
            });
            expect(titlesService.getTitleContent).toHaveBeenCalledWith('myTitleReference', 10, 0);
        });
        it('should return a Category\'s contents', (done) => {
            categoriesService.getContent.and.returnValue(of({
                data: [issue1, issue2],
                moreToLoad: false
            }));
            const titleDetails$ = service.getEntityItems(EntityTypes.Category, 'myCategoryReference', 10, 0);

            titleDetails$.subscribe(details => {
                expect(details).toEqual({
                    data: [issue1, issue2],
                    moreToLoad: false
                });
                done();
            });
            expect(categoriesService.getContent).toHaveBeenCalledWith('myCategoryReference', 10, 0);
        });
        it('should return all Titles', (done) => {
            titlesService.getAllTitles.and.returnValue(of({
                data: [title1, title2],
                moreToLoad: false
            }));
            const allTitles$ = service.getEntityItems(EntityTypes.AllTitles, null, 10, 0);

            allTitles$.subscribe(titles => {
                expect(titles).toEqual({
                    data: [title1, title2],
                    moreToLoad: false
                });
                done();
            });
            expect(titlesService.getAllTitles).toHaveBeenCalledWith(10, 0);
        });
    });
});
