package com.shutl.model;

public enum Vehicle {
    bicycle (1.10),
    motorbike(1.15),
    parcel_car (1.20),
    small_van (1.30),
    large_van (1.40);

    public final double markupMultiple;

    Vehicle(double markupMultiple){
        this.markupMultiple = markupMultiple;
    }
}
