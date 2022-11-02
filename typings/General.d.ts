export type Tab = {
    captionType: TabCaptionTypeEnum;
    captionText: string;
    captionHTML: string;
    captionContent: ReactElement;
    onSelect: () => void;
    badgeText?: string;
};
