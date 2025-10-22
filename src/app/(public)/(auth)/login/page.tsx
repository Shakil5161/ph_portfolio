import LoginForm from "@/components/modules/Auth/LoginForm";
import { Suspense } from "react";

function page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}

export default page;