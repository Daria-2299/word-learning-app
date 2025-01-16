import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { WordsStoreContext } from "../../stores/WordsStore";
import { observer } from "mobx-react-lite";
import ListItem from "../TopicItem/TopicItem";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import classes from "./TopicList.module.scss";

const TopicsList = observer(() => {
    const store = useContext(WordsStoreContext)
    const navigate = useNavigate();

    const handleClick = () => {
        const idNewList = 'new'
        navigate(`/topics/${idNewList}`);
    };

    const getWordList = () => {
        let wordTopics = {};
        store.wordList.forEach(
            (word) =>
            (wordTopics[word.tags] = wordTopics[word.tags]
                ? (wordTopics[word.tags] += 1)
                : 1)
        );

        return Object.keys(wordTopics).map((key) => {
            return (
                <ListItem
                    key={key}
                    listName={key}
                    quantityCards={wordTopics[key]}
                />
            );
        });
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
        <div className={classes.wrapper}>
            <section className={classes.list}>
                <div className={classes.titles}>
                    <h2 className={classes.title}>Тема</h2>
                    <h2 className={classes.title}>Количество слов</h2>
                </div>
                <div className={classes.content}>
                    {
                        getWordList()
                    }
                </div>
            </section>
            <Button
                type="ordinary"
                action="Создать новый список"
                onClick={handleClick}
            />
        </div>
    );
})

export default TopicsList