import React from "react";
import { useSelector } from "react-redux";
import { FormatMoney } from "../utils/index";

export default function () {
  const player = useSelector((state) => state.playerReducer);

  return (
    <section>
      <h6>hello player!</h6>
      <ul>
        <li>money: {FormatMoney(player.money)}</li>
        <li>summoning power: {player.summoningPower}</li>
      </ul>
    </section>
  );
}
