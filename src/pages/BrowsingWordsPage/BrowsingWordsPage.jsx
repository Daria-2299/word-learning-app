import { WordsStoreContext } from "../../stores/WordsStore";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import CardSlider from "../../components/CardSlider/CardSlider";
import Button from "../../components/Button/Button";
import classes from "./BrowsingWordsPage.module.scss";

const BrowsingWordsPage = observer(() => {
    const store = useContext(WordsStoreContext);
    const { topicId } = useParams();
    const navigate = useNavigate();

    const [isSliderVisible, setDisplaySlider] = useState(true);
    const [studiedWords, setStudiedWords] = useState([]);

    useEffect(() => {
        store.setFilterTag(topicId);
    }, [topicId, store])

    const handleView = () => {
        setDisplaySlider(true);
    }

    const handleChangeTopic = () => {
        navigate(`/topics`);
    }

    return (
        <main className="container">
            {
                isSliderVisible
                    ?
                    <CardSlider
                        cards={store.filteredWords}
                        setDisplaySlider={setDisplaySlider}
                        studiedWords={studiedWords}
                        setStudiedWords={setStudiedWords}
                    />
                    :
                    <section className={classes.message}>
                        <p className={classes.text}>
                            Вы просмотрели весь список слов
                        </p>
                        <p className={classes.text}>
                            Изучено слов: {studiedWords.length} из {store.filteredWords.length}
                        </p>
                        <div className={classes.buttons}>
                            <Button
                                type="confirm"
                                action="Просмотреть список слов заново"
                                onClick={handleView}
                            />
                            <Button
                                action="Выбрать другой список слов"
                                onClick={handleChangeTopic}
                            />
                        </div>
                    </section>
            }
        </main>
    );
})

export default BrowsingWordsPage;