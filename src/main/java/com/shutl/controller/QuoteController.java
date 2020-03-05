package com.shutl.controller;

import com.shutl.model.Quote;
import org.springframework.web.bind.annotation.*;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@CrossOrigin(origins="*")
@RestController
public class QuoteController {

    @RequestMapping(value = "/quote", method = POST)
    public @ResponseBody Quote quote(@RequestBody Quote quote) {
        Long basePrice = Math.abs((Long.valueOf(quote.getDeliveryPostcode(), 36) - Long.valueOf(quote.getPickupPostcode(), 36))/100000000);
        Long price = Math.round(basePrice * quote.getVehicle().markupMultiple);
        return new Quote(quote.getPickupPostcode(), quote.getDeliveryPostcode(), quote.getVehicle(), price);
    }
}
