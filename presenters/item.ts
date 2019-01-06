import AntUserPresenter, { AnyUser } from './anyUser';
import * as uuid from 'uuid/v4';
import { ItemResponse } from 'api/interfaces';

export interface Item {
  id?: number;
  genre: string;
  name: string;
  description: string;
  link: string;
  imageUrl: string;
  statusOfUse: ItemStatus;
  key: string;
  createdAt: string;
  updatedAt: string;
  user: AnyUser | null;
}

export enum ItemStatus {
  USING = 'using',
  NOTUSING = 'notusing',
}

export default class ItemPresenter {
  public static fromResponse(res: ItemResponse): Item {
    return {
      id: res.id,
      genre: res.genre && res.genre.name,
      name: res.name,
      description: res.description,
      link: res.link,
      imageUrl: res.image_url,
      statusOfUse: (res.status_of_use as ItemStatus) || ItemStatus.USING,
      createdAt: res.created_at,
      updatedAt: res.updated_at,
      key: uuid(),
      user: AntUserPresenter.fromResponse(res.user),
    };
  }

  public static fromResponses(res: ItemResponse[] = []): Item[] {
    return res.map(r => ItemPresenter.fromResponse(r));
  }
}
