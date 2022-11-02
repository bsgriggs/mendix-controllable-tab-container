import { ReactElement, createElement } from "react";
import { BadgeDirectionEnum, BadgeStyleEnum, CaptionTypeEnum } from "../../typings/ControllableTabContainerProps";
import Badge from "./Badge";

type tabTagProps = {
    isCurrentTab: boolean;
    captionType: CaptionTypeEnum;
    captionText: string;
    captionHTML: string;
    captionContent: ReactElement;
    badgeStyle: BadgeStyleEnum;
    badgeText?: string;
    badgeDirection: BadgeDirectionEnum;
    onSelect: () => void;
};

function TabTag({
    isCurrentTab,
    captionType,
    captionContent,
    captionText,
    captionHTML,
    onSelect,
    badgeStyle,
    badgeText,
    badgeDirection
}: tabTagProps): ReactElement {
    const renderCaption = (): ReactElement => {
        switch (captionType) {
            case "text":
                return <span className="mx-text">{captionText}</span>;
            case "html":
                return (
                    <span
                        dangerouslySetInnerHTML={{
                            __html: captionHTML
                        }}
                    ></span>
                );
            case "custom":
                return captionContent;
        }
    };

    return (
        <div
            className={
                isCurrentTab
                    ? `ctc-tab-tag ctc-tab-tag-active ctc-badge-${badgeDirection}`
                    : `ctc-tab-tag ctc-badge-${badgeDirection}`
            }
            onClick={() => onSelect()}
        >
            {renderCaption()}
            <Badge style={badgeStyle} text={badgeText} />
        </div>
    );
}
export default TabTag;
