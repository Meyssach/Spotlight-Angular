import {CCTitle} from './cc-title.interface';

/**
 * A title from CloudConnect application API.
 * Note: The typings could be stricter.
 */
export class Title {
    id: string;
    name: string;
    categories: unknown[];
    creationDate: string;
    defaultName: string;
    description: string;
    headerText: string;
    headerImages: string[];
    iconId: string;
    icons: string[];
    languageCode: string;
    metadata?: {
        physicalData?: {
            cover?: {
                height: number,
                width: number,
            }
        }
    };
    periodicity: string;
    products: unknown[];
    type: string;
    version: string;
    resources: any;
    data: any;

    constructor(jsonTitle: CCTitle) {
        Object.assign(this, jsonTitle.title);
        if (this.metadata && this.metadata.physicalData && this.metadata.physicalData.cover) {
            this.metadata.physicalData.cover.width = parseInt(jsonTitle.title.metadata.physicalData.cover.width, 10);
            this.metadata.physicalData.cover.height = parseInt(jsonTitle.title.metadata.physicalData.cover.height, 10);
        }
    }
}
