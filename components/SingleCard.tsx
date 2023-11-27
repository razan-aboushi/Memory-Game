import React from "react";

interface SingleCardProps {
    card: {
        src: string;
        matched: boolean;
    };
    handleChoice: (card: { src: string; matched: boolean }) => void;
    flipped: boolean;
}


const SingleCard: React.FC<SingleCardProps> = ({ card, handleChoice, flipped }) => {
    const handleClick = () => {
        handleChoice(card);
    };

    return (
        <div className={`card ${flipped ? "flipped" : ""}`}>
            <div onClick={handleClick}>
                <img
                    src={flipped || card.matched ? card.src : "/img/cover.png"}
                    alt="magic card"
                    width="100%"
                    height="250px"
                />
            </div>
        </div>
    );
};

export default SingleCard;