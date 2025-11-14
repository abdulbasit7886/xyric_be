import { Document, Model } from "mongoose";
export interface ItemDocument extends Document {
    title: string;
    description?: string;
    category?: string;
    price: number;
    quantity: number;
    tags: string[];
    status: "active" | "inactive" | "archived";
    createdAt: Date;
    updatedAt: Date;
}
export declare const Item: Model<ItemDocument>;
//# sourceMappingURL=item.model.d.ts.map