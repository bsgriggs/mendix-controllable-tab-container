import { ReactElement, createElement, useState, useEffect, Fragment } from "react";
import {
    CaptionTypeDynamicEnum,
    ControllableTabContainerContainerProps,
    TabListType
} from "../typings/ControllableTabContainerProps";
import { ValueStatus, ListValue, ListExpressionValue, ListWidgetValue, ListActionValue } from "mendix";
import TabTags from "./components/TabTags";
import TabContent from "./components/TabContent";
import "./ui/ControllableTabContainer.css";
import Big from "big.js";
import { Tab } from "typings/General";

const sortTabList = (a: TabListType, b: TabListType): number => {
    if (a.sort.value !== undefined && b.sort.value !== undefined) {
        const tabA = parseFloat(a.sort.value.toFixed(0));
        const tabB = parseFloat(b.sort.value.toFixed(0));
        return tabA - tabB;
    } else {
        return 0;
    }
};

// Map the Dynamic tabs by datasource to the static type
export const convertDatasourceTabs = (
    datasource: ListValue,
    captionTypeDynamic: CaptionTypeDynamicEnum,
    captionTextDynamic: ListExpressionValue<string>,
    captionHTMLDynamic: ListExpressionValue<string>,
    contentDynamic: ListWidgetValue,
    badgeTextDynamic?: ListExpressionValue<string>,
    onTabClickDynamic?: ListActionValue
): TabListType[] | undefined => {
    if (datasource !== undefined && datasource.status === ValueStatus.Available && datasource.items !== undefined) {
        return datasource.items.map((objItem, index): TabListType => {
            return {
                captionType: captionTypeDynamic,
                captionText:
                    captionTextDynamic !== undefined
                        ? captionTextDynamic.get(objItem)
                        : { status: ValueStatus.Available, value: "" },
                captionHTML:
                    captionHTMLDynamic !== undefined
                        ? captionHTMLDynamic.get(objItem)
                        : { status: ValueStatus.Available, value: "" },
                captionContent: undefined,
                content: contentDynamic.get(objItem),
                sort: { status: ValueStatus.Available, value: new Big(index) },
                visible: { status: ValueStatus.Available, value: true },
                badgeText: badgeTextDynamic?.get(objItem),
                onTabClick: onTabClickDynamic?.get(objItem)
            };
        });
    }
};

export function ControllableTabContainer({
    defaultTabIndex,
    tabListType,
    badgeStyle,
    tabList,
    datasource,
    captionTypeDynamic,
    captionTextDynamic,
    captionHTMLDynamic,
    contentDynamic,
    onTabClickDynamic,
    badgeTextDynamic,
    badgeDirection,
    direction,
    name,
    style
}: ControllableTabContainerContainerProps): ReactElement {
    const [tabListAdjusted, setTabListAdjusted] = useState<TabListType[]>();
    const [currentTabIndex, setCurrentTabIndex] = useState<number>();
    const [currentTab, setCurrentTab] = useState<ReactElement>();

    // Handles if the current tab changes outside the widget - Set the Index
    useEffect(() => {
        if (defaultTabIndex.value !== undefined) {
            setCurrentTabIndex(parseFloat(defaultTabIndex.value?.toFixed(0)));
        }
    }, [defaultTabIndex.value]);

    // When the Index changes, update the current tab state
    useEffect(() => {
        if (tabListAdjusted !== undefined && currentTabIndex !== undefined) {
            const newCurrentTab = tabListAdjusted[currentTabIndex];
            if (newCurrentTab !== undefined) {
                setCurrentTab(newCurrentTab.content as ReactElement);
            } else {
                setCurrentTab(undefined);
            }
        }
    }, [currentTabIndex, tabListAdjusted]);

    // update the tab list from static source
    useEffect(() => {
        if (tabList.length > 0 && tabListType === "static") {
            setTabListAdjusted(tabList.filter(tab => tab.visible).sort(sortTabList));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabList]);

    // update the tab list from dynamic source
    useEffect(() => {
        if (tabListType === "dynamic" && datasource.status === ValueStatus.Available) {
            setTabListAdjusted(
                convertDatasourceTabs(
                    datasource,
                    captionTypeDynamic,
                    captionTextDynamic,
                    captionHTMLDynamic,
                    contentDynamic,
                    badgeTextDynamic,
                    onTabClickDynamic
                )
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [datasource]);

    // Event for when a different tab is clicked
    const handleTabClick = (tab: TabListType, index: number): void => {
        if (index !== currentTabIndex) {
            if (tab.onTabClick !== undefined && tab.onTabClick.canExecute && tab.onTabClick.isExecuting === false) {
                tab.onTabClick.execute();
            }
            setCurrentTabIndex(index);
        }
    };

    // Render
    if (currentTabIndex !== undefined && tabListAdjusted !== undefined && tabListAdjusted.length > 0) {
        return (
            <div id={name} className={`ctc ctc-${direction}`} style={style}>
                <TabTags
                    tabList={tabListAdjusted.map((tab, index): Tab => {
                        return {
                            captionType: tab.captionType,
                            captionText: tab.captionText.value as string,
                            captionHTML: tab.captionHTML.value as string,
                            captionContent: tab.captionContent,
                            badgeText: tab.badgeText?.value,
                            onSelect: () => handleTabClick(tab, index)
                        };
                    })}
                    currentTabIndex={currentTabIndex}
                    badgeStyle={badgeStyle}
                    badgeDirection={badgeDirection}
                />
                <TabContent currentTabIndex={currentTabIndex} tab={currentTab} />
            </div>
        );
    } else {
        return <Fragment />;
    }
}
