import Navbar from "./component/navbar/navbar";

import Footer from "./component/footer/footer";

import AppRoutes from "./routes/approutes";


function App() {
    return (
        <>
            <Navbar />
            <AppRoutes />
            <Footer />
        </>
    );
}
export default App;