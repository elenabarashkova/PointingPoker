export const ORIGIN_URL = window.location.origin;

export const getGameLink = (gameId: string): string => `${ORIGIN_URL}/?roomId=${gameId}`;
