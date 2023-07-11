import { Story } from "./types";

export const getPost = async (id: number): Promise<Story> => {
  const story: Story = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  ).then((res) => res.json());
  return story;
};

export const getNews = async (): Promise<Story[]> => {
  const ids = await fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
  ).then((res) => res.json());
  const stories: Story[] = await Promise.all(
    ids.slice(0, 99).map(async (id: number): Promise<void | Story> => {
      const story: Story = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      ).then((res) => res.json());
      return story;
    })
  );
  return stories;
};

export const getComments = async (id: number): Promise<Story[]> => {
  const kids: number[] = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  )
      .then((res) => res.json())
      .then((res) => res.kids ?? []);

  const comments: Story[] = await Promise.all(
      kids.map(async (id: number): Promise<Story> => {
          const comment: Story = await fetch(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          ).then((res) => res.json());
          return comment;
      })
  );
  return comments;
};
