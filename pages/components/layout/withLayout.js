import React from 'react';
import Layout from './Layout';

const withLayout = (WrappedComponent) => {
    return (props) => (
        <Layout>
            <WrappedComponent {...props} />
        </Layout>
    );
};

export default withLayout;