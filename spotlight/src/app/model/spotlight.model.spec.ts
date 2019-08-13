import { SpotlightWidgetModel } from './spotlight.model';
import { SpotlightWrapperComponent } from '../component/spotlight-wrapper.component';

describe('SpotlightWidgetModel', () => {
    it('should return is the widget is hidden', () => {
        expect(SpotlightWidgetModel.isHidden({
            data: {
                hidden: true
            }
        })).toBe(true);
        expect(SpotlightWidgetModel.isHidden({
            data: {
                hidden: false
            }
        })).toBe(false);
    });
    it('should return whether the data matches the widget type', () => {
        expect(SpotlightWidgetModel.matchData({
            type: 'ISSUE',
            data: {
                render: 'Card'
            }
        })).toBe(true);
        expect(SpotlightWidgetModel.matchData({
            type: 'CATEGORY',
            data: {
                render: 'Card'
            }
        })).toBe(true);
        expect(SpotlightWidgetModel.matchData({
            type: 'CATEGORY',
            data: {
                render: 'Other'
            }
        })).toBe(false);
        expect(SpotlightWidgetModel.matchData({
            type: 'OTHER',
            data: {
                render: 'Card'
            }
        })).toBe(false);
    });
    it('should return the component class', () => {
        expect(SpotlightWidgetModel.getComponent()).toBe(SpotlightWrapperComponent);
    });
});

