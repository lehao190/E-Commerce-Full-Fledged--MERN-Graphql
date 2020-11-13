import React, { useState } from 'react';
import { useMutation} from "@apollo/client";
import { PRODUCT_DELETE } from "../graphql/Mutations/productMutations";
import { PRODUCTS } from '../graphql/Queries/productQueries';

function Item({ product: { id, image, name, price, brand, category }, history }) {
    const [deleteProduct] = useMutation(PRODUCT_DELETE);

    const [errors, setErrors] = useState("");

    const onClick = async () => {
        try {
            await deleteProduct({ 
                variables: { 
                    id,
                    filename: image
                },
                update: (cache) => {
                    const existingProducts = cache.readQuery({
                        query: PRODUCTS
                    });

                    cache.evict({
                        fieldName: "notifications",
                        broadcast: false
                    });

                    cache.writeQuery({
                        query: PRODUCTS,
                        data: {
                            products: existingProducts.products.filter((product) => product.id !== id)
                        }
                    });
                    
                    setErrors("");
                },
            });
        } catch (error) {
            setErrors(error.graphQLErrors[0].extensions.errors);
            return null;
        }
    };

    return (
        <tr>
            

            <td>
                {errors && errors.isAdmin}
                {/* <h1>5a428asdac155a</h1> */}
                <h1>{id}</h1>
            </td>

            <td>
                {/* <h1>Berus version 2.2</h1> */}
                <h1>{name}</h1>
            </td>

            <td>
                {/* <h1>$ 89</h1> */}
                <h1>$ {price}</h1>
            </td>

            <td>
                {/* <h1>Electronics</h1> */}
                <h1>{category}</h1>
            </td>

            <td>
                {/* <h1>AWS</h1> */}
                <h1>{brand}</h1>
            </td>

            <td>
                <span className="edit"><i className="far fa-edit"></i></span>
                <span onClick={onClick} className="delete"><i className="fas fa-trash"></i></span>
            </td>
        </tr>
    )
}

export default Item;