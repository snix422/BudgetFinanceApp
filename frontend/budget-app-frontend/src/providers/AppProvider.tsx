import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "../lib/queryClient"
import { RouterProvider } from "react-router-dom"
import { router } from "../routes/routes"

const AppProvider = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}

export default AppProvider