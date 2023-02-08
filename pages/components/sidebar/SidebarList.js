import SidebarItem from "./SidebarItem";
import style from './sidebar.module.css';


const SidebarList = (props) => {
    return (
        <ul className={`${style.ul} ${style.dropdownContent}`}>
            {props.categories.map((categoryList) => (
                categoryList.categories.map(category => (
                <SidebarItem
                    key={category.id}
                    id={category.id}
                    name={category.name}/>
                ))))}
        </ul>
    )
}

export default SidebarList;