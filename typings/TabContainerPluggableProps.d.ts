/**
 * This file was generated from TabContainerPluggable.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, ListValue, ListActionValue, ListExpressionValue, ListWidgetValue } from "mendix";
import { Big } from "big.js";

export type TabListTypeEnum = "static" | "dynamic";

export type TabCaptionTypeEnum = "text" | "html" | "custom";

export interface TabListType {
    tabCaptionType: TabCaptionTypeEnum;
    tabCaptionText: DynamicValue<string>;
    tabCaptionHTML: DynamicValue<string>;
    tabCaptionContent: ReactNode;
    tabVisible: DynamicValue<boolean>;
    tabSort: DynamicValue<Big>;
    tabContent: ReactNode;
    tabBadge?: DynamicValue<string>;
    onTabClick?: ActionValue;
}

export type TabCaptionTypeDynamicEnum = "text" | "html";

export type CurrentTabStyleEnum = "default" | "inverse" | "primary" | "info" | "success" | "warning" | "danger";

export type TabBadgeStyleEnum = "default" | "inverse" | "primary" | "info" | "success" | "warning" | "danger";

export type TabDirectionEnum = "top" | "right" | "bottom" | "left";

export interface TabListPreviewType {
    tabCaptionType: TabCaptionTypeEnum;
    tabCaptionText: string;
    tabCaptionHTML: string;
    tabCaptionContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    tabVisible: string;
    tabSort: string;
    tabContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    tabBadge: string;
    onTabClick: {} | null;
}

export interface TabContainerPluggableContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    defaultTabIndex: DynamicValue<Big>;
    tabListType: TabListTypeEnum;
    tabList: TabListType[];
    tabDatasource: ListValue;
    tabCaptionTypeDynamic: TabCaptionTypeDynamicEnum;
    tabCaptionTextDynamic: ListExpressionValue<string>;
    tabCaptionHTMLDynamic: ListExpressionValue<string>;
    tabContentDynamic: ListWidgetValue;
    tabBadgeDynamic?: ListExpressionValue<string>;
    onTabClickDynamic?: ListActionValue;
    currentTabStyle: CurrentTabStyleEnum;
    tabBadgeStyle: TabBadgeStyleEnum;
    tabDirection: TabDirectionEnum;
}

export interface TabContainerPluggablePreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    defaultTabIndex: string;
    tabListType: TabListTypeEnum;
    tabList: TabListPreviewType[];
    tabDatasource: {} | { type: string } | null;
    tabCaptionTypeDynamic: TabCaptionTypeDynamicEnum;
    tabCaptionTextDynamic: string;
    tabCaptionHTMLDynamic: string;
    tabContentDynamic: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    tabBadgeDynamic: string;
    onTabClickDynamic: {} | null;
    currentTabStyle: CurrentTabStyleEnum;
    tabBadgeStyle: TabBadgeStyleEnum;
    tabDirection: TabDirectionEnum;
}
