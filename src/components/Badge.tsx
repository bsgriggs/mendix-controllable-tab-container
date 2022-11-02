import { ReactElement, createElement, Fragment } from "react";
import { BadgeStyleEnum } from "../../typings/ControllableTabContainerProps";

type BadgeProps = {
    style: BadgeStyleEnum;
    text?: string;
};

function Badge({ style, text }: BadgeProps): ReactElement {
    if (text !== undefined && text?.trim() !== "") {
        return <div className={`ctc-badge btn mx-button btn-${style}`}>{text}</div>;
    } else {
        return <Fragment></Fragment>;
    }
}
export default Badge;
