import { useContext, useState } from "react";
import { WordsStoreContext } from "../../stores/WordsStore";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Error from "../Error/Error";
import classes from "./WordListItem.module.scss";

const WordListItem = observer(({ id }) => {
    const [edit, setEditMode] = useState(false);

    const handleEditMode = () => {
        setEditMode(!edit);
    }

    return (
        <div className={classes.line}>
            {edit
                ?
                < EditWordLine
                    id={id}
                    handleEditMode={handleEditMode}
                />
                :
                < DisplayWordLine
                    id={id}
                    handleEditMode={handleEditMode}
                />
            }
        </div>
    );
})

WordListItem.propTypes = {
    id: PropTypes.string,
};

export default WordListItem;

const EditWordLine = observer(({ id, handleEditMode }) => {
    const store = useContext(WordsStoreContext)
    const curWord = store.getCurrentWord(id);
    const [inputWord, setWord] = useState(curWord.german);
    const [inputTranslation, setTranslation] = useState(curWord.russian);
    const [isInputsError, setIsInputsError] = useState(false);

    /** Saving changes to a word or translation*/
    const handleSave = () => {
        if (inputWord && inputTranslation) {
            const editWord = {
                "id": id,
                "german": inputWord,
                "russian": inputTranslation,
                "tags": curWord.tags
            };
            store.updateWord(editWord);
            handleEditMode();
        }
        else setIsInputsError(true)
    }

    if (store.error) {
        return (
            <Error />
        )
    }

    return (
        <>
            <input
                className={`${classes.content} ${isInputsError && !inputWord && classes.error}`}
                value={inputWord}
                onChange={(evt) => { setWord(evt.target.value.trim()) }}
            />
            <input
                className={`${classes.content} ${isInputsError && !inputTranslation && classes.error}`}
                value={inputTranslation}
                onChange={(evt) => { setTranslation(evt.target.value.trim()) }}
            />
            <div className={classes.buttons}>
                <Button
                    type="edit"
                    action="Отменить"
                    onClick={handleEditMode}
                />
                <Button
                    type="confirm"
                    action="Сохранить"
                    onClick={handleSave}
                />
            </div>
        </>
    )
})

EditWordLine.propTypes = {
    id: PropTypes.string,
    handleState: PropTypes.func
};

const DisplayWordLine = observer(({ id, handleEditMode }) => {
    const store = useContext(WordsStoreContext);
    const curWord = store.getCurrentWord(id);

    if (store.error) {
        return (
            <Error />
        )
    }

    return (
        <>
            <p className={classes.content}>
                {curWord.german}
            </p>
            <p className={classes.content}>
                {curWord.russian}
            </p>
            <div className={classes.buttons}>
                <Button
                    type="edit"
                    action="Редактировать"
                    onClick={handleEditMode}
                />
                <Button
                    type="delete"
                    action="Удалить"
                    onClick={() => { store.deleteWord(id) }}
                />
            </div>
        </>
    )
})

DisplayWordLine.propTypes = {
    id: PropTypes.string,
    handleState: PropTypes.func
};
