/**
 * This file was generated from ControllableTabContainer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, ListValue, ListActionValue, ListExpressionValue, ListWidgetValue } from "mendix";
import { Big } from "big.js";

export type TabListTypeEnum = "static" | "dynamic";

export type CaptionTypeEnum = "text" | "html" | "custom";

export interface TabListType {
    captionType: CaptionTypeEnum;
    captionText: DynamicValue<string>;
    captionHTML: DynamicValue<string>;
    captionContent: ReactNode;
    visible: DynamicValue<boolean>;
    sort: DynamicValue<Big>;
    content: ReactNode;
    badgeText?: DynamicValue<string>;
    onTabClick?: ActionValue;
}

export type CaptionTypeDynamicEnum = "text" | "html";

export type BadgeStyleEnum = "default" | "inverse" | "primary" | "info" | "success" | "warning" | "danger";

export type BadgeDirectionEnum = "top" | "right" | "bottom" | "left";

export type DirectionEnum = "top" | "right" | "bottom" | "left";

export interface TabListPreviewType {
    captionType: CaptionTypeEnum;
    captionText: string;
    captionHTML: string;
    captionContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    visible: string;
    sort: string;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    badgeText: string;
    onTabClick: {} | null;
}

export interface ControllableTabContainerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    defaultTabIndex: DynamicValue<Big>;
    tabListType: TabListTypeEnum;
    tabList: TabListType[];
    datasource: ListValue;
    captionTypeDynamic: CaptionTypeDynamicEnum;
    captionTextDynamic: ListExpressionValue<string>;
    captionHTMLDynamic: ListExpressionValue<string>;
    contentDynamic: ListWidgetValue;
    badgeTextDynamic?: ListExpressionValue<string>;
    onTabClickDynamic?: ListActionValue;
    badgeStyle: BadgeStyleEnum;
    badgeDirection: BadgeDirectionEnum;
    direction: DirectionEnum;
}

export interface ControllableTabContainerPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    defaultTabIndex: string;
    tabListType: TabListTypeEnum;
    tabList: TabListPreviewType[];
    datasource: {} | { type: string } | null;
    captionTypeDynamic: CaptionTypeDynamicEnum;
    captionTextDynamic: string;
    captionHTMLDynamic: string;
    contentDynamic: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    badgeTextDynamic: string;
    onTabClickDynamic: {} | null;
    badgeStyle: BadgeStyleEnum;
    badgeDirection: BadgeDirectionEnum;
    direction: DirectionEnum;
}
