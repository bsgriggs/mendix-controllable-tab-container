/* eslint-disable */
import { ControllableTabContainerPreviewProps } from "../typings/ControllableTabContainerProps";
import { hidePropertiesIn, hideNestedPropertiesIn, hidePropertyIn } from "./utils/PageEditorUtils";

export type Platform = "web" | "desktop";

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

type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[]; // used for customizing object grids
};

export type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

type BaseProps = {
    type: "Image" | "Container" | "RowLayout" | "Text" | "DropZone" | "Selectable" | "Datasource";
    grow?: number; // optionally sets a growth factor if used in a layout (default = 1)
};

type ImageProps = BaseProps & {
    type: "Image";
    document?: string; // svg image
    data?: string; // base64 image
    property?: object; // widget image property object from Values API
    width?: number; // sets a fixed maximum width
    height?: number; // sets a fixed maximum height
};

type ContainerProps = BaseProps & {
    type: "Container" | "RowLayout";
    children: PreviewProps[]; // any other preview element
    borders?: boolean; // sets borders around the layout to visually group its children
    borderRadius?: number; // integer. Can be used to create rounded borders
    backgroundColor?: string; // HTML color, formatted #RRGGBB
    borderWidth?: number; // sets the border width
    padding?: number; // integer. adds padding around the container
};

type RowLayoutProps = ContainerProps & {
    type: "RowLayout";
    columnSize?: "fixed" | "grow"; // default is fixed
};

type TextProps = BaseProps & {
    type: "Text";
    content: string; // text that should be shown
    fontSize?: number; // sets the font size
    fontColor?: string; // HTML color, formatted #RRGGBB
    bold?: boolean;
    italic?: boolean;
};

type DropZoneProps = BaseProps & {
    type: "DropZone";
    property: object; // widgets property object from Values API
    placeholder: string; // text to be shown inside the dropzone when empty
    showDataSourceHeader?: boolean; // true by default. Toggles whether to show a header containing information about the datasource
};

type SelectableProps = BaseProps & {
    type: "Selectable";
    object: object; // object property instance from the Value API
    child: PreviewProps; // any type of preview property to visualize the object instance
};

type DatasourceProps = BaseProps & {
    type: "Datasource";
    property: object | null; // datasource property object from Values API
    child?: PreviewProps; // any type of preview property component (optional)
};

export type PreviewProps =
    | ImageProps
    | ContainerProps
    | RowLayoutProps
    | TextProps
    | DropZoneProps
    | SelectableProps
    | DatasourceProps;

export function getProperties(
    _values: ControllableTabContainerPreviewProps,
    defaultProperties: Properties
): Properties {
    switch (_values.tabListType) {
        case "static":
            hidePropertiesIn(defaultProperties, _values, [
                "datasource",
                "captionTypeDynamic",
                "captionTextDynamic",
                "captionHTMLDynamic",
                "onTabClickDynamic",
                "contentDynamic",
                "badgeTextDynamic",
                "disableTabChangeDynamic"
            ]);
            _values.tabList.forEach((tab, index) => {
                // remove based on Tab Type
                switch (tab.captionType) {
                    case "text":
                        hideNestedPropertiesIn(defaultProperties, _values, "tabList", index, [
                            "captionHTML",
                            "captionContent"
                        ]);
                        break;
                    case "html":
                        hideNestedPropertiesIn(defaultProperties, _values, "tabList", index, [
                            "captionText",
                            "captionContent"
                        ]);
                        break;
                    case "custom":
                        hideNestedPropertiesIn(defaultProperties, _values, "tabList", index, [
                            "captionHTML",
                            "captionText"
                        ]);
                        break;
                }
            });
            break;
        case "dynamic":
            // remove all tab list settings
            for (let index = 0; index < _values.tabList.length; index++) {
                hideNestedPropertiesIn(defaultProperties, _values, "tabList", index, [
                    "captionHTML",
                    "captionContent",
                    "onTabClick",
                    "disableTabChange",
                    "captionText",
                    "captionType",
                    "content",
                    "sort",
                    "visible",
                    "badgeText"
                ]);
            }
            hidePropertyIn(defaultProperties, _values, "tabList");
            // remove based on Tab Type
            switch (_values.captionTypeDynamic) {
                case "text":
                    hidePropertyIn(defaultProperties, _values, "captionHTMLDynamic");
                    break;
                case "html":
                    hidePropertyIn(defaultProperties, _values, "captionTextDynamic");
                    break;
                case "custom":
                    hidePropertiesIn(defaultProperties, _values, ["captionHTMLDynamic", "captionTextDynamic"]);
            }
    }

    return defaultProperties;
}

export function check(_values: ControllableTabContainerPreviewProps): Problem[] {
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

    if (_values.captionTypeDynamic === "custom" && _values.captionContentDynamic.widgetCount === 0) {
        errors.push({
            property: `captionContentDynamic`,
            message: `If caption type is custom, caption content is required`,
            url: "https://github.com/bsgriggs/mendix-controllable-tab-container"
        });
    }
    return errors;
}

export function getPreview(values: ControllableTabContainerPreviewProps, isDarkMode: boolean): PreviewProps | null {
    const imageContainer: ImageProps = {
        type: "Image",
        width: 20,
        height: 20,
        data: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAICSURBVHgB7Zu9TsMwFIVPCgikClAHYGCp2BgYmOAB2HkLNgY2xAMgNoaOPETbHalsrGwwdWOApQFUCSGg5Ia2CsH5cXAcG99PulXVVLr2iROfHCnAN82gekENghqVUO1xjyTK7J/VOzxY1sSjNUgYiI7+Sb1DOiU3j1avwv6i3vDGB3XhB9WI/aarv6i3dgEmPaPo7B/vjVnRv0YjNWPyPA9FUNE/b+8aHIcFgOOwAHAcFgD6iTu0X9AW9tfK6D19PhAaoap9gCbIGW67LABx5boAvusCiJ8FVKFKSFWITojz22DmCrh/+MDxuY/b/htehtWd0b3dBZwcLGN9bQYqSb0H0OT3Dx8rnXiUpXoNndZKYRGkL4HTiydjJk88Dz+D1TiASlIFuLx+hWnc9d+hklQBFuvmbWO0ClSSKsDmxhxMg26GKkkV4OyoYdQqoLHQTqCSVAHobtttrSpXXRaa+M7WfDgWrdvgf4OdoABrnKAseZ2jVU5QlrhztN4JypLHOVrnBGXJco7WOUFZspyjdU5QliwPY5UTlCWPc7TCCcoi4xzZCcJxOBMEZ4LJcCbImSBngjANzgQ5E+RMsDDsBAVwJgjOBJPhTJAzQc4EYTucCXImyJngFHaCAqp4bc4oaAX4cBgS4Abu0qWPJvS8PG1a/Xihmr60LRi0qon3JpP/AhBYFWL5eqrZAAAAAElFTkSuQmCC"
    };
    const titleHeader: RowLayoutProps = {
        type: "RowLayout",
        backgroundColor: isDarkMode ? "#3B5C8F" : "#DAEFFB",
        borders: true,
        borderWidth: 1,
        columnSize: "fixed",
        children: [
            {
                type: "Container",
                padding: 4,
                children: [imageContainer],
                grow: 1
            },
            {
                type: "Container",
                padding: 4,
                children: [
                    {
                        type: "Text",
                        content: "Controllable Tab Container",
                        fontColor: isDarkMode ? "#6DB1FE" : "#2074C8"
                    } as TextProps
                ],
                grow: 7
            }
        ]
    };
    const tabList = {
        type: "Container",
        padding: 8,
        children:
            values.tabListType === "static"
                ? values.tabList.map((tab, index) => {
                      return {
                          type: "Selectable",
                          object: tab,
                          child: {
                              type: "Container",
                              borders: true,
                              borderRadius: 8,
                              borderWidth: 4,
                              padding: 8,
                              children: [
                                  tab.captionType !== "custom"
                                      ? {
                                            type: "Text",
                                            content:
                                                "TAB: " +
                                                (tab.captionType === "text" ? tab.captionText : tab.captionHTML),
                                            fontSize: 10,
                                            bold: true,
                                            fontColor: isDarkMode ? "#DEDEDE" : "#6B707B"
                                        }
                                      : {
                                            type: "Container",
                                            children: [
                                                {
                                                    type: "Text",
                                                    content: `Tab ${index} Caption`,
                                                    fontSize: 10,
                                                    bold: true,
                                                    fontColor: isDarkMode ? "#DEDEDE" : "#6B707B"
                                                },
                                                {
                                                    type: "DropZone",
                                                    property: tab.captionContent,
                                                    placeholder: `Tab ${index} Caption`,
                                                    grow: 1
                                                } as DropZoneProps
                                            ]
                                        },
                                  {
                                      type: "DropZone",
                                      property: tab.content,
                                      placeholder:
                                          (tab.captionType === "text" ? tab.captionText : tab.captionHTML) + " Content"
                                  } as DropZoneProps
                              ]
                          }
                      };
                  })
                : [
                      {
                          type: "Container",
                          borders: true,
                          borderRadius: 8,
                          borderWidth: 2,
                          padding: 8,
                          children: [
                              values.captionTypeDynamic !== "custom"
                                  ? {
                                        type: "Text",
                                        content:
                                            "TAB: " +
                                            (values.captionTypeDynamic === "text"
                                                ? values.captionTextDynamic
                                                : values.captionHTMLDynamic),
                                        fontSize: 10,
                                        bold: true,
                                        fontColor: isDarkMode ? "#DEDEDE" : "#6B707B"
                                    }
                                  : {
                                        type: "Container",
                                        children: [
                                            {
                                                type: "Text",
                                                content: `Custom Tab Caption`,
                                                fontSize: 10,
                                                bold: true,
                                                fontColor: isDarkMode ? "#DEDEDE" : "#6B707B"
                                            },
                                            {
                                                type: "DropZone",
                                                property: values.captionContentDynamic,
                                                placeholder: `Custom Tab Caption`,
                                                grow: 1
                                            } as DropZoneProps
                                        ]
                                    },
                              {
                                  type: "DropZone",
                                  property: values.contentDynamic,
                                  placeholder: "Dynamic Content"
                              } as DropZoneProps
                          ]
                      }
                  ]
    } as ContainerProps;

    return {
        type: "Container",
        borders: true,
        children: [titleHeader, tabList]
    } as ContainerProps;
}
