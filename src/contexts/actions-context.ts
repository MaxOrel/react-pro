import { ReactNode, createContext } from 'react';

export interface ActionType {
	icon: ReactNode;
	name: string;
}
export interface ActionContextType {
	quickActions: ActionType[];
	setQuickActions: (actions: ActionType[]) => void;
}
export const ActionsContext = createContext<ActionContextType | null>(null);
ActionsContext.displayName = 'ActionsContext';
