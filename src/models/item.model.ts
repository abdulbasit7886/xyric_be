import mongoose, { Schema, Document, Model } from "mongoose";

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

const ItemSchema = new Schema<ItemDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    tags: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["active", "inactive", "archived"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

ItemSchema.index({
  title: "text",
  description: "text",
  tags: "text",
  category: "text",
});

export const Item: Model<ItemDocument> =
  mongoose.models.Item || mongoose.model<ItemDocument>("Item", ItemSchema);
