import { ReactElement, createElement } from "react";

type NoTabContentProps = {
    currentTabIndex: number;
};

function NoTabContent({ currentTabIndex }: NoTabContentProps): ReactElement {
    return (
        <div className="ctc-tab">
            <span className="mx-text text-danger">{"No content found for tab at index " + currentTabIndex}</span>
        </div>
    );
}
export default NoTabContent;
