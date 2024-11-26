import { HttpMethods } from "../enums/HttpMethods";

export type FetchConfig = {
    method?: HttpMethods;
    url: string;
    body?: object;
    header?: object;
}