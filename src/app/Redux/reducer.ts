import { appState, defaultAppState } from "./app-state";
import { actionType } from "./action-type";
import { action } from "./action";

export function reducer(currentState: appState = defaultAppState, action: action): appState {

    const newState = { ...currentState };

    switch (action.type) {
        case actionType.GetAllProducts: newState.products = action.payLoad;
        sessionStorage.setItem("products", JSON.stringify(newState.products));
            break;
    }
    return newState;
}

