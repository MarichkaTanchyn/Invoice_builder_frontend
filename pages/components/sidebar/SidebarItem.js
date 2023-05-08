import 'bootstrap/dist/css/bootstrap.css';
import style from './sidebar.module.css';
import {useRouter} from "next/router";
import {getCategoryProducts} from "../../api/categoriesApi";

const SidebarItem = (props) => {
    const router = useRouter();
    const handleRedirect = async( CategoryId ) => {
        console.log(CategoryId);
        // let products = await getCategoryProducts(CategoryId);
        // if (products.length > 0) {
        //     // router.push({
        //     //     pathname: '/products',
        //     //     query: { CategoryId: CategoryId }
        //     // })
        // } else {
            await router.push({
                pathname: '/categoryIsEmpty'
                // query: {CategoryId: CategoryId}
            })
        // }
        // await router.push(link);
    }
    return (
        <li className={style.li}>
            <a className={style.a} onClick={() => handleRedirect(props.id)}><span>{props.name}</span></a>
        </li>
    )
}

export default SidebarItem;