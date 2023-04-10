import { render , screen } from "@testing-library/react"
import Expence from "./Component/Pages/Expence"

test('For Expence tesing',()=>{
    render(<Expence/>)

    const letFindWord = screen.getByText('Food',{exact:false})
    expect(letFindWord).toBeInTheDocument()
})