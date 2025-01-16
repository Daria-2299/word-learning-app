import classes from "./Error.module.scss";

export default function Error() {
    return (
        <main className={classes.container}>
            <div className={classes.content}>
                <div className={classes.info}>
                    <h2 className={`${classes.title} ${classes["title--large"]}`}>
                        Что-то пошло не так ...
                    </h2>
                    <h2 className={classes.title}>
                        Обновите страницу.
                    </h2>
                </div>
                <div className={classes.image}></div>
            </div>
        </main>
    )
}