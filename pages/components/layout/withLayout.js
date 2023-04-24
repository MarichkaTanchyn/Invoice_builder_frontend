import React from 'react';
import Layout from './layout';

const withLayout = (WrappedComponent) => {
    return (props) => (
        <Layout>
            <WrappedComponent {...props} />
        </Layout>
    );
};

export default withLayout;