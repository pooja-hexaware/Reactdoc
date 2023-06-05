import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'developer'

export const fetchDeveloper = createAsyncThunk(
    'developer/fetchDeveloper',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const developer = await response.data
        return developer
    }
)

export const addDeveloper = createAsyncThunk(
    'developer/addDeveloper',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const developer = await response.data
        thunkAPI.dispatch(showSuccess('Developer added successfully'))
        return developer
    }
)

export const editDeveloper = createAsyncThunk(
    'developer/editDeveloper',
    async (data, thunkAPI) => {
        let body = {
            ...data,
        }

        delete body['id']

        const response = await axios.put(`/${endPoint}/${data.id}`, body)
        const developer = await response.data
        thunkAPI.dispatch(showSuccess('Developer updated successfully'))
        return developer
    }
)

export const deleteDeveloper = createAsyncThunk(
    'developer/deleteDeveloper',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected developer deleted successfully.')
            )
            return data.id
        }
    }
)
