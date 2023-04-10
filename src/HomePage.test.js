import userEvent from "@testing-library/user-event"
import { screen ,render } from "@testing-library/react"
import Homepage from "./Component/Pages/Homepage"

describe('Home Page Group Testing',()=>{
    test('toggle is Clicked or not',()=>{
        render(<Homepage/>)
        let toggleButton = screen.getByRole('h4')
        userEvent.click(toggleButton)
        const output = screen.getByText('Edit your Profile',{exact:false})
        expect(output).toBeInTheDocument();
    })
})