  export type RootStackParamList = {
    Home: { menuItems: MenuItem[]; newItem?: MenuItem }; 
    AddItems: { menuItems?: MenuItem[] }; 
    Filter: { menuItems: MenuItem[] }; 
  };
  
  export type MenuItem = {
    dishName: string;
    description: string;
    course: string;
    price: number;
  };
  
  