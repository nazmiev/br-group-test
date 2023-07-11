import { ActionFunctionArgs, ParamParseKey, Params } from "react-router-dom";

export interface Story {
  id: number;
  title: string;
  by: string;
  url: string;
  text?: string;
  score: number; 
  time: number;
  kids: [];
}

const PathNames = {
  newsId: '/news/:newsId',
} as const;

export interface LoaderParams extends ActionFunctionArgs{
  params: Params<ParamParseKey<typeof PathNames.newsId>>;
}

export interface PostType {
  post: Story;
  comments: Story[];
}
