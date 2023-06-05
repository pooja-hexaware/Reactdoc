const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddDeveloper from '../AddDeveloper'

beforeEach(() => {
    const endPoint = 'developer'
    const getStudentListResponse = [
        {
            id: 1,
            name: 'name',
            age: 62,
            dept: 78.55,
            experience: 73,
            salary: 92,
            dob: 'dob',
            fulltime: true,
            phone: 78,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddDeveloper />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view DeveloperAdd Component', () => {
    test('should render AddDeveloper and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addDeveloperButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const nameElement = screen.getByLabelText(/Name/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const deptElement = screen.getByLabelText(/Dept/i)
        const experienceElement = screen.getByLabelText(/Experience/i)
        const salaryElement = screen.getByLabelText(/Salary/i)
        const dobElement = screen.getByLabelText(/Dob/i)
        const fulltimeElement = screen.getByLabelText(/Fulltime/i)
        const phoneElement = screen.getByLabelText(/Phone/i)

        expect(addDeveloperButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(ageElement).toBeInTheDocument()
        expect(deptElement).toBeInTheDocument()
        expect(experienceElement).toBeInTheDocument()
        expect(salaryElement).toBeInTheDocument()
        expect(dobElement).toBeInTheDocument()
        expect(fulltimeElement).toBeInTheDocument()
        expect(phoneElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Developer add form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const deptElement = screen.getByLabelText(/Dept/i)
        const experienceElement = screen.getByLabelText(/Experience/i)
        const salaryElement = screen.getByLabelText(/Salary/i)
        const dobElement = screen.getByLabelText(/Dob/i)
        const fulltimeElement = screen.getByLabelText(/Fulltime/i)
        const phoneElement = screen.getByLabelText(/Phone/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(ageElement, { target: { value: 25 } })
        fireEvent.change(deptElement, { target: { value: 47.05 } })
        fireEvent.change(experienceElement, { target: { value: 28 } })
        fireEvent.change(salaryElement, { target: { value: 50 } })
        fireEvent.change(dobElement, { target: { value: 'dob' } })
        fireEvent.change(phoneElement, { target: { value: 57 } })

        fireEvent.mouseDown(fulltimeElement)
        const fulltimelistbox = within(screen.getByRole('listbox'))
        fireEvent.click(fulltimelistbox.getByText(/False/))
        expect(fulltimeElement).toHaveTextContent(/False/i)
    })

    test('should return error message when add Developer button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addDeveloperButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addDeveloperButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(8)
    })
})
