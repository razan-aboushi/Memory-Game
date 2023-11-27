import React, {useState, useEffect} from "react";
import SingleCard from "@/components/SingleCard";

interface Card {
    src: string;
    matched: boolean;
    id: number;
}

const cardImages: Card[] = [
    {src: "/img/flower-1.png", matched: false, id: 1},
    {src: "/img/helmet.png", matched: false, id: 2},
    {src: "/img/potion-1.png", matched: false, id: 3},
    {src: "/img/ring.jpg", matched: false, id: 4},
    {src: "/img/Shield-1.png", matched: false, id: 5},
    {src: "/img/sword-1.png", matched: false, id: 6},
];


const MemoryGame: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [turns, setTurns] = useState<number>(0);
    const [choiceOne, setChoiceOne] = useState<Card | null>(null);
    const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);


    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()}));

        setCards(shuffledCards);
        setTurns(0);
    };

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };


    useEffect(() => {
        const checkMatch = () => {
            if (choiceOne && choiceTwo && choiceOne !== choiceTwo) {
                if (choiceOne.src === choiceTwo.src) {
                    setCards((prevCards) =>
                        prevCards.map((card) =>
                            card.src === choiceOne.src ? {...card, matched: true} : card
                        )
                    );
                    resetTurn();
                } else {
                    setTimeout(resetTurn, 1000);
                }
            }
        };

        checkMatch();
    }, [choiceOne, choiceTwo]);

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prevTurn) => prevTurn + 1);
    };

    useEffect(() => {
        shuffleCards();
    }, []);



    return (
        <div className="memory-game">
            <h2>Magic Match</h2>
            <p>Number of attempts : {turns}</p>
            <button className="buttonGame" onClick={shuffleCards}>
                New Game
            </button>
            <div className="card-grid">
                {cards.map((card) => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                    />
                ))}
            </div>
        </div>
    );
};

export default MemoryGame;