import { useLocation } from 'react-router-dom';

export const useQuery = (): string => new URLSearchParams(useLocation().search).get('roomId');
