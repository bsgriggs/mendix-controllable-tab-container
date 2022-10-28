import { TabContainerPluggablePreviewProps } from "../typings/TabContainerPluggableProps";
import { hideNestedPropertiesIn, hidePropertiesIn, hidePropertyIn } from "./utils/PageEditorUtils";

export type Properties = PropertyGroup[];

export type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};

export type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[]; // used for customizing object grids
    objects?: ObjectProperties[];
    properties?: Properties[];
};

type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[]; // used for customizing object grids
};

export function getProperties(_values: TabContainerPluggablePreviewProps, defaultProperties: Properties): Properties {
    switch (_values.tabListType) {
        case "static":
            hidePropertiesIn(defaultProperties, _values, [
                "tabDatasource",
                "tabCaptionTypeDynamic",
                "tabCaptionTextDynamic",
                "tabCaptionHTMLDynamic",
                "onTabClickDynamic",
                "tabContentDynamic",
                "tabBadgeDynamic"
            ]);
            _values.tabList.map((tab, index) => {
                // remove based on Tab Type
                switch (tab.tabCaptionType) {
                    case "text":
                        hideNestedPropertiesIn(defaultProperties, _values, "tabList", index, [
                            "tabCaptionHTML",
                            "tabCaptionContent"
                        ]);
                        break;
                    case "html":
                        hideNestedPropertiesIn(defaultProperties, _values, "tabList", index, [
                            "tabCaptionText",
                            "tabCaptionContent"
                        ]);
                        break;
                    case "custom":
                        hideNestedPropertiesIn(defaultProperties, _values, "tabList", index, [
                            "tabCaptionHTML",
                            "tabCaptionText"
                        ]);
                        break;
                }
            });
            break;
        case "dynamic":
            // remove all tab list settings
            for (let index = 0; index < _values.tabList.length; index++) {
                hideNestedPropertiesIn(defaultProperties, _values, "tabList", index, [
                    "tabCaptionHTML",
                    "tabCaptionContent",
                    "onTabClick",
                    "tabCaptionText",
                    "tabCaptionType",
                    "tabContent",
                    "tabSort",
                    "tabVisible",
                    "tabBadge"
                ]);
            }
            hidePropertyIn(defaultProperties, _values, "tabList");
            // remove based on Tab Type
            switch (_values.tabCaptionTypeDynamic) {
                case "text":
                    hidePropertyIn(defaultProperties, _values, "tabCaptionHTMLDynamic");
                    break;
                case "html":
                    hidePropertyIn(defaultProperties, _values, "tabCaptionTextDynamic");
                    break;
            }
    }

    return defaultProperties;
}

export function check(_values: TabContainerPluggablePreviewProps): Problem[] {
    const errors: Problem[] = [];
    // Add errors to the above array to throw errors in Studio and Studio Pro.
    /* Example
    if (values.myProperty !== "custom") {
        errors.push({
            property: `myProperty`,
            message: `The value of 'myProperty' is different of 'custom'.`,
            url: "https://github.com/myrepo/mywidget"
        });
    }
    */
    return errors;
}
