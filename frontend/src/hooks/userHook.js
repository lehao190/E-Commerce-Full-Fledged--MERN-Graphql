import { useState } from "react";

export const userHook = userValues => {
    // const [values, setValues] = useState("");
    // setValues(userValues);
    
    return {
        values: userValues
    }
}