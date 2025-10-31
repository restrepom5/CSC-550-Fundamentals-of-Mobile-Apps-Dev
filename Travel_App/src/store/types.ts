// Import the main store configuration
import { store } from './store';

// Define the RootState type as the return type of store.getState()
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type as the type of store.dispatch
export type AppDispatch = typeof store.dispatch;

// You don't need to import these into your components, 
// they are mainly used internally to create correctly typed hooks (optional) 
// but RootState is critical for useSelector.