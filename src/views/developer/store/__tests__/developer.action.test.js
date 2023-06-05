import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchDeveloper,
    addDeveloper,
    editDeveloper,
    deleteDeveloper,
} from '../developer.action'

const getDeveloperListResponse = [
    {
        id: 1,
        name: 'name',
        age: 34,
        dept: 33.26,
        experience: 73,
        salary: 65,
        dob: 'dob',
        fulltime: true,
        phone: 25,
    },
]

const addDeveloperListResponse = (data) => {
    return { id: 2, ...data }
}
const editDeveloperListResponse = (data) => {
    return data
}

describe('should test Developer redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'developer'
    test('Should be able to fetch the developer list and update developer redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getDeveloperListResponse)
        const result = await store.dispatch(fetchDeveloper())
        const developerList = result.payload
        expect(result.type).toBe('developer/fetchDeveloper/fulfilled')
        expect(developerList).toEqual(getDeveloperListResponse)

        const state = store.getState().developer
        expect(state.entities).toEqual(developerList)
    })

    test('Should be able to add new developer to list and make post api and update developer redux store', async () => {
        const body = {
            name: 'name',
            age: 14,
            dept: 61.76,
            experience: 52,
            salary: 24,
            dob: 'dob',
            fulltime: false,
            phone: 38,
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addDeveloperListResponse(body)
        )
        const result = await store.dispatch(addDeveloper(body))
        const developerItem = result.payload
        expect(result.type).toBe('developer/addDeveloper/fulfilled')
        expect(developerItem).toEqual(addDeveloperListResponse(body))

        const state = store.getState().developer
        expect(state.entities).toContainEqual(addDeveloperListResponse(body))
    })

    test('Should be able to edit developer in list and make put api call and update developer redux store', async () => {
        const body = {
            id: 1,
            name: 'name',
            age: 45,
            dept: 90.54,
            experience: 89,
            salary: 52,
            dob: 'dob',
            fulltime: false,
            phone: 50,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editDeveloperListResponse(body)
        )
        const result = await store.dispatch(editDeveloper(body))
        const developerItem = result.payload
        expect(result.type).toBe('developer/editDeveloper/fulfilled')
        expect(developerItem).toEqual(editDeveloperListResponse(body))

        const state = store.getState().developer
        let changedDeveloper = state.entities.find((p) => p.id === body.id)
        expect(changedDeveloper.name).toEqual(body.name)
    })

    test('Should be able to delete developer in list and update developer redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().developer
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteDeveloper(input))
        const deletId = result.payload
        expect(result.type).toBe('developer/deleteDeveloper/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().developer
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
