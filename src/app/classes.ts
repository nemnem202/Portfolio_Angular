export interface Work {
  title: string;
  description: string;
  image: string;
  mobileImage: string;
  source: string;
  techs: { name: string; link: string }[];
}

export type MessageDTO = {
  user: string;
  message: string;
};

export class ConversationItem {
  isFromUser: boolean = true;
  message: string = '';
}
