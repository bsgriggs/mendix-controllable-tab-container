import { ReactElement, createElement, ReactNode, Fragment } from "react";
import NoTabContent from "./NoTabContent";

type tabContentProps = {
    currentTabIndex: number;
    tab: ReactNode | undefined;
    isLoading: boolean;
};

const Tab = ({ currentTabIndex, tab, isLoading }: tabContentProps): ReactElement =>
    tab ? (
        <div className={"ctc-tab"}>{tab}</div>
    ) : isLoading ? (
        <Fragment />
    ) : (
        <NoTabContent currentTabIndex={currentTabIndex} />
    );

export default Tab;
