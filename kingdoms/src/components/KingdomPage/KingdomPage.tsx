import React from "react";
import { Link } from "react-router-dom";
import MyButton from "../UI/Button/MyButton";

const KingdomPage: React.FC = () => {
    const kingdom = {
        title: "Владимиро-Суздальское",
        description: "Величайший Рус - Добрыня Никитич родом из этого княжества. Ходили слухи, что здесь умели варить зелья силы и храбрости, поэтому именно тут рождались и росли самые и великие Русы",  
        img: "../image/VS.png",
    };
    return (
    <div className="kingdom-page">
        <div className="kingdom">
            <div className="kingdom__title">
                <h2>{kingdom.title}</h2>
            </div>
            <div className="kingdom__description">
                <h2>{kingdom.description}</h2>
            </div>
            <div className="kingdom__img">
                <img src={kingdom.img} alt={kingdom.title} />
            </div>
        </div>
        <div className="kingdom-page__btns">
            <Link to="/">
                <MyButton className="btn-primary kingdom-page__back-btn">На главную</MyButton>
            </Link>
        </div>
    </div>
    );
}

export default KingdomPage;
