export type CardData = {
  breeds: any[];
  id: string;
  url: string;
  width: number;
  height: number;
};

export type CardDataWithFavorite = {
  breeds: any[];
  id: string;
  url: string;
  width: number;
  height: number;
  isFavorite: boolean;
};
