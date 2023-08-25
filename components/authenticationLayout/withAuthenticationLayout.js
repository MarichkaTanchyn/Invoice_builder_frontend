import AuthenticationLayout from "./authenticationLayout";

const withAuthenticationLayout = (WrappedComponent) => {
    const WithAuthenticationLayout = (props) => {
        return (<AuthenticationLayout>
                <WrappedComponent {...props} />
            </AuthenticationLayout>)
    }

    WithAuthenticationLayout.displayName = `WithAuthenticationLayout(${getDisplayName(WrappedComponent)})`;

    return WithAuthenticationLayout;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuthenticationLayout;
