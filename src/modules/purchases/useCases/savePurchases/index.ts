import { PurchaseModel } from '../../model';

export interface savePurchases {
    save: (purchases: PurchaseModel[]) => Promise<void>;
}

// export {
//     savePurchases,
// }