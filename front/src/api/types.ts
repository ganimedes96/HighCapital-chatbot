export interface ResponseServerAction<T = undefined> {
  status: "success" | "error" | "empty";
  message: string;
  data?: T;
}

// export enum StatusServer {
//   success = "success",
//   error = "error",
//   empty = "empty",
// }
