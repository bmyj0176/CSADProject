import { fetchSignInMethodsForEmail } from "firebase/auth";

router.post('/register', async () => {
    try {
            const methods = await fetchSignInMethodsForEmail(auth, "test@example.com");
            console.log("Available sign-in methods:", methods);
        } catch (error) {
            console.error("Firebase Auth error:", error);
        }
    }
)
