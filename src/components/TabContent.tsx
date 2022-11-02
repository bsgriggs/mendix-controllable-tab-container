import { ReactElement, createElement, ReactNode } from "react";
import NoTabContent from "./NoTabContent";

type tabContentProps = {
    currentTabIndex: number;
    tab?: ReactNode;
};

function Tab({ currentTabIndex, tab }: tabContentProps): ReactElement {
    if (tab !== undefined) {
        return <div className={"ctc-tab"}>{tab}</div>;
    } else {
        return <NoTabContent currentTabIndex={currentTabIndex} />;
    }
}
export default Tab;
