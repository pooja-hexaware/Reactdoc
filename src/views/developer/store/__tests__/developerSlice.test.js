import store from 'store/store'
import {
    developerAdded,
    developerDeleted,
    developerUpdated,
} from '../developerSlice'

describe('testing developer redux store reducers', () => {
    test('add developer to store test', () => {
        let state = store.getState().developer
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            name: 'name',
            age: 39,
            dept: 59.48,
            experience: 67,
            salary: 22,
            dob: 'Fri Jun 02 2023 15:24:03 GMT+0000 (Coordinated Universal Time)',
            fulltime: true,
            phone: 36,
        }
        store.dispatch(developerAdded(initialInput))
        state = store.getState().developer
        expect(state.entities).toHaveLength(1)
    })

    test('update developer from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            name: 'name',
            age: 58,
            dept: 49.3,
            experience: 51,
            salary: 20,
            dob: 'Fri Jun 02 2023 15:24:03 GMT+0000 (Coordinated Universal Time)',
            fulltime: true,
            phone: 81,
        }
        store.dispatch(developerAdded(initialInput))
        let state = store.getState().developer
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            name: 'name',
            age: 11,
            dept: 89.73,
            experience: 57,
            salary: 83,
            dob: 'dob',
            fulltime: true,
            phone: 23,
        }
        store.dispatch(developerUpdated(updatedInput))
        state = store.getState().developer
        let changedDeveloper = state.entities.find((p) => p.id === 2)
        expect(changedDeveloper).toStrictEqual(updatedInput)
    })

    test('delete developer from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            name: 'name',
            age: 77,
            dept: 64.33,
            experience: 4,
            salary: 7,
            dob: 'Fri Jun 02 2023 15:24:03 GMT+0000 (Coordinated Universal Time)',
            fulltime: true,
            phone: 35,
        }
        store.dispatch(developerAdded(initialInput))
        let state = store.getState().developer
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            developerDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().developer
        expect(state.entities).toHaveLength(2)
    })
})
