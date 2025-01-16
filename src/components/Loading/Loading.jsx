import classes from "./Loading.module.scss";

export default function Loading() {
    return (
        <div className={classes['cssload-pgloading']}>
            <div className={classes['cssload-loadingwrap']}>
                <ul className={classes['cssload-bokeh']}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    )
}