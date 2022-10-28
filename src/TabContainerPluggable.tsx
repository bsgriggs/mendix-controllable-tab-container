import { ReactElement, createElement, useState, ReactNode, useEffect } from "react";

import {
    TabContainerPluggableContainerProps,
    TabListType
} from "../typings/TabContainerPluggableProps";
import { ValueStatus } from "mendix";
import TabTags from "./components/TabTags";
import TabContent from "./components/TabContent";

import "./ui/TabContainerPluggable.css";
import Big from "big.js";
import LoadingTabContainer from "./components/LoadingTabContainer";

const sortTabList = (a: TabListType, b: TabListType): number => {
    if (a.tabSort.value !== undefined && b.tabSort.value !== undefined) {
        const tabA = parseFloat(a.tabSort.value.toFixed(0));
        const tabB = parseFloat(b.tabSort.value.toFixed(0));
        return tabA - tabB;
    } else return 0;
};

export function TabContainerPluggable({
    defaultTabIndex,
    tabListType,
    tabBadgeStyle,
    tabList,
    tabDatasource,
    tabCaptionTypeDynamic,
    tabCaptionTextDynamic,
    tabCaptionHTMLDynamic,
    tabContentDynamic,
    onTabClickDynamic,
    tabBadgeDynamic,
    name,
    style
}: TabContainerPluggableContainerProps): ReactElement {
    // Map the Dynamic tabs by datasource to the static type
    const convertDatasourceTabs = (): TabListType[] | undefined => {
        if (tabDatasource !== undefined && tabDatasource.status === ValueStatus.Available && tabDatasource.items !== undefined) {
            return tabDatasource.items.map((objItem, index): TabListType => {
                return {
                    tabCaptionType: tabCaptionTypeDynamic,
                    tabCaptionText:
                        tabCaptionTextDynamic !== undefined
                            ? tabCaptionTextDynamic.get(objItem)
                            : { status: ValueStatus.Available, value: "" },
                    tabCaptionHTML:
                        tabCaptionHTMLDynamic !== undefined
                            ? tabCaptionHTMLDynamic.get(objItem)
                            : { status: ValueStatus.Available, value: "" },
                    tabCaptionContent: undefined,
                    tabContent: tabContentDynamic.get(objItem),
                    tabSort: { status: ValueStatus.Available, value: new Big(index) },
                    tabVisible: { status: ValueStatus.Available, value: true },
                    tabBadge: tabBadgeDynamic?.get(objItem),
                    onTabClick: onTabClickDynamic?.get(objItem)
                }; 
            });
        }
    };

    //filter out any that are not visible then sort
    const adjustTabList = (): TabListType[] | undefined => {
        return tabListType === "static" ? tabList.filter(tab => tab.tabVisible).sort(sortTabList) : convertDatasourceTabs();
    };

    if (defaultTabIndex.status === ValueStatus.Available) {
        const [tabListAdjusted, setTabListAdjusted] = useState<TabListType[]>();
        const [currentTabIndex, setCurrentTabIndex] = useState<number>(parseFloat(defaultTabIndex.value?.toFixed(0)));
        const [currentTab, setCurrentTab] = useState<ReactNode>();

        useEffect(() => {
            const newTabList = adjustTabList();
            if (newTabList !== undefined){
                setTabListAdjusted(newTabList);
                const newCurrentTab = newTabList[currentTabIndex];
                if (newCurrentTab !== undefined){
                    setCurrentTab(newCurrentTab.tabContent);
                }
            }
        }, [currentTabIndex, tabList, tabDatasource]);

        const handleTabClick = (tab: TabListType, index: number) => {
            if (index !== currentTabIndex) {
                if (tab.onTabClick !== undefined && tab.onTabClick.canExecute && tab.onTabClick.isExecuting === false) {
                    tab.onTabClick.execute;
                }
                setCurrentTabIndex(index);
            }
        };

        if (tabListAdjusted !== undefined && tabListAdjusted.length > 0) {
            return (
                <div id={name} className="tcp" style={style}>
                    <TabTags
                        tabList={tabListAdjusted}
                        currentTabIndex={currentTabIndex}
                        badgeStyle={tabBadgeStyle}
                        onTabClick={(tab, index) => handleTabClick(tab, index)}
                    />
                    <TabContent tab={currentTab} />
                </div>
            );
        } else {
            return <LoadingTabContainer name={name} style={style} />;
        }
    } else {
        return <LoadingTabContainer name={name} style={style} />;
    }
}
