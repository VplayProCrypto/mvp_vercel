import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable
  } from 'kysely'
  
  export interface Database {
    users: UserTable
  }
  
  export interface UserTable {
    id: Generated<number>
    email: string
    name: string | null
    username: string | null
 
  }
  

  export type Users = Selectable<UserTable>
  export type NewUser = Insertable<UserTable>
  export type UserUpdate = Updateable<UserTable>
  
