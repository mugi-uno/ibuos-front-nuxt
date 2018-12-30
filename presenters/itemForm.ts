import { TemporaryImage } from "./temporaryImage";
import { Item } from "./item";

export interface ItemForm {
  id?: number;
  genre: string;
  name: string;
  description: string;
  link: string;
  imageUrl: string;
  temporaryImage: TemporaryImage;
}

export default class ItemFormPresenter {
  public static build(): ItemForm {
    const temporaryImage: TemporaryImage = {
      imageTemporaryBasename: '',
      imageTemporaryUrl: ''
    };

    return {
      genre: '',
      name: '',
      description: '',
      link: '',
      imageUrl: '',    
      temporaryImage
    };
  }

  public static buildFromItem(item: Item): ItemForm {
    const temporaryImage: TemporaryImage = {
      imageTemporaryBasename: '',
      imageTemporaryUrl: ''
    };

    return {
      ...item,
      temporaryImage
    };
  }
}
