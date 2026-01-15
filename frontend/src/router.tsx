import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import DashboardView from "./views/DashboardView"
import CreateMovementView from "./views/movements/CreateMovementView"
import MovementView from "./views/movements/MovementView"
import MovementDetailView from "./views/movements/MovementDetailView"


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route path="/movements" element={<MovementView/>} />
                    <Route path="/movements/create" element={<CreateMovementView />} />
                    <Route path="/movements/:movementId" element={<MovementDetailView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
