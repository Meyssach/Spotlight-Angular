export interface CCTitle {
    title: {
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
                    height: string,
                    width: string,
                }
            }
        };
        periodicity: string;
        products: unknown[];
        type: string;
        version: string;
    };
}
