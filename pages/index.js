import Sidebar from "./components/Sidebar";
import Side from "./components/side";
import style from './components/sidebar.module.css'

function HomePage() {
    return (
        // <div className="d-flex" style={{ height: "100vh" }}>
        //     <Sidebar/>
        // </div>
        <div className={style.layout}>
            <Sidebar/>
        </div>
    )
}

export default HomePage;