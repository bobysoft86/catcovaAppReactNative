export interface ApiChat {
  id: number;
  roomId: string;
  type: string;
  createdAt: string;
  members: ApiChatMember[];
  lastMessage?: ApiLastMessage | null;
  unread?: boolean;
  unreadCount?: number;
  highlightCount?: number;
};

export interface ApiLastMessage {
  eventId: string;
  sender: string;
  body: string;
  ts: number;
};


export interface  ApiUser  {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
};

export interface  ApiChatMember  {
  id: number;
  chatRoomId: number;
  userId: number;
  user: ApiUser;
};