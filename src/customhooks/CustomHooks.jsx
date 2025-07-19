// defining a custom hook for data-fetching

import { useCallback, useEffect, useRef, useState } from "react";

export default function useProducts(pollingTime = 4) {
    // pollingTime -> means hititg the backend after every given time (web-sockets are better way to do this hitting the backend after every polling time)
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    const getData = useCallback(async function() {
        try {
            // const response = await fetch("https://fakestoreapi.com/products?limit=5", {
            //     method: "GET"
            // })

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

// custom-hooks are functions that internally uses react pre-defined hooks (useState, useEffect). Using these makes the main file looks cleaner