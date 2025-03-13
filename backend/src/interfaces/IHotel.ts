export interface IHotel {
  _id: string;
  image_url: string;
  name: string;
  localization: string;
  rate: number;
  start_price: number | null;
}
