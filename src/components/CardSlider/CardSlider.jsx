
import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import CardItem from "../CardItem/CardItem";
import classes from "./CardSlider.module.scss";

export default function CardSlider(props) {
    const { cards, setDisplaySlider, studiedWords, setStudiedWords } = props

    const [direction, setDirection] = useState('');
    const [curIndex, setCurIndex] = useState(0)

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'ArrowLeft' && curIndex !== 0)
            handlePreviousCard()
        else if (event.key === 'ArrowRight')
            handleNextCard()
    }, [curIndex])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown])

    const handleNextCard = () => {
        if (curIndex + 1 === cards.length) {
            setDisplaySlider(false)
        }
        else {
            setCurIndex(curIndex + 1)
            setDirection('left')
        }
    }

    const handlePreviousCard = () => {
        if (curIndex === 0) {
            setCurIndex(cards.length - 1)
        }
        else {
            setCurIndex(curIndex - 1)
            setDirection('right')
        }
    }

    const setAction = (tempIndex) => {
        if (curIndex === tempIndex && direction)
            return 'in-' + direction
        if (tempIndex - 1 === curIndex && direction === 'right')
            return 'out-right'
        if (tempIndex + 1 === curIndex && direction === 'left')
            return 'out-left'

        return ''
    }

    const increaseStudiedWords = () => {
        const isFoundItem = studiedWords.find(item => item === cards[curIndex].id);
        if (!isFoundItem)
            setStudiedWords([...studiedWords, cards[curIndex].id])
    }

    return (
        <section className={classes.slider}>
            <div className={classes.content}>
                <Button
                    type="round"
                    action="←"
                    disabled={curIndex === 0}
                    onClick={handlePreviousCard}
                />
                <div className={classes.cards}>
                    {
                        cards.map((item, itemIndex) => {
                            return (
                                <CardItem
                                    key={item.id}
                                    word={item["german"]}
                                    translation={item["russian"]}
                                    action={setAction(itemIndex)}
                                    active={itemIndex === curIndex}
                                    increaseStudiedWords={increaseStudiedWords}
                                />
                            )
                        })
                    }
                </div>
                <Button
                    type="round"
                    action="→"
                    onClick={handleNextCard}
                />
            </div>
            <span className={classes.text}>
                Изучено слов: {studiedWords.length}/{cards.length}
            </span>
        </section>
    )
}

CardSlider.propTypes = {
    cards: PropTypes.array,
    setDisplaySlider: PropTypes.func,
    studiedWords: PropTypes.array,
    setStudiedWords: PropTypes.func
};
