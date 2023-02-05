import 'bootstrap/dist/css/bootstrap.css';
import style from './sidebar.module.css';

const SidebarItem = (props) => {

    return (
        <li className={style.li}>
            <a className={style.a}>{props.name}</a>
        </li>
    )
}

export default SidebarItem;