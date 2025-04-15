import type {
  GetRanking200,
  GetSubscriberInviteClicks200,
  GetSubscriberInviteCount200,
  GetSubscriberRankingPosition200,
  SubscribeToEvent201,
  SubscribeToEventBody,
} from "@/http/api";

export const subscribeToEvent = async (
  subscribeToEventBody: SubscribeToEventBody,
): Promise<SubscribeToEvent201> => {
  return {
    subscriberId: "mock-subscriber-id",
  };
};

export const getRanking = async (): Promise<GetRanking200> => {
  return {
    ranking: [
      { id: "1", name: "João Silva", score: 120 },
      { id: "2", name: "Maria Souza", score: 90 },
      { id: "3", name: "Pedro Santos", score: 70 },
    ],
  };
};

export const getSubscriberInviteCount = async (
  subscriberId: string,
): Promise<GetSubscriberInviteCount200> => {
  return { count: 8 };
};

export const getSubscriberInviteClicks = async (
  subscriberId: string,
): Promise<GetSubscriberInviteClicks200> => {
  return { count: 15 };
};

export const getSubscriberRankingPosition = async (
  subscriberId: string,
): Promise<GetSubscriberRankingPosition200> => {
  return { position: 5 };
};
