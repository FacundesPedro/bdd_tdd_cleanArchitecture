import { SavePurchases } from "@/modules/purchases/useCases/save"
import { randomUUID } from "crypto"

export const mockPurchases = (): SavePurchases.Params => {
    return [
        { id: randomUUID(), value: 99, created_at: new Date() },
        { id: randomUUID(), value: 20, created_at: new Date() },
        { id: randomUUID(), value: 234, created_at: new Date() },
        { id: randomUUID(), value: 15, created_at: new Date() }
    ]
}