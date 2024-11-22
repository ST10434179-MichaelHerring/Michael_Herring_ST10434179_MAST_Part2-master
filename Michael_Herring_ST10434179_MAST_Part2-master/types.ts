// types.ts
/*export type RootStackParamList = {
    Home: { newItem?: { dishName: string, description: string, course: string, price: number } };
    AddItems: undefined;
    Filter: { menuItems: { dishName: string; description: string; course: string; price: number }[] };
  };
  */
  export type RootStackParamList = {
    Home: { newItem?: { dishName: string; description: string; course: string; price: number } }; // Allow newItem parameter
    AddItems: undefined;
    Filter: { menuItems: { dishName: string; description: string; course: string; price: number }[] };
  };
  
  