import Sidebar from "./components/Sidebar";
import style from './components/sidebar.module.css'

function HomePage() {
    return (
        <div className={style.layout}>
            <Sidebar/>
        </div>
    )
}

export default HomePage;