import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import classes from "./404.module.scss";

export default function NotFoundPage() {
    return (
        <main className="container">
            <div className={classes.content}>
                <div className={classes.image}></div>
                <div className={classes.info}>
                    <h1 className={`${classes.title} ${classes["title--large"]}`}>
                        404
                    </h1>
                    <h2 className={classes.title}>
                        Страница не найдена
                    </h2>
                    <Link to='/'>
                        <Button action='Вернуться на главную страницу' />
                    </Link>
                </div>
            </div>
        </main>
    )
}