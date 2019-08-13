import {SpotlightService} from '../services/spotlight.service';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SpotlightWrapperComponent} from './spotlight-wrapper.component';
import {By} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {SpotlightActions} from '../model/actions/spolight-actions.enum';
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'aqf-spotlight',
    template: ''
})
class FakeSpotlightComponent {
    @Input() spotlightData;
    @Output() spotlightClick: EventEmitter<void> = new EventEmitter();
}

describe('SpotlightWrapperComponent', () => {
    let spotlightService: jasmine.SpyObj<SpotlightService>;

    let fixture: ComponentFixture<SpotlightWrapperComponent>;
    let spotlightWrapperComponent: SpotlightWrapperComponent;
    let spotlightData: any;
    let spotlightData$: Observable<any>;
    beforeEach(() => {
        spotlightService = jasmine.createSpyObj('SpotlightService', ['getSpotlight', 'executeAction']);
        spotlightData = {listButtons: [{buttonKey: SpotlightActions.GOTO, params: 'fake params'}]};
        spotlightData$ = of(spotlightData);
        spotlightService.getSpotlight.and.returnValue(spotlightData$);
        spotlightService.executeAction.and.returnValue(spotlightData$);
        TestBed.configureTestingModule({
            providers: [
                {provide: SpotlightService, useValue: spotlightService}],
            declarations: [SpotlightWrapperComponent, FakeSpotlightComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(SpotlightWrapperComponent);
        spotlightWrapperComponent = fixture.componentInstance;
    });
    it('should create', () => {
        expect(spotlightWrapperComponent).toBeDefined();
    });

    it('should have spotlightDatas', () => {
        const fakeSpotlight: FakeSpotlightComponent = fixture.debugElement.query(By.directive(FakeSpotlightComponent)).componentInstance;
        fixture.detectChanges();
        expect(fakeSpotlight.spotlightData).toEqual(spotlightData$);
    });

    it('should trigger an event click and call the execute action', () => {
        const fakeSpotlight: FakeSpotlightComponent = fixture.debugElement.query(By.directive(FakeSpotlightComponent)).componentInstance;
        fixture.detectChanges();
        fakeSpotlight.spotlightClick.emit(spotlightData.listButtons[0]);
        expect(spotlightService.executeAction).toHaveBeenCalledWith({buttonKey: SpotlightActions.GOTO, params: 'fake params'});
        expect(spotlightService.executeAction).toHaveBeenCalledTimes(1);
        fakeSpotlight.spotlightClick.emit(null);
        expect(spotlightService.executeAction).toHaveBeenCalledTimes(1);
    });
});
