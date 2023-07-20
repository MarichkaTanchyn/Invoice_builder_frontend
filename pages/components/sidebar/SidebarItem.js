import 'bootstrap/dist/css/bootstrap.css';
import style from './sidebar.module.css';
import {useRouter} from "next/router";
import {setCookie} from "cookies-next";

const SidebarItem = (props) => {
    const router = useRouter();
    const handleRedirect = async(CategoryId) => {
        console.log(CategoryId);

        if (!props.subcategories || props.subcategories.length === 0) {
            setCookie('categoryId', props.id, {
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            })

            await router.push({
                pathname: '/products',
                query: props.name,
            })
        }
    }

    return (
        <li className={style.li}>
            <a className={style.a}
               onClick={() => handleRedirect(props.id)}><span>{props.name}</span></a>
            {props.subcategories && props.subcategories.length > 0 && (
                <ul className={`${style.subcategoryUl}`}>
                    {props.subcategories.map(subcategory => (
                        <SidebarItem
                            key={subcategory.id}
                            id={subcategory.id}
                            name={subcategory.name}
                            parentId={subcategory.parentId}
                            subcategories={subcategory.Subcategories}
                        />
                    ))}
                </ul>
            )}
        </li>
    )
}

export default SidebarItem;