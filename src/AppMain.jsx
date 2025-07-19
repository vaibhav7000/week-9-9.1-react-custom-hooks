import { useEffect, useState } from "react";
import CountClass from "./Components/class-components";
import Count from "./Components/functional-components";

export default function AppMain() {
    const [hidden, setHidden] = useState(false);
    
    useEffect(function() {
        setTimeout(function() {
            setHidden(value => !value);
        }, 3000);
    }, []);
    return (
        <>
            {hidden ? null : <Count/>}
        </>
    )
}