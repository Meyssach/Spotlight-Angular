export interface SpotlightInfoInterface {
    data: {
        customReference?: string;
        label: string;
        reference: string;
    };
    type: string;
    options?: {
        titleField: string;
        subtitleField: string;
    };
}
