import classes from "./Footer.module.scss";

export default function Footer() {
    return (
        <div className={classes.footer}>
            <p className={classes.title}>
                Учить язык, значит, открыть новое окно в мир.
            </p>
            <span className={classes.subtitle}>
                Китайская поговорка
            </span>
        </div>
    )
}