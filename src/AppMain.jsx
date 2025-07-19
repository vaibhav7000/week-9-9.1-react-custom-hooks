import { useEffect, useState } from "react";
import CountClass from "./Components/class-components";
import Count, {AutoIncrement, Game, MousePosition, OnlineStore} from "./Components/functional-components";

export default function AppMain() {
    const [hidden, setHidden] = useState(false);

    const [showMousePosition, setShowMousePosition] = useState(true);
    
    useEffect(function() {
        setTimeout(function() {
            setHidden(value => !value);
        }, 10000);
    }, []);
    return (
        <>
            {/* <OnlineStore/>
            <Game/>
            {showMousePosition ? <MousePosition showMousePosition={showMousePosition} setShowMousePosition={setShowMousePosition}/> : null} */}

            {hidden ? null : <AutoIncrement/>}
        </>
    )
}