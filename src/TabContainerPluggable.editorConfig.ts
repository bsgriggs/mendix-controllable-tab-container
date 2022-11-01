import { TabContainerPluggablePreviewProps } from "../typings/TabContainerPluggableProps";
import { hideNestedPropertiesIn, hidePropertiesIn, hidePropertyIn } from "./utils/PageEditorUtils";
import { StructurePreviewProps, RowLayoutProps, ContainerProps, TextProps, DropZoneProps, ImageProps } from "./utils/PageEditor";

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

export function getPreview(
    values: TabContainerPluggablePreviewProps,
    isDarkMode: boolean
): StructurePreviewProps | null {
    const imageContainer:ImageProps = {
        type: "Image",
        width: 24,
        height: 24,
        data: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAICSURBVHgB7Zu9TsMwFIVPCgikClAHYGCp2BgYmOAB2HkLNgY2xAMgNoaOPETbHalsrGwwdWOApQFUCSGg5Ia2CsH5cXAcG99PulXVVLr2iROfHCnAN82gekENghqVUO1xjyTK7J/VOzxY1sSjNUgYiI7+Sb1DOiU3j1avwv6i3vDGB3XhB9WI/aarv6i3dgEmPaPo7B/vjVnRv0YjNWPyPA9FUNE/b+8aHIcFgOOwAHAcFgD6iTu0X9AW9tfK6D19PhAaoap9gCbIGW67LABx5boAvusCiJ8FVKFKSFWITojz22DmCrh/+MDxuY/b/htehtWd0b3dBZwcLGN9bQYqSb0H0OT3Dx8rnXiUpXoNndZKYRGkL4HTiydjJk88Dz+D1TiASlIFuLx+hWnc9d+hklQBFuvmbWO0ClSSKsDmxhxMg26GKkkV4OyoYdQqoLHQTqCSVAHobtttrSpXXRaa+M7WfDgWrdvgf4OdoABrnKAseZ2jVU5QlrhztN4JypLHOVrnBGXJco7WOUFZspyjdU5QliwPY5UTlCWPc7TCCcoi4xzZCcJxOBMEZ4LJcCbImSBngjANzgQ5E+RMsDDsBAVwJgjOBJPhTJAzQc4EYTucCXImyJngFHaCAqp4bc4oaAX4cBgS4Abu0qWPJvS8PG1a/Xihmr60LRi0qon3JpP/AhBYFWL5eqrZAAAAAElFTkSuQmCC"
    }
    const titleHeader: RowLayoutProps = {
        type: "RowLayout",
        columnSize: "grow",
        backgroundColor: isDarkMode ? "#4F4F4F" : "#F5F5F5",
        borderWidth: 1,
        children: [
            imageContainer,
            {
                type: "Container",
                padding: 8,
                children: [
                    {
                        type: "Text",
                        content: "Tab Container Pluggable",
                        fontColor: isDarkMode ? "#DEDEDE" : "#6B707B"
                    } as TextProps
                ]
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
                                  tab.tabCaptionType !== "custom"
                                      ? {
                                            type: "Text",
                                            content:
                                                "TAB: " +
                                                (tab.tabCaptionType === "text"
                                                    ? tab.tabCaptionText
                                                    : tab.tabCaptionHTML),
                                            fontSize: 10,
                                            bold: true,
                                            fontColor: isDarkMode ? "#DEDEDE" : "#000000"
                                        }
                                      : {
                                            type: "Container",
                                            children: [
                                                {
                                                    type: "Text",
                                                    content: `Tab ${index} Caption`,
                                                    fontSize: 10,
                                                    bold: true,
                                                    fontColor: isDarkMode ? "#DEDEDE" : "#000000"
                                                },
                                                {
                                                    type: "DropZone",
                                                    property: tab.tabCaptionContent,
                                                    placeholder: `Tab ${index} Caption`,
                                                    grow: 1
                                                } as DropZoneProps
                                            ]
                                        },
                                  {
                                      type: "DropZone",
                                      property: tab.tabContent,
                                      placeholder:
                                          (tab.tabCaptionType === "text" ? tab.tabCaptionText : tab.tabCaptionHTML) +
                                          " Content"
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
                              {
                                  type: "Text",
                                  content:
                                      "TAB: " +
                                      //   (values.tabDatasource !== null && values.tabDatasource.type !== undefined ? values.tabDatasource.type : "") +
                                      (values.tabCaptionTypeDynamic === "text"
                                          ? values.tabCaptionTextDynamic
                                          : values.tabCaptionHTMLDynamic),
                                  fontSize: 10,
                                  bold: true,
                                  fontColor: isDarkMode ? "#DEDEDE" : "#000000"
                              },
                              {
                                  type: "DropZone",
                                  property: values.tabContentDynamic,
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
