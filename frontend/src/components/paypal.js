import React from 'react'
import { PayPalButton } from "react-paypal-button-v2";

function Paypal() {
    return (
        <PayPalButton
            amount="300"
            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
            onSuccess={(details, data) => {
            alert("Transaction completed by " + details.payer.name.given_name);
    
            console.log(details);
            console.log(data);
            
            }}

            onShippingChange={(data, actions) => {
                data.shipping_address.city = "TP.Hồ Chí Minh"
                data.shipping_address.country_code = "VN"
                console.log(data)
                console.log(actions)
                return actions.resolve();
            }}
            options={{
            clientId: "AcQjLMncBXFdRwp3h8FVU-X8zDWtb3zewIq8bf9o9sQlxxBt2l-ruldLs0RnROznv-jtZ9mrSnDrPPqB"
            }}
        />
    )
}

export default Paypal;