import { ReactElement, createElement, CSSProperties } from "react";

type loadingTabContainerProps = {
    name: string;
    style?: CSSProperties;
}

function LoadingTabContainer({name, style}: loadingTabContainerProps): ReactElement {
    return (
        <div id={name} className="tcp" style={style}></div>
    );
}
export default LoadingTabContainer;
