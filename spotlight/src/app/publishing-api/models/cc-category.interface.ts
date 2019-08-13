export interface CCCategory {
    category: {
        childCount: number;
        defaultName: string;
        description: string;
        fillMethod: string;
        headerImages: {
            id: string;
        }[];
        headerText: string;
        id: string;
        images: string[]
        index: string;
        issueCount: number;
        itemsCount: number;
        kind: string;
        mediaUrls: string[];
        metadata?: {
            physicalData?: {
                cover?: {
                    height: string,
                    width: string,
                }
            }
        };
        name: string;
        query: unknown;
        typeContained: string;
    };
}
