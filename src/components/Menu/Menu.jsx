import { Link } from "react-router-dom";
import menuStore from "../../stores/BurgerMenuStore";
import classes from "./Menu.module.scss";

export default function Menu() {
    const idNewList = 'new'
    return (
        <>
            <Link
                to='/'
                className={classes.link}
                onClick={() => menuStore.closeMenu()}
            >
                Главная
            </Link>
            <Link
                to='/topics'
                className={classes.link}
                onClick={() => menuStore.closeMenu()}
            >
                Список тем
            </Link>
            <Link
                to={`/topics/${idNewList}`}
                className={classes.link}
                onClick={() => menuStore.closeMenu()}
            >
                Создать список слов
            </Link>
        </>

    )
}
