export interface User {
  id: number;
  subscriberPhone: string;
  initiatorEmail: string;
  subscriberEmail: string;
  name?: string;
  smsCode: number;
  shortUrl: string;
  file?: File[];

}
