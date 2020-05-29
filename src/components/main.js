import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";

import Player from "./player";
import Armory from "./armory"
import Markets from "./markets";
import Arena from "./arena";

export default function Main() {
    return (
        <main>
            <Provider store = {store}>
                <Player></Player>
                <Armory></Armory>
                <Markets></Markets>
            </Provider>
        </main>
    )
}