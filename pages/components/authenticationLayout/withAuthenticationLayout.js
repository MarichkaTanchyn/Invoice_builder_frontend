import AuthenticationLayout from "./authenticationLayout";

const withAuthenticationLayout = (WrappedComponent) => {
    return (props) => {
        return (
            <AuthenticationLayout>
                <WrappedComponent {...props} />
            </AuthenticationLayout>
        )
    }
}

export default withAuthenticationLayout;