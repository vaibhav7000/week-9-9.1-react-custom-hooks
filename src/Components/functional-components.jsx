import { use, useCallback, useEffect, useState } from "react";
import useProducts from "../customhooks/CustomHooks";

export default function Count() {

    const [count, setCount] = useState(0);

    useEffect(function() {
        console.log("Component mounted for first time + if value inside the dependency list changes than again will be called");


        // this function (clean-up function) will be called whenever the component un-mounts + will be called everytime (first) when the value inside dependency array changes
        return function() {
            console.log("Either component unmount or value inside the dependency array changes");
        }
    }, []);

    const increment = useCallback(function() {
        setCount((value) => value + 1);
    }, []);

    const decrement = useCallback(function() {
        setCount((value) => value - 1);
    }, []);

    return (
        <div>
            <button onClick={increment}>
                Increment
            </button>

            <div>
                {count}
            </div>

            <button onClick={decrement}>
                Decrement
            </button>
        </div>
    )
}

// Hooks are used to create state-variables ( hook into the react-state ) using "useState" + hook into the life-cylce methods of the react-functional-components using "useEffect"

export function OnlineStore() {
    const [pollingTime, setPollingTime] = useState(10);
    const {products, loading, error} = useProducts(pollingTime); // calling custom-hook
    useEffect(function() {
        console.log("component mounts");

        return () => {
            console.log("Component un-mounts");
        }
    }, []);

    return (
        <div>
            {loading ? <div>Loading ...</div> : error ? <div>Something up with server</div> : products.map(pro => <Product key={pro.id} product={pro}/>)}

            <div>
                <label htmlFor="polling-time">Enter Refresh Time</label>
                <input type="number" placeholder="Enter Polling time" id="polling-time" value={pollingTime} onInput={(event) => setPollingTime(event.target.value)} />
            </div>
        </div>
    )
}

function Product({product}) {

    return (
        <div>
            <div>
                {product.title}
            </div>

            <div>
                {product.description}
            </div>
        </div>
    )
}