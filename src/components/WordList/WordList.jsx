import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { WordsStoreContext } from "../../stores/WordsStore";
import { observer } from "mobx-react-lite";
import WordListItem from "../WordListItem/WordListItem";
import NewWord from "../NewWord/NewWord";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import classes from "./WordList.module.scss";

const WordList = observer(() => {
    const store = useContext(WordsStoreContext)
    const { topicId } = useParams()
    const navigate = useNavigate()

    const [topicName, setTopicName] = useState(topicId)
    const [topicNameInput, setTopicNameInput] = useState('')
    const [errorTopicName, setErrorTopicName] = useState(false)

    useEffect(() => {
        setTopicName(topicId)
    }, [topicId])

    useEffect(() => {
        store.setFilterTag(topicName)
    }, [topicName, store])

    const isTopicNameFilled = () => {
        return ((topicName === 'new' && topicNameInput) || (topicName !== 'new'))
            ? true
            : false
    }

    const handleTopicNameInput = (evt) => {
        setTopicNameInput(evt.target.value.trim())
        setErrorTopicName(false)
    }

    const handleAddition = (word, translation) => {
        if (!isTopicNameFilled()) {
            setErrorTopicName(true)
            return
        }
        if (word && translation) {
            if (topicName === 'new') setTopicName(topicNameInput)
            const newWordInfo = {
                "german": word,
                "russian": translation,
                "tags": topicName !== 'new' ? topicName : topicNameInput
            }
            store.addWord(newWordInfo)
        }
    }

    const handleClickTrainig = () => {
        navigate(`/game/${topicName}`);
    };

    if (store.loading) {
        return (
            <Loading />
        )
    }
    if (store.error) {
        return (
            <Error />
        )
    }

    return (
        <>
            <div className={classes.wrapper}>
                {
                    topicName !== 'new' ?
                        <h2 className={classes.title}>
                            Слова по теме:&nbsp;
                            <span className={classes["title--addition"]}>
                                {topicName}
                            </span>
                        </h2>
                        :
                        <div className={classes["input-block"]}>
                            <label>Название списка слов: </label>
                            <input
                                value={topicNameInput}
                                type="text"
                                onChange={handleTopicNameInput}
                                className={`${classes.input} ${errorTopicName && classes.error}`}
                            />
                        </div>
                }
                <Button
                    type="confirm"
                    action="Тренировать"
                    disabled={store.filteredWords.length === 0}
                    onClick={handleClickTrainig}
                />
            </div>
            <section className={classes.list}>
                <div className={classes.titles}>
                    <h2 className={classes.title}>Слово</h2>
                    <h2 className={classes.title}>Перевод</h2>
                    <h2 className={classes.title}>Редактирование</h2>
                </div>
                <NewWord
                    isTopicNameFilled={isTopicNameFilled()}
                    handleAddition={handleAddition}
                />
                <div className={classes.content}>
                    {
                        store.filteredWords.slice().reverse().map((item) => {
                            return (
                                <WordListItem
                                    key={item.id}
                                    id={item.id}
                                />
                            );
                        })
                    }
                </div>
            </section>
        </>
    );
})

export default WordList

