import { fakeUsers } from "../leaderboard/fakeUsers";

export const useLeaderboardUsers = () => {
  return fakeUsers.sort((a, b) => b.score - a.score);
};

export const useLeaderboardRank = (username) => {
  const leaderboardUsers = useLeaderboardUsers();
  const index = leaderboardUsers.findIndex((user) => user.username === username);
  return index === -1 ? null : index + 1;
};
