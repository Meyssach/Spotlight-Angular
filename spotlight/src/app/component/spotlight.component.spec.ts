import { KyashuImageService } from '@aqf/stitch-image';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SpotlightComponent} from './spotlight.component';
import {Component, DebugElement, Input} from '@angular/core';
import {SpotlightDataInterface} from '../model/spotlight-data.interface';
import {By} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import { SpotlightSizingService } from '../services/spotlight-sizing.service';

@Component({
    selector: 'aqf-view-test',
    template: '<aqf-spotlight [spotlightData]="spotlightData$" (spotlightClick)="test($event)"></aqf-spotlight>',
})
class TestComponent {
    test = jasmine.createSpy();
    spotlightData$: Observable<SpotlightDataInterface>;
}

@Component({
    selector: 'aqf-stitch-image-kyashu-img',
    template: '',
})
class StitchImageMockComponent {
    @Input() imagesIds: any;
    @Input() imageHeight: any;
    @Input() imageWidth: any;
    @Input() imageAltText: any;
}

describe('SpotlightComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let submitEl: DebugElement;
    let submitElements: Array<DebugElement>;
    let spotlightSizingService: jasmine.SpyObj<SpotlightSizingService>;
    let kyashuImageService: jasmine.SpyObj<KyashuImageService>;
    let spotlightData: SpotlightDataInterface;
    let spotlightData$: Observable<SpotlightDataInterface>;

    beforeEach(() => {
        spotlightSizingService = jasmine.createSpyObj('SpotlightSizingService', [
            'getBreakPoint',
            'getInnerWidth',
        ]);
        kyashuImageService = jasmine.createSpyObj('KyashuImageService', [
            'getImageUrlWithKyashuIds',
        ]);
        TestBed.configureTestingModule({
            declarations: [
                SpotlightComponent,
                TestComponent,
                StitchImageMockComponent,
            ],
            imports: [],
            providers: [
                {provide: SpotlightSizingService, useValue: spotlightSizingService},
                {provide: KyashuImageService, useValue: kyashuImageService},
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        spotlightSizingService.getBreakPoint.and.returnValue(of('md'));
        spotlightSizingService.getInnerWidth.and.returnValue(of(480));
        kyashuImageService.getImageUrlWithKyashuIds.and.returnValue('http://imgsrc.com/image.png');
        spotlightData = {
            label: 'testSpotlightLabel',
            title: 'testFirstField',
            subtitle: 'testSecondField',
            imagesIds: ['959765'],
            ratio: 1,
            imageAction: {
                buttonTitle: 'More info',
                buttonAction: 'actionMore',
                filled: false,
            },
            listButtons: [
                {
                    buttonTitle: 'Read',
                    buttonAction: 'actionRead',
                    filled: true,
                },
                {
                    buttonTitle: 'Download',
                    buttonAction: 'actionDownload',
                    filled: false,
                },
            ],
        };
        spotlightData$ = of(spotlightData);

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

        component.spotlightData$ = spotlightData$;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the image', () => {
        const debugElement = fixture.debugElement.query(By.css('.aqf-stitch-spotlight-image-wrapper img'));
        expect(debugElement.nativeElement.src).toBe('http://imgsrc.com/image.png');
        expect(kyashuImageService.getImageUrlWithKyashuIds).toHaveBeenCalledWith([ '959765' ], 255, 255, false);
    });

    it('should display spotlight label ', () => {
        const debugElement = fixture.debugElement.query(
            By.css('.aqf-stitch-spotlight-infos-label')
        );
        expect(debugElement.nativeElement.textContent).toContain(
            'testSpotlightLabel'
        );
    });

    it('should display spotlight first field ', () => {
        const debugElement = fixture.debugElement.query(
            By.css('.aqf-stitch-spotlight-infos-title')
        );
        expect(debugElement.nativeElement.textContent).toContain(
            'testFirstField'
        );
    });

    it('should display spotlight second field ', () => {
        const debugElement = fixture.debugElement.query(
            By.css('.aqf-stitch-spotlight-infos-subtitle')
        );
        expect(debugElement.nativeElement.textContent).toContain(
            'testSecondField'
        );
    });

    it('should emit an action button event', () => {
        submitEl = fixture.debugElement.query(By.css('.aqf-btn-round-primary'));
        submitEl.nativeElement.click();
        fixture.detectChanges();
        expect(component.test).toHaveBeenCalledWith(spotlightData.listButtons[0]);
    });

    it('should display all the buttons passed in the input ', () => {
        submitElements = fixture.debugElement.queryAll(
            By.css('.aqf-btn-round-primary, .aqf-btn-round-outline-primary')
        );
        expect(submitElements.length).toEqual(2);
    });
});
