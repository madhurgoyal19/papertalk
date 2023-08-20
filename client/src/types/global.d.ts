export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */

  interface Message {
    role: string;
    content: string;
  }

  interface Chat {
    chatId: string;
    chatTitle: string;
    messages: Array<Message>;
    model: string;
    updatedAt: Date;
    pdf?: File;
  }

  interface ChatSmall {
    chatId: string;
    chatTitle: string;
  }
}

// interface Chat {
//   chatId: string;
//   chatTitle: string;
//   messages: Array<Message>;
//   model: string;
//   updatedAt: Date;
//   pdf: string;
// }
