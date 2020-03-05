import React, {useState} from 'react';
import axios from 'axios'
const QuoteForm = () => {
    const [input_pickup_postcode, setInputPickupPostcode] = useState('');
    const [input_delivery_postcode, setInputDeliveryPostcode] = useState('');
    const [input_vehicle, setInputVehicle] = useState('bicycle');

    const [pickup, setPickup] = useState('')
    const [delivery, setDelivery] = useState('')
    const [vehicle, setVehicle] = useState('')

    const [loadingStatus, setLoadingStatus] = useState(false);
    const [price , setPrice] = useState(-1);

    const handleSubmit = (event) => {
        if(event){
            event.preventDefault();
        }


        setLoadingStatus(true);
        resetResults();
        getPrice();
    }

    const getPrice = async () => {
        axios.post('http://localhost:8080/quote', {
            pickupPostcode: input_pickup_postcode,
            deliveryPostcode: input_delivery_postcode,
            vehicle: input_vehicle
        })

        .then(async (result) => {
            console.log(result);

            setPrice(result.data.price);
            setPickup(result.data.pickupPostcode);
            setDelivery(result.data.deliveryPostcode);
            resetInputs();

            setLoadingStatus(false);
        })
        .catch(e => console.log(e));
    }

    const resetInputs = () => {
        setInputPickupPostcode('')
        setInputDeliveryPostcode('')
        setInputVehicle('bicycle')
    }

    const resetResults = () => {
        setPickup('')
        setDelivery('')
        setVehicle('')
        setPrice(-1)
    }

    return (
        <div >
            <div>
                <h2>
                    Get a Quote Instantly
                </h2>
                <form onSubmit={handleSubmit}>
                    <label>Pickup Postcode:
                        <input 
                            value={input_pickup_postcode}
                            onChange={event => setInputPickupPostcode(event.target.value)}
                            id = "pickup_postcode"
                            type = "text"
                            />
                    </label>
                    <br />
                    <label>Delivery Postcode:
                        <input 
                            value={input_delivery_postcode}
                            onChange={event => setInputDeliveryPostcode(event.target.value)}
                            id = "delivery_postcode"
                            type = "text"
                            />
                    </label>
                    <br />
                    <label>Vehicle:
                        <select id="vehicle"
                                value={input_vehicle}
                                onChange={event => setInputVehicle(event.target.value)}>
                            <option value="bicycle">Bicyle</option>
                            <option value="motorbike">Motorbike</option>
                            <option value="parcel_car">Parcel Car</option>
                            <option value="small_van">Small Van</option>
                            <option value="large_van">Large Van</option>
                        </select>
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>

                

                <br />
                
                {loadingStatus &&
                    <div> Loading... </div>
                }

                {price !== -1 &&
                    <div>
                        A delivery from {pickup} to {delivery} using a {vehicle} will cost you £{price}.
                    </div>
                }
            </div>
        </div>
    );
}

export default QuoteForm;