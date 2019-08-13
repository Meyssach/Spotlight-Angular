import { KyashuImageService } from '@aqf/stitch-image';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {SpotlightSizingService} from '../services/spotlight-sizing.service';
import {Observable, Subject, combineLatest} from 'rxjs';
import {SpotlightDataInterface} from '../model/spotlight-data.interface';
import {SpotlightActionButtonsDataInterface} from '../model/spotlight-action-buttons-data.interface';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'aqf-spotlight',
    templateUrl: './spotlight.component.html',
    styleUrls: ['./spotlight.component.less'],
})
export class SpotlightComponent implements OnInit, OnDestroy {
    @Input() spotlightData: Observable<SpotlightDataInterface>;
    @Output() spotlightClick: EventEmitter<SpotlightActionButtonsDataInterface> =
        new EventEmitter<SpotlightActionButtonsDataInterface>();

    imageHeight: number;
    imageWidth: number;
    onDestroy$: Subject<void> = new Subject();
    widgetDatas: SpotlightDataInterface;

    imageSrc: string;

    heights = {
        xs: 260,
        md: 295,
        lg: 376,
    };

    paddings = {
        xs: 30,
        md: 40,
        lg: 46,
    };

    constructor(
        private sizingService: SpotlightSizingService,
        private kyashuImageService: KyashuImageService
    ) {}

    ngOnInit() {
        this.spotlightData
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(data => {
                this.widgetDatas = data;
            });

        combineLatest(
            this.sizingService.getBreakPoint(),
            this.spotlightData
        )
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(([value, widgetDatas]) => {
                this.imageHeight = this.heights[value] - this.paddings[value];
                this.imageWidth = widgetDatas.ratio * this.imageHeight;

                this.imageSrc = this.kyashuImageService.getImageUrlWithKyashuIds(
                    widgetDatas.imagesIds,
                    this.imageWidth,
                    this.imageHeight,
                    false
                );
            });
    }

    buttonClick(event: SpotlightActionButtonsDataInterface) {
        this.spotlightClick.emit(event);
    }

    ngOnDestroy(): void {
        this.onDestroy$.next();
    }
}
