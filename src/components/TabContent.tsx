import { ReactElement, createElement, ReactNode } from "react";
import NoTabContent from "./NoTabContent";

type tabContentProps = {
    currentTabIndex: number;
    tab: ReactNode | undefined;
};

const Tab = ({ currentTabIndex, tab }: tabContentProps): ReactElement =>
    tab ? <div className={"ctc-tab"}>{tab}</div> : <NoTabContent currentTabIndex={currentTabIndex} />;

export default Tab;
