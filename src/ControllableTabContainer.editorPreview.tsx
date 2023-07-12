import { ReactElement, createElement, Fragment } from "react";
import { ControllableTabContainerPreviewProps, TabListPreviewType } from "../typings/ControllableTabContainerProps";
import TabContent from "./components/TabContent";
import TabTags from "./components/TabTags";
import { Tab } from "../typings/General";

export function preview({
    tabListType,
    badgeStyle,
    tabList,
    direction,
    datasource,
    captionTypeDynamic,
    captionTextDynamic,
    captionHTMLDynamic,
    contentDynamic,
    badgeTextDynamic,
    badgeDirection
}: ControllableTabContainerPreviewProps): ReactElement {
    // filter out any that are not visible then sort
    const tabListPreview: TabListPreviewType[] =
        tabListType === "static"
            ? tabList.length > 0
                ? tabList
                : [
                      {
                          captionType: "text",
                          captionText: "[No tabs configured]",
                          captionHTML: "",
                          captionContent: {
                              widgetCount: 1,
                              // eslint-disable-next-line no-empty-pattern
                              renderer: ({}: { caption: string; children: ReactElement }) => (
                                  <div>Add tabs in order to place widgets here.</div>
                              )
                          },
                          content: {
                              widgetCount: 1,
                              // eslint-disable-next-line no-empty-pattern
                              renderer: ({}: { caption: string; children: ReactElement }) => (
                                  <div>Add tabs in order to place widgets here.</div>
                              )
                          },
                          sort: "1",
                          visible: "true",
                          // eslint-disable-next-line @typescript-eslint/no-empty-function
                          onTabClick: () => {},
                          badgeText: "",
                          disableTabChange: false
                      } as TabListPreviewType
                  ]
            : datasource !== undefined && datasource !== ""
            ? [
                  {
                      captionType: captionTypeDynamic,
                      captionText: captionTextDynamic,
                      captionHTML: captionHTMLDynamic,
                      captionContent: {
                          widgetCount: 1,
                          // eslint-disable-next-line no-empty-pattern
                          renderer: ({}: { caption: string; children: ReactElement }) => (
                              <div>Add tabs in order to place widgets here.</div>
                          )
                      },
                      content: contentDynamic,
                      sort: "1",
                      visible: "true",
                      // eslint-disable-next-line @typescript-eslint/no-empty-function
                      onTabClick: () => {},
                      badgeText: badgeTextDynamic,
                      disableTabChange: false
                  } as TabListPreviewType
              ]
            : [
                  {
                      captionType: "text",
                      captionText: "[No data source configured]",
                      captionHTML: "",
                      captionContent: {
                          widgetCount: 1,
                          // eslint-disable-next-line no-empty-pattern
                          renderer: ({}: { caption: string; children: ReactElement }) => (
                              <div>Add a data source in order to place widgets here.</div>
                          )
                      },
                      content: {
                          widgetCount: 1,
                          // eslint-disable-next-line no-empty-pattern
                          renderer: ({}: { caption: string; children: ReactElement }) => (
                              <div>Add a data source in order to place widgets here.</div>
                          )
                      },
                      sort: "1",
                      visible: "true",
                      // eslint-disable-next-line @typescript-eslint/no-empty-function
                      onTabClick: () => {},
                      badgeText: badgeTextDynamic,
                      disableTabChange: false
                  } as TabListPreviewType
              ];

    const tabListAdjusted: Tab[] = tabListPreview.map((tabPreview, index): Tab => {
        return {
            captionType: tabPreview.captionType,
            captionText: tabPreview.captionText,
            captionHTML: tabPreview.captionHTML,
            captionContent: (
                <tabPreview.captionContent.renderer caption={`Place caption contents for Tab ${index} Caption here.`}>
                    <div />
                </tabPreview.captionContent.renderer>
            ),
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onSelect: () => {},
            badgeText: tabPreview.badgeText
        };
    });

    return (
        <div className={`ctc ctc-${direction}`}>
            {tabListPreview.map((tabPreview, index) => (
                <Fragment key={index}>
                    <TabTags
                        tabList={tabListAdjusted}
                        currentTabIndex={index}
                        badgeStyle={badgeStyle}
                        badgeDirection={badgeDirection}
                        tabIndex={0}
                    />
                    <TabContent
                        currentTabIndex={0}
                        tab={
                            <tabPreview.content.renderer
                                caption={`Place caption contents for Tab ${index} Content here.`}
                            >
                                <div />
                            </tabPreview.content.renderer>
                        }
                        isLoading={false}
                    />
                </Fragment>
            ))}
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/ControllableTabContainer.css");
}
