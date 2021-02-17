import { actionType } from "./action-type";

export interface action {
    type: actionType;
    payLoad?: any;
}