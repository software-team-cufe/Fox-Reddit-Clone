import { userStore } from "./UserStore";
import { Provider } from "react-redux";

export default function UserProvider({ children }) {
    return (
        <Provider store={userStore}>
            {children}
        </Provider>
    );
}