import { ReactElement, createElement } from "react";

type NoTabContentProps = {
    currentTabIndex: number;
}

function NoTabContent({currentTabIndex}: NoTabContentProps): ReactElement {
    console.info("No Tab Content for tab index", currentTabIndex);
    return (
        <div className="tcp-tab" >
            <span className="mx-text text-danger">{"No Content found for tab (index: " + currentTabIndex+")"}</span>
        </div>
    );
}
export default NoTabContent;
