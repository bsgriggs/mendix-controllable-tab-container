import { ReactElement, createElement, Fragment } from "react";
import { BadgeStyleEnum } from "../../typings/ControllableTabContainerProps";

type BadgeProps = {
    style: BadgeStyleEnum;
    text?: string;
};

const Badge = ({ style, text }: BadgeProps): ReactElement =>
    text !== undefined && text?.trim() !== "" ? (
        <div className={`ctc-badge btn mx-button btn-${style}`}>{text}</div>
    ) : (
        <Fragment />
    );

export default Badge;
