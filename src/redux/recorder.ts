import { Action } from "redux";
import { RootState } from "./store";

//action string constants 
const START = 'recorder/start';
const STOP = 'recorder/stop';

//action types 
type StartAction = Action<typeof START>;
type StopAction = Action<typeof STOP>;

//action creators 
export const start = (): StartAction => ({
    type: START
});
export const stop = (): StopAction => ({
    type: STOP
});

export const selectRecorderState = (rootState: RootState) => rootState.recorder;
export const selectDateStart = (rootState: RootState) => selectRecorderState(rootState).dateStart;

//component state type 
interface RecorderState {
    dateStart: string;
}

//component initial state, which is of type RecorderState 
const initialState: RecorderState = {
    dateStart: ''
};

const recorderReducer = (
    state: RecorderState = initialState,
    action: StartAction | StopAction
) => {
    switch (action.type) {
        case START:
            return {
                ...state,
                dateStart: new Date().toISOString()
            };
        case STOP:
            return {
                ...state,
                dateStart: ''
            };
        default:
            return state;
    }
}

export default recorderReducer;
