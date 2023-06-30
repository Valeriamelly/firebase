import { FileHandle } from "./file-handle.model";

export interface Product {
    productId: number | null;
    productName: string;
    productDescription: string;
    productDiscountedPrice: number;
    productActualPrice: number;
    productImages: FileHandle[];
}