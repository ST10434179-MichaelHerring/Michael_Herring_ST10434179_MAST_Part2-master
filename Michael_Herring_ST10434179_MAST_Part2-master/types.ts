// types.ts
/*export type RootStackParamList = {
    Home: { newItem?: { dishName: string, description: string, course: string, price: number } };
    AddItems: undefined;
    Filter: { menuItems: { dishName: string; description: string; course: string; price: number }[] };
  };
  */
 /*
  export type RootStackParamList = {
    Home: { newItem?: { dishName: string; description: string; course: string; price: number } }; // Allow newItem parameter
    AddItems: undefined;
    Filter: { menuItems: { dishName: string; description: string; course: string; price: number }[] };
  };
  */

  export type RootStackParamList = {
    Home: { menuItems: MenuItem[]; newItem?: MenuItem }; // Home screen expects menuItems
    AddItems: { menuItems?: MenuItem[] }; // AddItems screen expects an optional menuItems
    Filter: { menuItems: MenuItem[] }; // Filter screen expects menuItems
  };
  
  export type MenuItem = {
    dishName: string;
    description: string;
    course: string;
    price: number;
  };
  
  