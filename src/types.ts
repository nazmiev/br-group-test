export interface Story {
  id: number;
  title: string;
  by: string;
  url: string;
  text?: string;
  time?: string;
  kids: [];
}

export interface LoaderParams {
  params: ParamsType;
}

export interface ParamsType {
  newsId: number;
}

export interface PostType {
  post: Story;
  comments: Story[];
}
