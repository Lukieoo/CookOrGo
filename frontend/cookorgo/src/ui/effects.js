import full from "./full-star.png";
import half from "./full-star.png";
import empty from "./empty-star.png";
import React from "react";

export const renderStarRating = (rating) => {
    const maxStars = 5;
    const step = 0.5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<img key={i} src={full} alt="Full Star" style={{width: '20px', marginRight: '2px'}}/>);
    }

    if (hasHalfStar) {
        stars.push(<img key="half" src={half} alt="Half Star"
                        style={{width: '20px', marginRight: '2px'}}/>);
    }

    const emptyStars = maxStars - (fullStars + (hasHalfStar ? 1 : 0));
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<img key={`empty-${i}`} src={empty} alt="Empty Star"
                        style={{width: '20px', marginRight: '2px'}}/>);
    }

    return stars;
};