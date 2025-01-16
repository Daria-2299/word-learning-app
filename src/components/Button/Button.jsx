import { forwardRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classes from "./Button.module.scss";

const Button = forwardRef(
    function Button({ type, action, disabled = false, onClick }, ref) {
        const buttonClass = classNames(
            classes.button,
            {
                [classes["button--delete"]]: type === "delete",
                [classes["button--edit"]]: type === "edit",
                [classes["button--confirm"]]: type === "confirm",
                [classes["button--round"]]: type === "round"
            }
        )

        return (
            <button
                className={buttonClass}
                disabled={disabled}
                onClick={onClick}
                ref={ref}
            >
                {action}
            </button>
        );
    }
)

export default Button

Button.propTypes = {
    type: PropTypes.string,
    action: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};
