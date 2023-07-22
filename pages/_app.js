import '/styles/globals.css'
import {CookiesProvider} from 'react-cookie';
import {SSRProvider} from '@react-aria/ssr';

function MyApp({Component, pageProps}) {
    return (
        <SSRProvider>
            <CookiesProvider>
                <Component {...pageProps} />
            </CookiesProvider>
        </SSRProvider>
    )
}

export default MyApp