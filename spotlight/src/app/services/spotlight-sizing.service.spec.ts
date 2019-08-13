import { SpotlightSizingService } from './spotlight-sizing.service';
import {async, TestBed} from '@angular/core/testing';
import {WINDOW} from '@aqf/window';
import {cold, hot} from 'jasmine-marbles';

describe('SpotlightSizingService', () => {
    let service: SpotlightSizingService;
    let window: any;
    let expected: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: WINDOW, useValue: {}}
            ]
        });
    });
    beforeEach(() => {
        service = TestBed.get(SpotlightSizingService);
        window = TestBed.get(WINDOW);
        service.fromObservable$ = hot(' ^--a', {a: new Event('resize')});
        service.ofObservable$   = cold('-------');
    });

    describe('Breakpoints on application initialization', () => {
        it('should be "xs" on small devices', async(() => {
            window.innerWidth = 766;
            expected = {b: 'xs'};
            expect(service.getBreakPoint())
                .toBeObservable(cold('---b-', expected));
        }));

        it('should be "md" on medium devices', () => {
            window.innerWidth = 900;
            expected = {b: 'md'};
            expect(service.getBreakPoint())
                .toBeObservable(cold('---b-', expected));
        });
        it('should be "lg" on large devices', () => {
            window.innerWidth = 1770;
            expected = {b: 'lg'};
            expect(service.getBreakPoint())
                .toBeObservable(cold('---b-', expected));
        });
    });

});
