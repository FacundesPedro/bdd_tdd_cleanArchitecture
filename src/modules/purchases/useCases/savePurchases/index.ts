import { PurchaseModel } from '../../model';

export interface SavePurchases {
    save: (purchases: SavePurchases.Params) => Promise<void>;
}

export namespace SavePurchases {
    export type Params = PurchaseModel[];
}

// export {
//     savePurchases,
// }