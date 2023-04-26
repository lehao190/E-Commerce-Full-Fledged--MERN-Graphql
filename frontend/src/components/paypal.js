import React, { useState } from 'react'
import { PayPalButton } from "react-paypal-button-v2";
import { useMutation } from "@apollo/client";
import { PAY_ORDER } from '../graphql/Mutations/orderMutations';
import { credentials } from '../credentials';

// Paypal Button
function Paypal({ totalPrice, orderId }) {
    const [errors, setErrors] = useState("");
    
    const [payOrder] = useMutation(PAY_ORDER);

    if(errors) return <div>Xảy ra lỗi...</div>

    return (
        <PayPalButton
            amount={totalPrice}

            onSuccess={async (details, data) => {
                alert("Hoàn Tất Chi Trả Của Người Dùng: " + details.payer.name.given_name);

                try {
                    await payOrder({
                        variables: {
                            orderId,
                            userOrderId: data.orderID,
                            payerId: data.payerID,
                        },
                        update: () => {
                            setErrors("");
                        }
                    });
                } catch (error) {
                    setErrors(error.graphQLErrors[0].extensions.errors);
                    
                    return null;
                }
        
                console.log("Success Data: ", data);
            }}

            options={{
                clientId: credentials.clientId
            }}
        />
    )
}

export default Paypal;