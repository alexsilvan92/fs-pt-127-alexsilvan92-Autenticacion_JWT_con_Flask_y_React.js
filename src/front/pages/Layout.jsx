import { useEffect } from "react"
import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { getMeService } from "../services/authService"

export const Layout = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        if (!store.token) return;

        getMeService(store.token).then(([data, error]) => {
            if (error) {
                dispatch({ type: "logout" });
                return;
            }
            dispatch({ type: "set_user", payload: data });
        });
    }, []);

    return (
        <ScrollToTop>
            <Navbar />
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}