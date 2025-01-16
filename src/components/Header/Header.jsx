import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";
import menuStore from "../../stores/BurgerMenuStore";
import classes from "./Header.module.scss";

const Header = observer(() => {
    const handleToggle = () => {
        menuStore.toggleMenu();
    };

    return (
        <header className={classes.header}>
            <Link to='/'>
                <div className={classes.logo}>
                    <div className={classes.image}></div>
                    <h1 className={classes.title}>
                        Слова по карточкам
                    </h1>
                </div>
            </Link>
            <nav className={classes.navigation}>
                <Menu />
            </nav>
            <button onClick={handleToggle} className={classes["burger-button"]}>
                {
                    !menuStore.isOpen
                        ? '☰'
                        : '✕'
                }
            </button>
            {menuStore.isOpen && (
                <div className={classes["burger-menu"]} >
                    <Menu />
                </div>
            )
            }
        </header >

    )
}
)

export default Header;