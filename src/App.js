import './App.css';
import {useEffect, useState} from "react";

// https://assets.codepen.io/1082881/data.json
// 1. Fetch the data from endpoint
// 2. Get the items array from the data
// 3. Filter items array to only contain products on sale (hasDiscount === true)
// 4. Loop over items, generate HTML with JS, and insert into the dom

function App() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const getDataFromServer = await fetchCardData();
                const traversedData = getDataFromServer.some.place.pretty.nested.items;
                const dedupeData = traversedData.filter((item, index, self) =>
                        index === self.findIndex((t) => (
                            t.id === item.id
                        ))
                );
                const data = dedupeData.filter(item => item.hasDiscount === true);
                setCards(data);
            } catch (err) {
                return err;
            }
        };
        getData();

    }, []);

    const fetchCardData = async () => {
        const response = await fetch('https://assets.codepen.io/1082881/data.json');
        return await response.json();
    };


    return (
        <div className="container App">
            <div className={"instructions text-center"}>
                <h1>Front-end Code Test</h1>
                <h3>Parse and Render Test</h3>
            </div>
            <div className="row" >
                {cards.map(card =>
                    <div className={"col-12 col-md-4"} key={card.id}>
                        <div className="card bg-light m-1 text-left">
                            <div className="card-body text-left">
                                <h3 className="card-title">{card.name}</h3>
                                <p>{card.description}</p>
                                {card.price && <p>Price: ${card.price}</p>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
