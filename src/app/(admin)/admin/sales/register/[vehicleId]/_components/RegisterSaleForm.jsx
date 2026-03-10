"use client";

import SaleForm from "../../../_components/SaleForm";

export default function RegisterSaleForm({ vehicle, sellerId }) {
    return (
        <SaleForm vehicle={vehicle} sellerId={sellerId} />
    );
}
