import { AnyUserResponse } from 'api/interfaces';

export interface AnyUser {
  id?: number;
  name: string;
  picture: string;
}

export interface ProvierProfile {
  providerId: number | null;
  name: string;
  picture: string;
  url: string;
}

export interface AnyUserWithFollow extends AnyUser {
  following?: boolean;
  followed?: boolean;
  followerCount?: number;
  followingCount?: number;
}

export default class AntUserPresenter {
  public static fromResponse(res: AnyUserResponse): AnyUser {
    return {
      id: res.id,
      name: res.name,
      picture: res.picture,
    };
  }
}
