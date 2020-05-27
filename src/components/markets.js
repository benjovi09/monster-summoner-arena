import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function () {
  const dispatch = useDispatch();
  const markets = useSelector((state) => state.marketsReducer);
  const monstersForSale = markets.monsters.availableMonsterTemplates;

  function CalculateMonsterMarketPrice(monster) {
    const statTotal =
      monster.attributes.body.strength +
      monster.attributes.body.agility +
      monster.attributes.body.toughness +
      monster.attributes.body.endurance +
      monster.attributes.body.recuperation;
    return Math.round(statTotal - statTotal * markets.priceFactor);
  }

  function buyMonster(monster) {
    dispatch({
      type: "purchase",
      data: {
        type: "monster",
        monster: monster,
        price: CalculateMonsterMarketPrice(monster),
      },
    });
  }

  return (
    <div>
      hello markets
      <div className="markets">
        <div className="monsters">
          {monstersForSale.map((monster) => (
            <article>
              <p>{monster.name}</p>
              price: {CalculateMonsterMarketPrice(monster)}
              <button onClick={() => buyMonster(monster)}>Buy</button>{" "}
            </article>
          ))}
        </div>
        <div className="equipment">
            
        </div>
      </div>
    </div>
  );
}
