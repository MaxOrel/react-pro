import { createContext } from 'react';

export const UserContext = createContext<User | null>(null);
UserContext.displayName = 'UserContext';
