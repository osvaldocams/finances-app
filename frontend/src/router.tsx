import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import DashboardView from "./views/DashboardView"
import CreateMovementView from "./views/moneyFlux/CreateMovementView"
import MovementView from "./views/moneyFlux/MovementView"


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route path="/movements" element={<MovementView/>} />
                    <Route path="/movements/create" element={<CreateMovementView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
