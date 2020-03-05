import React, {useState} from 'react';
import axios from 'axios';
import './tailwind.css';

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
            setVehicle(result.data.vehicle)
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
        <div className = "min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className = "max-w-md w-full">
                <img src="shutl-logo.svg" className="mx-auto h-24 w-auto"/>
                <div>
                    <h2 className ="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        Get a Quote Instantly
                    </h2>
                </div>
                <form onSubmit={handleSubmit} className="mt-8">
                    <div className= "rounded-md shadow-sm">

                        <input 
                            value={input_pickup_postcode}
                            onChange={event => setInputPickupPostcode(event.target.value)}
                            id = "pickup_postcode"
                            type = "text"
                            placeholder= "Pickup Postcode"
                            className = "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                            />
            
                        <input 
                            value={input_delivery_postcode}
                            onChange={event => setInputDeliveryPostcode(event.target.value)}
                            id = "delivery_postcode"
                            type = "text"
                            placeholder= "Delivery Postcode"
                            className = "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                            />

                        <select id="vehicle"
                                value={input_vehicle}
                                onChange={event => setInputVehicle(event.target.value)}
                                className = "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                >
                            <option value="bicycle">Bicyle</option>
                            <option value="motorbike">Motorbike</option>
                            <option value="parcel_car">Parcel Car</option>
                            <option value="small_van">Small Van</option>
                            <option value="large_van">Large Van</option>
                        </select>
                    </div>
                    <br />
                    <button type="submit"
                            className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                        Submit
                    </button>
                </form>

                

                <br />
                
                {loadingStatus &&
                    <div> Loading... </div>
                }

                {price !== -1 &&
                    <div className = " block font-bold text-gray-900">
                        A delivery from <em className="text-indigo-600">{pickup}</em> to <em className="text-indigo-600">{delivery}</em> using a <em className="text-indigo-600">{vehicle}</em> will cost you <em className="text-indigo-600">£{price}</em>.
                    </div>
                }
            </div>
        </div>
    );
}

export default QuoteForm;