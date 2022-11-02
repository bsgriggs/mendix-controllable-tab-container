import { ReactElement, createElement } from "react";
import {
    BadgeDirectionEnum,
    BadgeStyleEnum,
} from "typings/ControllableTabContainerProps";
import TabTag from "./TabTag";
import {Tab} from "../../typings/General";


type tabTagsProps = {
    tabList: Tab[];
    currentTabIndex: number;
    badgeStyle: BadgeStyleEnum;
    badgeDirection: BadgeDirectionEnum;
};

function TabTags({
    tabList,
    currentTabIndex,
    badgeStyle,
    badgeDirection
}: tabTagsProps): ReactElement {
    return (
        <div className={"ctc-tab-tags"}>
            {tabList.map((tab, index) => (
                <TabTag
                    key={index}
                    isCurrentTab={currentTabIndex === index}
                    onSelect={() => tab.onSelect()}
                    captionType={tab.captionType}
                    captionText={tab.captionText}
                    captionHTML={tab.captionHTML}
                    captionContent={tab.captionContent}
                    badgeStyle={badgeStyle}
                    badgeText={tab.badgeText}
                    badgeDirection={badgeDirection}
                />
            ))}
        </div>
    );
}
export default TabTags;
