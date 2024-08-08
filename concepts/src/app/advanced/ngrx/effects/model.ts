interface Post{
    id:number,
    title:string,
    description:string
  }
  
  export interface AppState{
    name:string,
    email:string,
    mobile:number,
    id:number,
    posts:Post[]
  
  }
  