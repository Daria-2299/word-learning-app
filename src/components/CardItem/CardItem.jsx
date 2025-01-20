import { useEffect, useState, useRef, useContext } from "react";
import { WordsStoreContext } from "../../stores/WordsStore";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import classes from "./CardItem.module.scss";

export default function CardItem({
    // word,translation, action, active, increaseStudiedWords = () => { }
    id, action, active, increaseStudiedWords = () => { }
}) {
    const store = useContext(WordsStoreContext);
    const curWord = store.getCurrentWord(id);
    const [displayTranslation, setTranslation] = useState(false);
    const buttonRef = useRef(null);

    const validActions = ['in-right', 'in-left', 'out-right', 'out-left', 'in-bottom', 'out-bottom'];
    const isValidAction = validActions.includes(action);

    /**Translation or word display control*/
    const handleTranslation = () => {
        setTranslation(!displayTranslation);
        if (!displayTranslation)
            increaseStudiedWords();
    }

    useEffect(() => {
        setTranslation(false);
        if (buttonRef.current && active) {
            buttonRef.current.focus();
        }
    }, [active])

    return (
        < div
            className={`${classes["card-container"]} 
                ${active && classes["card-container--active"]} 
                ${isValidAction && classes["card-container--" + action]}`}
        >
            <CardContent
                typeCard={!displayTranslation ? classes["card--front"] : classes["card--back"]}
                cardWord={curWord.german}
                buttonAction="Показать перевод"
                onClick={handleTranslation}
                buttonRef={buttonRef}
            />
            <CardContent
                typeCard={displayTranslation ? classes["card--front"] : classes["card--back"]}
                cardWord={curWord.russian}
                buttonAction="Назад"
                onClick={handleTranslation}
            />

        </div>
    );
}

function CardContent(props) {
    return (
        <div
            className={`${classes.card} ${props.typeCard}`}
        >
            <p className={classes.text}>
                {props.cardWord}
            </p>
            <Button
                type="confirm"
                action={props.buttonAction}
                onClick={props.onClick}
                ref={props.buttonRef}
            />
        </div>
    )
}

CardItem.propTypes = {
    // word: PropTypes.string,
    // translation: PropTypes.string,
    id: PropTypes.string,
    action: PropTypes.string,
    active: PropTypes.bool,
    increaseStudiedWords: PropTypes.func
};

CardContent.propTypes = {
    typeCard: PropTypes.string,
    cardWord: PropTypes.string,
    buttonAction: PropTypes.string,
    onClick: PropTypes.func,
    buttonRef: PropTypes.object
};
