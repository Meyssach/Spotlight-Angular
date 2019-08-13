import {Component, OnInit} from '@angular/core';
import {WidgetComponentInterface} from '@aqf/stitch-core';
import {SpotlightService} from '../services/spotlight.service';
import {SpotlightInfoInterface} from '../model/spotlight-info.interface';
import {Observable} from 'rxjs';
import { SpotlightDataInterface } from '../model/spotlight-data.interface';
import { SpotlightActionButtonsDataInterface } from '../model/spotlight-action-buttons-data.interface';

@Component({
    selector: 'aqf-sm-element-spotlight-wrapper',
    templateUrl: './spotlight-wrapper.component.html',
})
export class SpotlightWrapperComponent implements WidgetComponentInterface, OnInit {
    data: SpotlightInfoInterface;
    spotlightData: Observable<SpotlightDataInterface>;

    constructor(private spotlightService: SpotlightService) {
    }

    ngOnInit() {
        this.spotlightData = this.spotlightService.getSpotlight(this.data);
    }

    onClick(event: SpotlightActionButtonsDataInterface) {
        if (event !== null) {
            this.spotlightService.executeAction(event);
        }
    }
}
