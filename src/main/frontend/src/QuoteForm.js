import React, {useState} from 'react';
const QuoteForm = () => {
    const [pickup_postcode, setPickupPostcode] = useState('');
    const [delivery_postcode, setDeliveryPostcode] = useState('');
    const [vehicle, setVehicle] = useState('bicycle');

    return (
        <div >
            <div>
                <h2>
                    Get a Quote Instantly
                </h2>
                <form>
                    <label>Pickup Postcode:
                        <input 
                            value={pickup_postcode}
                            onChange={event => setPickupPostcode(event.target.value)}
                            id = "pickup_postcode"
                            type = "text"
                            />
                    </label>
                    <br />
                    <label>Delivery Postcode:
                        <input 
                            value={delivery_postcode}
                            onChange={event => setDeliveryPostcode(event.target.value)}
                            id = "delivery_postcode"
                            type = "text"
                            />
                    </label>
                    <br />
                    <label>Vehicle:
                        <select id="vehicle"
                                value={vehicle}
                                onChange={event => setVehicle(event.target.value)}>
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


                pickupPostcode: {pickup_postcode}
                <br />
                deliveryPostcode: {delivery_postcode}
                <br />
                vehicle: {vehicle}
            </div>
        </div>
    );
}

export default QuoteForm;