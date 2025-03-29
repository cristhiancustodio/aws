import AWS from "./pages/aws/SubiendoArchivos"
import Billetera from "./pages/Billetera"
import { BilleteraProvider } from "./pages/Billetera/Context/BilleteraProvider"
import Ventas from "./pages/Ventas"
import GeneradorArchivos from "./routes/GeneradorArchivos"
import Login from "./routes/Login"


function App() {
	// return <GeneradorArchivos></GeneradorArchivos>
	// return <Ventas></Ventas>
	/*return (
		<BilleteraProvider>
			<Billetera></Billetera>
		</BilleteraProvider>
	)*/
	return (
		<AWS></AWS>
	)
}
export default App
