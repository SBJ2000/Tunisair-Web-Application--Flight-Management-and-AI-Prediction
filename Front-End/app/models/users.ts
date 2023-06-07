export interface users {
    id: number;
    name: string;
    email: string;
    code: string;
    jobtitle: string;
    roles: Role[];
  }
  
  export interface Role {
    id: String|null;
    name: string;
  }
  