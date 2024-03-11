import { UserData } from "../../../proto/typescript/pb_out/main";

// JSONからのデータに型付する
declare module '*/user-data.json' {
  const value: UserData
  export default value
}