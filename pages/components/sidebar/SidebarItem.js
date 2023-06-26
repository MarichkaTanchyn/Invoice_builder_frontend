import 'bootstrap/dist/css/bootstrap.css';
import style from './sidebar.module.css';
import {useRouter} from "next/router";
import {setCookie} from "cookies-next";
import {getCategoryProducts} from "../../api/categoriesApi";
import {isCategoryEmpty} from "../../api/productsApi";

const SidebarItem = (props) => {
    const router = useRouter();
    const handleRedirect = async( CategoryId ) => {
        console.log(CategoryId);

        // cId -> categoryId
        setCookie('cId', props.id, {
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        })

        const isEmpty = await isCategoryEmpty(CategoryId);
        if (isEmpty) {
            await router.push({
                pathname: '/categoryIsEmpty'
            })
        } else {
            await router.push({
                pathname: '/products',
            })
        }
    }

    return (
        <li className={style.li}>
            <a className={style.a}
               onClick={() => handleRedirect(props.id)}><span className={props.parentId ? style.subCategory : ''}>{props.name}</span></a>
        </li>
    )
}

export default SidebarItem;