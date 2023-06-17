import { createContext } from 'react';
const Store = createContext({
    asideMobileExpanded: true,
    asideLgActive: true,
    apiCallsInProgress: 0,
    toastMsgs: [],
});
export const CatalogsStore = createContext({
    catalog: [
        {
            isSelected: false,
            Qty:1,
            _id: "",
            ProductName: "",
            cShopVisiblity: false,
            Delivery: false,
            ItemPrice: 0,
            Quantity: "",
            createdAt: "string",
        }
    ],
    setCatalog: null
});
export default Store;