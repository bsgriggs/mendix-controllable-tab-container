import { ReactElement, createElement, Fragment } from "react";
import { TabBadgeStyleEnum } from "../../typings/ControllableTabContainerProps";

type BadgeProps = {
    badgeStyle: TabBadgeStyleEnum;
    badgeContent?: string;
};

function Badge({ badgeStyle, badgeContent }: BadgeProps): ReactElement {
    if (badgeContent !== undefined && badgeContent?.trim() !== "") {
        return <div className={`ctc-badge btn mx-button btn-${badgeStyle}`}>{badgeContent}</div>;
    } else return <Fragment></Fragment>
}
export default Badge;
