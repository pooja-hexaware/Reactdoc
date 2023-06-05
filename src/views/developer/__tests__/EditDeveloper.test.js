const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditDeveloper from '../EditDeveloper'
import { developerAdded } from '../store/developerSlice'
beforeAll(() => {
    store.dispatch(
        developerAdded({
            id: 1,
            name: 'name',
            age: 86,
            dept: 65.04,
            experience: 91,
            salary: 28,
            dob: 'dob',
            fulltime: false,
            phone: 76,
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="developer/edit/1" replace />
                                }
                            />
                            <Route
                                path="developer/edit/:id"
                                element={<EditDeveloper />}
                            />
                        </Routes>
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

describe('testing view of DeveloperEdit Component', () => {
    test('should render EditDeveloper and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveDeveloperButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const nameElement = screen.getByLabelText(/Name/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const deptElement = screen.getByLabelText(/Dept/i)
        const experienceElement = screen.getByLabelText(/Experience/i)
        const salaryElement = screen.getByLabelText(/Salary/i)
        const dobElement = screen.getByLabelText(/Dob/i)
        const fulltimeElement = screen.getByLabelText(/Fulltime/i)
        const phoneElement = screen.getByLabelText(/Phone/i)

        expect(saveDeveloperButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(ageElement).toBeInTheDocument()
        expect(deptElement).toBeInTheDocument()
        expect(experienceElement).toBeInTheDocument()
        expect(salaryElement).toBeInTheDocument()
        expect(dobElement).toBeInTheDocument()
        expect(fulltimeElement).toBeInTheDocument()
        expect(phoneElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Developer edit form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const deptElement = screen.getByLabelText(/Dept/i)
        const experienceElement = screen.getByLabelText(/Experience/i)
        const salaryElement = screen.getByLabelText(/Salary/i)
        const dobElement = screen.getByLabelText(/Dob/i)
        const fulltimeElement = screen.getByLabelText(/Fulltime/i)
        const phoneElement = screen.getByLabelText(/Phone/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(ageElement, { target: { value: 38 } })
        fireEvent.change(deptElement, { target: { value: 95.84 } })
        fireEvent.change(experienceElement, { target: { value: 38 } })
        fireEvent.change(salaryElement, { target: { value: 58 } })
        fireEvent.change(dobElement, { target: { value: 'dob' } })
        fireEvent.change(phoneElement, { target: { value: 44 } })

        expect(nameElement.value).toBe('name')

        expect(ageElement.value).toBe(38)
        expect(deptElement.value).toBe(95.84)
        expect(experienceElement.value).toBe(38)
        expect(salaryElement.value).toBe(58)
        expect(dobElement.value).toBe('dob')
        expect(phoneElement.value).toBe(44)

        fireEvent.mouseDown(fulltimeElement)
        const fulltimelistbox = within(screen.getByRole('listbox'))
        fireEvent.click(fulltimelistbox.getByText(/True/))
        expect(fulltimeElement).toHaveTextContent(/True/i)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const nameElement = screen.getByLabelText(/Name/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const deptElement = screen.getByLabelText(/Dept/i)
        const experienceElement = screen.getByLabelText(/Experience/i)
        const salaryElement = screen.getByLabelText(/Salary/i)
        const dobElement = screen.getByLabelText(/Dob/i)
        const phoneElement = screen.getByLabelText(/Phone/i)

        fireEvent.change(nameElement, { target: { value: '' } })
        fireEvent.change(ageElement, { target: { value: '' } })
        fireEvent.change(deptElement, { target: { value: '' } })
        fireEvent.change(experienceElement, { target: { value: '' } })
        fireEvent.change(salaryElement, { target: { value: '' } })
        fireEvent.change(dobElement, { target: { value: '' } })
        fireEvent.change(phoneElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveDeveloperButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveDeveloperButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(7)
    })
})
