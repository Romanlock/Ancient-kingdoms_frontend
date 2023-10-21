import React from "react";

interface Kingdom {
    title: string;
    description: string;
    img: string;
}

interface Props {
    kingdoms: Kingdom[];
}

const KingdomItem: React.FC<Props> = ({kingdoms}) => {
  const kingdomAboutFunc = () => {
    console.log('about');
  }

  const kingdomDeleteFunc = () => {
    console.log('delete');
  }

  return (
      <div className="feed-kingdoms">
        {kingdoms.map((kingdom, index) => (
          <div className={`feed-kingdom feed-kingdom__kingdom${index}`} key={index}>
            <div className="feed-kingdom__kingdom__title">
              <h2>{kingdom.title}</h2>
            </div>
            <div className="feed-kingdom__kingdom__description">
              <p>{kingdom.description}</p>
              </div>
            <div className="feed-kingdom__kingdom__img">
              <img src={kingdom.img} alt={kingdom.title} />
            </div>
            <div className="feed-kingdom__kingdom__btns">
              <div className="feed-kingdom__kingdom__about-btn btn-primary-defautl">
                <button onClick={kingdomAboutFunc}>Подробнее</button>
              </div>
              <div className="feed-kingdom__kingdom__delete-btn btn-primary-default">
                <button onClick={kingdomDeleteFunc}>Удалить</button>
              </div>
            </div>
          </div>
        ))};
      </div>
    );
}

export default KingdomItem;
