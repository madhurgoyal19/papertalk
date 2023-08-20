import Dexie from "dexie";

export class PaperTalkDB extends Dexie {
  chats!: Dexie.Table<Chat, string>;

  constructor() {
    super("papertalkDB");
    this.version(1).stores({
      chats: "chatId, chatTitle",
    });
  }
}
const database = new PaperTalkDB();
export const ChatTable = database.chats;
