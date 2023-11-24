import { SavePurchases } from "@/modules/purchases/useCases/save"
import { randomUUID } from "crypto"

export const mockPurchases = (): SavePurchases.Params => {
    return [
        { id: randomUUID(), value: 99 },
        { id: randomUUID(), value: 20 },
        { id: randomUUID(), value: 234 },
        { id: randomUUID(), value: 15 }
    ]
}