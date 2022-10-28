import { ReactElement, createElement, Fragment } from "react";
import { TabContainerPluggablePreviewProps, TabListPreviewType } from "../typings/TabContainerPluggableProps";
import TabContent from "./components/TabContent";
import Tab from "./components/TabTag";

const sortTabList = (a: TabListPreviewType, b: TabListPreviewType): number => {
    if (a.tabSort !== undefined && b.tabSort !== undefined) {
        const tabA = parseFloat(a.tabSort);
        const tabB = parseFloat(b.tabSort);
        return tabA - tabB;
    } else return 0;
};

const noContent: ReactElement = <span className="mx-text">No Content</span>;

export function preview({
    tabListType,
    tabBadgeStyle,
    tabList,
    tabCaptionTypeDynamic,
    tabCaptionTextDynamic,
    tabCaptionHTMLDynamic,
    tabContentDynamic,
    tabBadgeDynamic
}: TabContainerPluggablePreviewProps): ReactElement {
    //filter out any that are not visible then sort
    const adjustTabList = tabList.filter(tab => tab.tabVisible).sort(sortTabList);

    return (
        <div className={"tcp"}>
            <div className={"tcp-tabs"}>
                {tabListType === "static" && adjustTabList !== undefined && (
                    <Fragment>
                        <span> Static w/ content</span>
                        {adjustTabList.map((tab, index) => {
                            <Tab
                                key={index}
                                isCurrentTab={index === 1}
                                // eslint-disable-next-line @typescript-eslint/no-empty-function
                                onTabClick={() => {}}
                                tabCaptionType={tab.tabCaptionType}
                                tabCaptionText={tab.tabCaptionText}
                                tabCaptionHTML={tab.tabCaptionHTML}
                                tabCaptionContent={<span className="mx-text">{tab.tabCaptionContent.widgetCount}</span>}
                                badgeStyle={tabBadgeStyle}
                                badgeContent={tab.tabBadge}
                            />;
                        })}
                    </Fragment>
                )}
                {tabListType === "static" && adjustTabList === undefined && (
                    <Fragment>
                        <span> Static w/p content</span>
                        <Tab
                            key={1}
                            isCurrentTab={true}
                            // eslint-disable-next-line @typescript-eslint/no-empty-function
                            onTabClick={() => {}}
                            tabCaptionType={"text"}
                            tabCaptionText={"New Tab"}
                            tabCaptionHTML={""}
                            tabCaptionContent={noContent}
                            badgeStyle={tabBadgeStyle}
                            badgeContent={""}
                        />
                    </Fragment>
                )}
                {tabListType === "dynamic" && (
                    <Fragment>
                        <span>Dynamic</span>
                        <Tab
                            key={1}
                            isCurrentTab={true}
                            // eslint-disable-next-line @typescript-eslint/no-empty-function
                            onTabClick={() => {}}
                            tabCaptionType={tabCaptionTypeDynamic}
                            tabCaptionText={tabCaptionTextDynamic}
                            tabCaptionHTML={tabCaptionHTMLDynamic}
                            tabCaptionContent={noContent}
                            badgeStyle={tabBadgeStyle}
                            badgeContent={tabBadgeDynamic}
                        />
                    </Fragment>
                )}
            </div>
            {tabListType === "static" && adjustTabList !== undefined && <TabContent tab={adjustTabList[0]} />}
            {tabListType === "static" && adjustTabList === undefined && { noContent }}
            {tabListType === "dynamic" && (
                <TabContent tab={<span className="mx-text">{tabContentDynamic.widgetCount}</span>} />
            )}
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/TabContainerPluggable.css");
}
