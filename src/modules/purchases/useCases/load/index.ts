import { PurchaseModel } from "../../model";

export interface LoadPurcheses {
    loadAll: () => Promise<LoadPurcheses.Result>; // Promise<LoadPurcheses.Result>;
}

export namespace LoadPurcheses {
    export type Result = PurchaseModel[];
} 
 