import {SpotlightActionButtonsDataInterface} from './spotlight-action-buttons-data.interface';

export interface SpotlightDataInterface {
    label?: string;
    title: string;
    subtitle?: string;
    imagesIds: Array<string>;
    ratio: number;
    imageAction: SpotlightActionButtonsDataInterface;
    listButtons: Array<SpotlightActionButtonsDataInterface>;
}
