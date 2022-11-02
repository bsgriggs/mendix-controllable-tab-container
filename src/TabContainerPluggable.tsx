import { ReactElement, createElement, useState, useEffect, Fragment } from "react";
import {
    TabCaptionTypeDynamicEnum,
    TabContainerPluggableContainerProps,
    TabListType
    // TabListTypeEnum
} from "../typings/TabContainerPluggableProps";
import { ValueStatus, ListValue, ListExpressionValue, ListWidgetValue, ListActionValue } from "mendix";
import TabTags from "./components/TabTags";
import TabContent from "./components/TabContent";
import "./ui/TabContainerPluggable.css";
import Big from "big.js";

const sortTabList = (a: TabListType, b: TabListType): number => {
    if (a.tabSort.value !== undefined && b.tabSort.value !== undefined) {
        const tabA = parseFloat(a.tabSort.value.toFixed(0));
        const tabB = parseFloat(b.tabSort.value.toFixed(0));
        return tabA - tabB;
    } else return 0;
};

// Map the Dynamic tabs by datasource to the static type
const convertDatasourceTabs = (
    tabDatasource: ListValue,
    tabCaptionTypeDynamic: TabCaptionTypeDynamicEnum,
    tabCaptionTextDynamic: ListExpressionValue<string>,
    tabCaptionHTMLDynamic: ListExpressionValue<string>,
    tabContentDynamic: ListWidgetValue,
    tabBadgeDynamic?: ListExpressionValue<string>,
    onTabClickDynamic?: ListActionValue
): TabListType[] | undefined => {
    if (
        tabDatasource !== undefined &&
        tabDatasource.status === ValueStatus.Available &&
        tabDatasource.items !== undefined
    ) {
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

export function TabContainerPluggable({
    defaultTabIndex,
    tabListType,
    // currentTabStyle,
    tabBadgeStyle,
    tabList,
    tabDatasource,
    tabCaptionTypeDynamic,
    tabCaptionTextDynamic,
    tabCaptionHTMLDynamic,
    tabContentDynamic,
    onTabClickDynamic,
    tabBadgeDynamic,
    tabDirection,
    name,
    style
}: TabContainerPluggableContainerProps): ReactElement {
    const [tabListAdjusted, setTabListAdjusted] = useState<TabListType[]>();
    const [currentTabIndex, setCurrentTabIndex] = useState<number>();
    const [currentTab, setCurrentTab] = useState<TabListType>();

    // Handles if the current tab changes outside the widget - Set the Index
    useEffect(() => {
        if (defaultTabIndex.value !== undefined) {
            // console.info("use effect - default tab changed", parseFloat(defaultTabIndex.value?.toFixed(0)));
            setCurrentTabIndex(parseFloat(defaultTabIndex.value?.toFixed(0)));
        }
    }, [defaultTabIndex.value]);

    // When the Index changes, update the current tab state
    useEffect(() => {
        if (tabListAdjusted !== undefined && currentTabIndex !== undefined) {
            // console.info("use effect - current tab index changed", currentTabIndex);
            const newCurrentTab = tabListAdjusted[currentTabIndex];
            if (newCurrentTab !== undefined) {
                // console.info("use effect - current tab index changed - tab found:", newCurrentTab);
                setCurrentTab(newCurrentTab);
            } else {
                setCurrentTab(undefined);
            }
        }
    }, [currentTabIndex, tabListAdjusted]);

    // update the tab list from static source
    useEffect(() => {
        if (tabList.length > 0 && tabListType === "static") {
            // console.info("use effect - tab list changed", tabList);
            setTabListAdjusted(tabList.filter(tab => tab.tabVisible).sort(sortTabList));
        }
    }, [tabList]);

    // update the tab list from dynamic source
    useEffect(() => {
        if (tabListType === "dynamic" && tabDatasource.status === ValueStatus.Available) {
            // console.info("use effect - datasource items changed", tabDatasource);
            setTabListAdjusted(
                convertDatasourceTabs(
                    tabDatasource,
                    tabCaptionTypeDynamic,
                    tabCaptionTextDynamic,
                    tabCaptionHTMLDynamic,
                    tabContentDynamic,
                    tabBadgeDynamic,
                    onTabClickDynamic
                )
            );
        }
    }, [tabDatasource]);

    // Event for when a different tab is clicked
    const handleTabClick = (tab: TabListType, index: number) => {
        if (index !== currentTabIndex) {
            if (tab.onTabClick !== undefined && tab.onTabClick.canExecute && tab.onTabClick.isExecuting === false) {
                tab.onTabClick.execute;
            }
            setCurrentTabIndex(index);
        }
    };

    // Render
    if (
        currentTabIndex !== undefined &&
        tabListAdjusted !== undefined &&
        tabListAdjusted.length > 0
    ) {
        // console.info("render for real", { currentTabIndex, tabListAdjusted, currentTab });
        return (
            <div id={name} className={`tcp tcp-${tabDirection}`} style={style}>
                <TabTags
                    tabList={tabListAdjusted}
                    currentTabIndex={currentTabIndex}
                    // currentTabStyle={currentTabStyle}
                    badgeStyle={tabBadgeStyle}
                    onTabClick={(tab, index) => handleTabClick(tab, index)}
                />
                <TabContent currentTabIndex={currentTabIndex} tab={currentTab?.tabContent} />
            </div>
        );
    } else {
        return <Fragment />;
    }
}
