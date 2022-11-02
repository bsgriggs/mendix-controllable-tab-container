import { ReactElement, createElement } from "react";
import { 
    // CurrentTabStyleEnum, 
    TabBadgeStyleEnum, TabListType } from "typings/ControllableTabContainerProps";
import TabTag from "./TabTag";

type tabTagsProps = {
    tabList: TabListType[];
    currentTabIndex: number;
    // currentTabStyle: CurrentTabStyleEnum;
    badgeStyle: TabBadgeStyleEnum;
    onTabClick: (tab: TabListType, index: number) => void;
};

function TabTags({ tabList, currentTabIndex, onTabClick,
    //  currentTabStyle, 
     badgeStyle }: tabTagsProps): ReactElement {
    return (
        <div className={"ctc-tab-tags"}>
            {tabList.map((tab, index) => (
                <TabTag
                    key={index}
                    isCurrentTab={currentTabIndex === index}
                    onTabClick={() => onTabClick(tab, index)}
                    tabCaptionType={tab.tabCaptionType}
                    tabCaptionText={tab.tabCaptionText.value as string}
                    tabCaptionHTML={tab.tabCaptionHTML.value as string}
                    tabCaptionContent={tab.tabCaptionContent}
                    // currentTabStyle={currentTabStyle}
                    badgeStyle={badgeStyle}
                    badgeContent={tab.tabBadge?.value as string}
                />
            ))}
        </div>
    );
}
export default TabTags;
