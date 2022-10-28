import { ReactElement, createElement, ReactNode } from "react";

type tabContentProps = {
    tab: ReactNode;
};

function Tab({ tab }: tabContentProps): ReactElement {

    return (
        <div className={"tcp-tab"}>
            {tab}
        </div>
    );
}
export default Tab;
