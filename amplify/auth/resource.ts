import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
    loginWith: {
        email: {
            verificationEmailStyle: "CODE",
            verificationEmailSubject: "Welcome to the Travel Destination App",
            verificationEmailBody: (createCode) => `Use this code to verify your email: ${createCode()}`,
        },
    },
});
