import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { PRODUCT_DELETE } from "../graphql/Mutations/productMutations";

function Item({ product: { id, image, name, price, brand, category }, history }) {
    const [deleteProduct] = useMutation(PRODUCT_DELETE);

    const [errors, setErrors] = useState("");
    // const [id, setId] = useState("");
    // const [filename, setFilename] = useState("");

    const onClick = async () => {
        try {
            await deleteProduct({ 
                variables: { 
                    id,
                    filename: image
                },
                update: async (cache, { data: { createProduct } }) => {
                    // const existingProducts = await cache.readQuery({
                    //     query: PRODUCTS
                    // });

                    // const newProduct = createProduct;

                    // cache.writeQuery({
                    //     query: PRODUCTS,
                    //     data: {
                    //         products: [newProduct, ...existingProducts.products]
                    //     }
                    // });

                    setErrors("");
                    history.push({
                        pathname: "/"
                    });
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