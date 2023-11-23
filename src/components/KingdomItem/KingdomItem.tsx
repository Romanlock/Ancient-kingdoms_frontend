import React from "react";
import { Link } from "react-router-dom";
import MyButton from "../UI/Button/MyButton";

interface Kingdom {
  Id: number,
  Name: string,
  Area: number,
  Capital: string,
  Image: string,
  Description: string;
  State: string;
}

interface Props {
  kingdoms: Kingdom[];
}

const KingdomItem: React.FC<Props> = ({kingdoms}) => {
  const kingdomDeleteFunc = () => {
    console.log('delete');
  }

  return (
      <div className="feed-kingdoms">
        {kingdoms?.map((kingdom, index) => (
          <div className={`feed-kingdom feed-kingdom__kingdom-${kingdom.Id}`} key={index}>
            <div className="feed-kingdom__kingdom_title">
              <div className="feed-kingdom__kingdom_title-text text-h2-medium">{kingdom.Name}</div>
            </div>
            <div className="feed-kingdom__kingdom_img">
              <img src={"data:image/jpg;base64, " + kingdom.Image} alt={kingdom.Name} />
            </div>
            <div className="feed-kingdom__kingdom_btns">
              <div className="feed-kingdom__kingdom__about_btn btn-primary-defautl">
                <Link to={`/kingdom/${kingdom.Id}`}>
                  <MyButton>Подробнее</MyButton>
                </Link>
              </div>
              <div className="feed-kingdom__kingdom__delete_btn btn-primary-default">
                <MyButton onClick={kingdomDeleteFunc}>Удалить</MyButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
}

export default KingdomItem;
