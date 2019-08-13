import {Inject, Injectable} from '@angular/core';
import {fromEvent, Observable, merge, of} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {WINDOW} from '@aqf/window';

const X_SMALL_BREAKPOINT_PX = 768;
const MEDIUM_BREAKPOINT_PX = 992;

@Injectable({
    providedIn: 'root',
})
export class SpotlightSizingService {
    // The ofObservable is used to fetch the window size when then component
    // is initially loaded, because no window.resize event is triggered in this case
    ofObservable$ = of({currentTarget: this.window});

    // Create a hot observable based on the window.resize event
    fromObservable$ = fromEvent(this.window, 'resize');

    constructor(@Inject(WINDOW) private window: any) {}

    getBreakPoint(): Observable<string> {
        return merge(this.ofObservable$, this.fromObservable$).pipe(
            map(() => {
                return this.computeViewSize();
            }),
            distinctUntilChanged()
        );
    }

    getInnerWidth(): Observable<number> {
        return merge(this.ofObservable$, this.fromObservable$).pipe(
            map(() => {
                return this.window.innerWidth;
            }),
            distinctUntilChanged()
        );
    }

    /**
     * Using the window.innerWidth property, return a string representation of the size.
     *
     * The sizes are based on Bootstrap's responsive breakpoints
     */
    private computeViewSize() {
        const viewport = this.window.innerWidth;
        return viewport < X_SMALL_BREAKPOINT_PX ? 'xs' : viewport < MEDIUM_BREAKPOINT_PX ? 'md' : 'lg';
    }
}
