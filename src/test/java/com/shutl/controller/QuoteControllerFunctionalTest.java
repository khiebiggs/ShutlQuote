package com.shutl.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shutl.Application;
import com.shutl.model.Quote;
import com.shutl.model.Vehicle;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@WebAppConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
public class QuoteControllerFunctionalTest {

    @Autowired private WebApplicationContext webApplicationContext;

    ObjectMapper objectMapper = new ObjectMapper();

    private MockMvc mockMvc;

    @Before
    public void setup() {
        this.mockMvc = webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    public void testBasicService() throws Exception {
        Quote quoteData = new Quote("SW1A1AA", "EC2A3LT", Vehicle.bicycle);
        MvcResult result = this.mockMvc.perform(post("/quote")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(quoteData)))
            .andExpect(status().isOk())
            .andReturn();

        Quote quote = objectMapper.readValue(result.getResponse().getContentAsString(), Quote.class);
        assertEquals(quote.getPickupPostcode(), "SW1A1AA");
        assertEquals(quote.getDeliveryPostcode(), "EC2A3LT");
        assertEquals(quote.getVehicle(), Vehicle.bicycle);
        assertEquals(quote.getPrice(), new Long(348));
    }

    @Test
    public void testVariablePricingByDistance() throws Exception {
        Quote quoteData = new Quote("SW1A1AA", "EC2A3LT", Vehicle.bicycle);
        MvcResult result = this.mockMvc.perform(post("/quote")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(quoteData)))
            .andExpect(status().isOk())
            .andReturn();

        Quote quote = objectMapper.readValue(result.getResponse().getContentAsString(), Quote.class);
        assertEquals(quote.getPickupPostcode(), "SW1A1AA");
        assertEquals(quote.getDeliveryPostcode(), "EC2A3LT");
        assertEquals(quote.getVehicle(), Vehicle.bicycle);
        assertEquals(quote.getPrice(), new Long(348));

        quoteData = new Quote("AL15WD", "EC2A3LT", Vehicle.bicycle);
        result = this.mockMvc.perform(post("/quote")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(quoteData)))
            .andExpect(status().isOk())
            .andReturn();

        quote = objectMapper.readValue(result.getResponse().getContentAsString(), Quote.class);
        assertEquals(quote.getPickupPostcode(), "AL15WD");
        assertEquals(quote.getDeliveryPostcode(), "EC2A3LT");
        assertEquals(quote.getVehicle(), Vehicle.bicycle);
        assertEquals(quote.getPrice(), new Long(336));
    }

    @Test
    public void testVariablePricingByVehicle() throws Exception {
        Quote bicycleQuoteData = new Quote("SW1A1AA", "EC2A3LT", Vehicle.bicycle);
        MvcResult result = this.mockMvc.perform(post("/quote")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(bicycleQuoteData)))
                .andExpect(status().isOk())
                .andReturn();

        Quote bicycleQuote = objectMapper.readValue(result.getResponse().getContentAsString(), Quote.class);
        assertEquals(bicycleQuote.getPickupPostcode(), "SW1A1AA");
        assertEquals(bicycleQuote.getDeliveryPostcode(), "EC2A3LT");
        assertEquals(bicycleQuote.getVehicle(), Vehicle.bicycle);
        assertEquals(bicycleQuote.getPrice(), new Long(348));

        Quote motorbikeQuoteData = new Quote("SW1A1AA", "EC2A3LT", Vehicle.motorbike);
        result = this.mockMvc.perform(post("/quote")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(motorbikeQuoteData)))
                .andExpect(status().isOk())
                .andReturn();

        Quote motorbikeQuote = objectMapper.readValue(result.getResponse().getContentAsString(), Quote.class);
        assertEquals(motorbikeQuote.getPickupPostcode(), "SW1A1AA");
        assertEquals(motorbikeQuote.getDeliveryPostcode(), "EC2A3LT");
        assertEquals(motorbikeQuote.getVehicle(), Vehicle.motorbike);
        assertEquals(motorbikeQuote.getPrice(), new Long(363));

        Quote parcelCarQuoteData = new Quote("SW1A1AA", "EC2A3LT", Vehicle.parcel_car);
        result = this.mockMvc.perform(post("/quote")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(parcelCarQuoteData)))
                .andExpect(status().isOk())
                .andReturn();

        Quote parcelCarQuote = objectMapper.readValue(result.getResponse().getContentAsString(), Quote.class);
        assertEquals(parcelCarQuote.getPickupPostcode(), "SW1A1AA");
        assertEquals(parcelCarQuote.getDeliveryPostcode(), "EC2A3LT");
        assertEquals(parcelCarQuote.getVehicle(), Vehicle.parcel_car);
        assertEquals(parcelCarQuote.getPrice(), new Long(379));

        Quote smallVanQuoteData = new Quote("SW1A1AA", "EC2A3LT", Vehicle.small_van);
        result = this.mockMvc.perform(post("/quote")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(smallVanQuoteData)))
                .andExpect(status().isOk())
                .andReturn();

        Quote smallVanQuote = objectMapper.readValue(result.getResponse().getContentAsString(), Quote.class);
        assertEquals(smallVanQuote.getPickupPostcode(), "SW1A1AA");
        assertEquals(smallVanQuote.getDeliveryPostcode(), "EC2A3LT");
        assertEquals(smallVanQuote.getVehicle(), Vehicle.small_van);
        assertEquals(smallVanQuote.getPrice(), new Long(411));

        Quote largeVanQuoteData = new Quote("SW1A1AA", "EC2A3LT", Vehicle.large_van);
        result = this.mockMvc.perform(post("/quote")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(largeVanQuoteData)))
                .andExpect(status().isOk())
                .andReturn();

        Quote largeVanQuote = objectMapper.readValue(result.getResponse().getContentAsString(), Quote.class);
        assertEquals(largeVanQuote.getPickupPostcode(), "SW1A1AA");
        assertEquals(largeVanQuote.getDeliveryPostcode(), "EC2A3LT");
        assertEquals(largeVanQuote.getVehicle(), Vehicle.large_van);
        assertEquals(largeVanQuote.getPrice(), new Long(442));
    }
}
