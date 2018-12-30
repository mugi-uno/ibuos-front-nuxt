export interface PaginatingResponse {
  current_page: number;
  limit_value: number;
  offset_value: number;
  total_count: number;
  total_pages: number;
  is_last_page: boolean;
}

export interface AnyUserResponse {
  id: number;
  name: string;
  picture: string;
}

export interface AnyUserWithFollowResponse extends AnyUserResponse {
  following: boolean;
  followed: boolean;
  follower_count: number;
  following_count: number;
}

export interface ItemResponse {
  id: number;
  genre: { name: string };
  name: string;
  description: string;
  link: string;
  image_url: string;
  key: string;
  created_at: string;
  updated_at: string;
  user: AnyUserResponse;
}
