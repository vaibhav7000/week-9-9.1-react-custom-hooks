// defining a custom hook for data-fetching

import { useCallback, useEffect, useRef, useState } from "react";

export default function useProducts(pollingTime = 4) {
    // pollingTime -> means hititg the backend after every given time (web-sockets are better way to do this hitting the backend after every polling time)
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    pollingTime = pollingTime ? parseInt(pollingTime) : 10; 


    const getData = useCallback(async function() {
        try {
            const response = await fetch("https://fakestoreapi.com/products?limit=5", {
                method: "GET"
            })

            const data = await response.json();

            setProducts(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    }, [pollingTime]);

    // suppose the user can change the polling time in this case the polling time should be a state-variable inside the main component + it must be added to the dependency list of useEffect

    useEffect(function() {

        getData()

        let intervalID = setInterval(function() {
            setLoading(true);
            setError(false);
            getData();
        }, (parseInt(pollingTime) ? parseInt(pollingTime) : 10) * 1000);


        return function() {
            console.log("component has unmounted");
            console.log("clearing the interval that send the request");
            clearInterval(intervalID);
        }
    }, [pollingTime]);

    return {products, loading, error}
}


export function isUserOnline() {
    // window.navigator.onLine returns boolean value that states user is connected with internet
    const [isOnline, setIsOnline] = useState(window.navigator.onLine);

    const toggleState = useCallback(function() {
        setIsOnline(value => !value);
    }, []);

    useEffect(function() {
        window.addEventListener("online", toggleState);
        window.addEventListener("offline", toggleState);

        return function() {
            window.removeEventListener("online", toggleState);
            window.removeEventListener("offline", toggleState);
        }
    }, []);

    return {isOnline};
}

export function useMousePosition() {
    const [mousePosition, setMousePosition] = useState({
        xPosition: 0,
        yPosition: 0
    });

    const getMousePosition = useCallback(function(event) {
        setMousePosition({
            xPosition: event.pageX,
            yPosition: event.pageY
        })
    }, []);

    useEffect(function() {
        console.log("mouse position mounts")
        document.addEventListener("mousemove", getMousePosition);

        return () => {
            console.log("mouse position unmounts")
            document.removeEventListener("mousemove", getMousePosition)
        }
    }, []);

    return mousePosition;
}

// custom hook that take callback as input and runs the callback after every n seconds
export function useInterval(callback, time = 4) {

    useEffect(function() {
        console.log("auto increment mount")
        let intervalID = setInterval(callback, time * 1000);

        callback();

        return function() {
            console.log("auto increment unmount")
            clearInterval(intervalID);
        }
    }, [])
}

// custom hook that is used for debouncing a given value
export function useDebounce(inputValue, timer = 500) {

    const [debounceValue, setDebounceValue]= useState(inputValue);

    useEffect(function() {
        let timeoutId = setTimeout(function() {
            setDebounceValue(inputValue);
        }, timer);

        return function() {
            console.log("clearing interval")
            clearTimeout(timeoutId);
        }
    }, [inputValue]);

    return debounceValue;
}

// custom-hooks are functions that internally uses react pre-defined hooks (useState, useEffect). Using these makes the main file looks cleaner