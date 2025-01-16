import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import classes from "./NewWord.module.scss";

export default function NewWord({ isTopicNameFilled, handleAddition }) {
    const [wordInput, setWordInput] = useState('')
    const [translationInput, setTranslationInput] = useState('')
    const [isInputsError, setInputsError] = useState(false)

    const handleValidation = (e) => {
        e.preventDefault();
        handleAddition(wordInput, translationInput)
        if (wordInput && translationInput) {
            setInputsError(false)
            if (isTopicNameFilled) {
                setWordInput('')
                setTranslationInput('')
            }
        }
        else setInputsError(true)

    }
    return (
        <form
            className={classes.form}
            name="AddWordForm"
            onSubmit={handleValidation}
        >
            <input
                value={wordInput}
                type="text"
                placeholder="Новое слово"
                onChange={(evt) => setWordInput(evt.target.value.trim())}
                className={`${classes.input} ${isInputsError && !wordInput && classes.error}`}
            />
            <input
                value={translationInput}
                type="text"
                placeholder="Перевод"
                onChange={(evt) => setTranslationInput(evt.target.value.trim())}
                className={`${classes.input} ${isInputsError && !translationInput && classes.error}`}
            />
            <Button
                type="ordinary"
                action="Добавить новое слово"
            />
        </form>
    );
}

NewWord.propTypes = {
    isTopicNameFilled: PropTypes.bool,
    handleAddition: PropTypes.func
}

