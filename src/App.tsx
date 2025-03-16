import { RouterProvider } from "react-router-dom"
import routes from "./routes/routes"
import { I18nextProvider, useTranslation } from "react-i18next"
import Language from "./utils/i18n"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"

function App() {
  const { i18n } = useTranslation()
  const current = i18n.language
  useEffect(() => {
    document.body.dir = current === "ar" ? "rtl" : "ltr"
  }, [current])
  console.log(current)
  return (
    <>
      <I18nextProvider i18n={Language}>
        <ToastContainer limit={1} hideProgressBar={true} autoClose={1500} position="top-center" />
        <RouterProvider router={routes} />
      </I18nextProvider>
    </>
  )
}

export default App
