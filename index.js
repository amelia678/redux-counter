const {createStore} = require('redux')
const uuid = require('uuid/v4')
// #1 write out an example/default version of my application state

const defaultState = {
    counters: [
        {
            id: uuid(),
            count: 0
        }
    ] 
}


// #2 - describe the ways that state can change
// -count can go up by one
// -count can go down by one
// #2b - find single words or short phrases for those changes
// - increment
// - decrement
// #2c translate those into objects

const ACTION_INC = {
    type: 'INCREMENT' //common to uppercase

};

const ACTION_DEC = {
    type: 'DECREMENT'

}

// "action creators"
// when you need to configure an action, write a function
const incrementCounter= (id) => {
    return {
        ...ACTION_INC,
        id
    }
}

const decrementCounter= (id) => {
    return {
        ...ACTION_DEC,
        id
    }
}


// #3 -write a pure function that accepts the current state and an action, then returns
// the new version state

const counter = (state=defaultState, action) => {
    // check the action.type
    switch(action.type) {
        // if (action.type === ACTION_INC.type) {
        case ACTION_INC.type:
        // if it's 'INCREMENT', return a new state object with the count + 1
            return {
                // count: state.count + 1
                // want to return the array of counters
                // but modify the on where its id === action.id
                counters: state.counters.map(oneCounter => {
                    if (oneCounter.id === action.id) {
                        // return a new version of oneCounter
                        return {
                            ...oneCounter,
                            count: oneCounter.count + 1
                        }
                    } else {
                        return oneCounter;
                    }
                })
            }
        case ACTION_DEC.type:
        // if it's 'DECREMENT', return a new state object with the count - 1
            // return {
            //     count: state.count - 1
            // }
            return{
                counters: state.counters.map(oneCounter => {
                    if (oneCounter.id === action.id) {
                        // return a new version of oneCounter
                        return {
                            ...oneCounter,
                            count: oneCounter.count - 1
                        }
                    } else {
                        return oneCounter;
                    }
                })
            }
        default:
        //  else return the state as-is
        return state;
        }
    };

// #4 create your store that knows how to use your reducer function
const store = createStore(counter);

// subscribe to any notifications of any changes to the state
store.subscribe(() => {
    const theState = store.getState();
    console.log(`The state is now ${theState.count}`)
});

module.exports = {
    store,
    incrementCounter,
    decrementCounter,
    ACTION_INC,
    ACTION_DEC
}
    

/*

const {
     store, 
     ACTION_INC,
     ACTION_DEC
     } = require('./index');


     */