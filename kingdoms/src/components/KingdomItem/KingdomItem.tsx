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
    return (
        <div className="feed-kingdoms">
          {kingdoms.map((kingdom, index) => (
            <div className={`feed-kingdom feed-kingdom__kingdom${index}`} key={index}>
              <h2>{kingdom.title}</h2>
              <p>{kingdom.description}</p>
              <img src={kingdom.img} alt={kingdom.title} />
            </div>
          ))}
        </div>
      );
}

export default KingdomItem;
