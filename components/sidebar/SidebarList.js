import SidebarItem from "./SidebarItem";
import style from './sidebar.module.css';


const SidebarList = ({categories}) => {
    return (
        <ul className={`${style.ul} ${style.dropdownContent}`}>
            {categories.map((category) => (
                <SidebarItem
                    key={category.id}
                    id={category.id}
                    name={category.name}
                    parentId={category.parentId}
                    subcategories={category.Subcategories}
                />
            ))}
        </ul>
    )
}

export default SidebarList;