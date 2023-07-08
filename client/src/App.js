import { GoogleOAuthProvider } from "@react-oauth/google";

// components
import Messenger from "./components/Messenger";
import AccountProvider from "./context/AccountProvider";

function App() {
  const clientId =
    "830063748451-curro6rc4d88g3a3e2h4pnj6m1hf77db.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <Messenger />
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
