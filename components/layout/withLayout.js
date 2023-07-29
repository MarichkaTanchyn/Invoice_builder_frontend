import React from 'react';
import Layout from './layout';

const withLayout = (WrappedComponent) => {
    const WithLayout = (props) => (
        <Layout>
            <WrappedComponent {...props} />
        </Layout>
    );

    WithLayout.displayName = `WithLayout(${getDisplayName(WrappedComponent)})`;

    return WithLayout;
};

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withLayout;
