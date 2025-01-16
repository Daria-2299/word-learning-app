import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { WordsStoreContext } from "../../stores/WordsStore";
import CardItem from "../CardItem/CardItem";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import classes from "./TrainingComponent.module.scss";

const TrainingComponent = observer(() => {
    const store = useContext(WordsStoreContext)
    const [curIndex, setCurIndex] = useState(0)
    const [knownQuantity, setKnownQuantity] = useState(0)
    const [repeatQuantity, setRepeatQuantity] = useState(0)
    const [studyQuantity, setStudyQuantity] = useState(0)

    const { topicName } = useParams()
    useEffect(() => {
        store.setFilterTag(topicName)
    }, [topicName, store])

    const handleKnownButton = () => {
        setCurIndex(curIndex + 1)
        setKnownQuantity(knownQuantity + 1)
    }

    const handleRepeatButton = () => {
        setCurIndex(curIndex + 1)
        setRepeatQuantity(repeatQuantity + 1)
    }

    const handleStudyButton = () => {
        setCurIndex(curIndex + 1)
        setStudyQuantity(studyQuantity + 1)
    }

    const setAction = (tempIndex) => {
        if (curIndex === 0)
            return ''
        if (curIndex === tempIndex)
            return 'in-bottom'
        if (tempIndex - 1 === curIndex || tempIndex + 1 === curIndex)
            return 'out-bottom'

        return ''
    }

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
        curIndex + 1 <= store.filteredWords.length
            ?
            < div className={classes.content} >
                <div className={classes.cards}>
                    {
                        store.filteredWords.map((item, itemIndex) => {
                            return (
                                <CardItem
                                    key={item.id}
                                    id={item.id}
                                    word={item["german"]}
                                    translation={item["russian"]}
                                    action={setAction(itemIndex)}
                                    active={itemIndex === curIndex}
                                    className={classes.card}
                                />
                            )
                        })
                    }
                </div>
                < div className={classes.buttons}>
                    <Button
                        type="delete"
                        action={studyQuantity ? `Нужно выучить ( ${studyQuantity} )` : `Нужно выучить`}
                        onClick={handleStudyButton}
                    />
                    <Button
                        type="confirm"
                        action={knownQuantity ? `Знаю ( ${knownQuantity} )` : `Знаю`}
                        onClick={handleKnownButton}
                    />
                    <Button
                        type="edit"
                        action={repeatQuantity ? `Нужно повторить ( ${repeatQuantity} )` : `Нужно повторить`}
                        onClick={handleRepeatButton}
                    />
                </div>
            </div >
            :
            < div className={classes.content} >
                <h2 className={classes.title}>
                    Тренировка завершена!
                </h2>
                <div className={classes.results}>
                    <h3 className={classes.subtitle}>
                        Результаты тренировки:
                    </h3>
                    <p className={classes.text}>
                        Изучено слов: {knownQuantity}
                    </p>
                    <p className={classes.text}>
                        Нужно повторить: {repeatQuantity}
                    </p>
                    <p className={classes.text}>
                        Нужно выучить: {studyQuantity}
                    </p>
                </div>
            </div>
    )
})

export default TrainingComponent