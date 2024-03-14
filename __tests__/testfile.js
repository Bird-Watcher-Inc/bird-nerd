import appSliceReducer from '../client/slices/appSlice.js'

describe('appSliceReducer', ()=>{
    let startState; 
    const fakeAction = {type: 'NOT_ACTION'}; 

    beforeEach(()=>{
        startState = {
            currentUser: 'myUser',
            isLoggedIn: false,
        }
    }); 

    it('should provide a default state for fake action', () => {
        const result = appSliceReducer(undefined, fakeAction);
        expect(result).toEqual({
            currentUser: 'myUser',
            isLoggedIn: false,
        }) 
    })

})