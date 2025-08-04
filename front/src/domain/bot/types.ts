
export interface IBot {
  id: number;
  name: string;
  description: string;
}

export interface IRequestCreateBotJson {
  name: string;
  description: string;
}

export interface IResponseCreateBotJson {
 
  name: string;
  description: string;  
}

export interface IResponseBotsJson {
  bot: IBot[];
}