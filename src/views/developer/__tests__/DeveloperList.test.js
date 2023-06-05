const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import DeveloperList from '../DeveloperList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Developer rows when api response has data', async () => {
    const endPoint = 'developer'
    const getDeveloperListResponse = [
        {
            id: 1,
            name: 'name',
            age: 26,
            dept: 61.49,
            experience: 77,
            salary: 62,
            dob: 'dob',
            fulltime: false,
            phone: 99,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getDeveloperListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <DeveloperList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const developerNameCell = await screen.findByText(/name/i)

    expect(developerNameCell).toHaveTextContent(/name/i)
    mock.reset()
})
