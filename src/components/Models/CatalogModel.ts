import { IProduct } from '../../types';

export class CatalogModel {
    private _items: IProduct[] = [];
    private _preview: IProduct | null = null;

    setItems(items: IProduct[]): void {
        this._items = items;
    }
    
    getItems(): IProduct[] {
        return this._items;
    }

    getProductById(id: string): IProduct | undefined {
        return this._items.find(item => item.id === id);
    }

    setPreview(product: IProduct | null): void {
        this._preview = product;
    }

    getPreview(): IProduct | null {
        return this._preview;
    }
}
