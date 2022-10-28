import { ReactElement, createElement } from "react";
import { TabBadgeStyleEnum, TabListType } from "typings/TabContainerPluggableProps";
import TabTag from "./TabTag";

type tabTagsProps = {
    tabList: TabListType[];
    currentTabIndex: number;
    badgeStyle: TabBadgeStyleEnum;
    onTabClick: (tab: TabListType, index: number) => void;
};

function TabTags({ tabList, currentTabIndex, onTabClick, badgeStyle }: tabTagsProps): ReactElement {
    return (
        <div className={"tcp-tab-tags"}>
            {tabList.map((tab, index) => 
                <TabTag
                    key={index}
                    isCurrentTab={currentTabIndex === index}
                    onTabClick={() => onTabClick(tab, index)}
                    tabCaptionType={tab.tabCaptionType}
                    tabCaptionText={tab.tabCaptionText.value as string}
                    tabCaptionHTML={tab.tabCaptionHTML.value as string}
                    tabCaptionContent={tab.tabCaptionContent}
                    badgeStyle={badgeStyle}
                    badgeContent={tab.tabBadge?.value as string}
                />
            )}
        </div>
    );
}
export default TabTags;
