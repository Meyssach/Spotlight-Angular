import {Type} from '@angular/core';
import {WidgetModelInterface, WidgetComponentInterface} from '@aqf/stitch-core';
import {SpotlightWrapperComponent} from '../component/spotlight-wrapper.component';

export class SpotlightWidgetModel implements WidgetModelInterface {
    static isHidden(data): boolean {
        return data.data.hidden === true;
    }

    static matchData(data: any): boolean {
        return data.data.render === 'Card' && (data.type === 'ISSUE' || data.type === 'CATEGORY');
    }

    static getComponent(): Type<WidgetComponentInterface> {
        return SpotlightWrapperComponent;
    }
}
