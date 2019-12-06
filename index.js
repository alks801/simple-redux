// Simple Redux implementation

// Implementation of createStore
const createStore = (reducer) => {
    let listenres = [];
    let currentState = reducer(undefined, {});

    return {
        getState: () => currentState,
        dispatch: (action) => {
            currentState = reducer(currentState, action);

            listenres.forEach(listener => listener());
        },
        subscribe: (newListener) => {
            listenres.push(newListener);

            const unsubscribe = () => {
                listenres = listenres.filter(l => l !== newListener);
            };

            return unsubscribe;
        }
    }
}

// App state
const initState = {
    variable: 0
};

// Actions
const actions = {
    increase: { type: 'INCREASE' },
    reduce: { type: 'REDUCE' }
};

// Reducer
const stateReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.increase.type:
            return {
                variable: state.variable + 1
            };
        case actions.reduce.type:
            return {
                variable: state.variable - 1
            };
        default:
            return state;
    }
}

// Usage
const store = createStore(stateReducer);

store.subscribe(() => console.log(store.getState()));

store.dispatch(actions.increase);
store.dispatch(actions.reduce);
