import {CCCategory} from './cc-category.interface';

/**
 * A category from CloudConnect application API.
 * Note: The typings could be stricter.
 */

export class Category {
    childCount: number;
    defaultName: string;
    description: string;
    fillMethod: string;
    headerImages: {
        id: string;
    }[];
    headerText: string;
    id: string;
    images: string[];
    index: string;
    issueCount: number;
    itemsCount: number;
    kind: string;
    mediaUrls: string[];
    metadata?: {
        physicalData?: {
            cover?: {
                height: number,
                width: number,
            }
        }
    };
    name: string;
    query: unknown;
    typeContained: string;

    constructor(jsonCategory: CCCategory) {
        Object.assign(this, jsonCategory.category);
        if (this.metadata && this.metadata.physicalData && this.metadata.physicalData.cover) {
            this.metadata.physicalData.cover.width = parseInt(jsonCategory.category.metadata.physicalData.cover.width, 10);
            this.metadata.physicalData.cover.height = parseInt(jsonCategory.category.metadata.physicalData.cover.height, 10);
        }
    }
}
