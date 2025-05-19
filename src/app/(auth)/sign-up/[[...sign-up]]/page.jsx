import React from "react";
import { SignUp } from "@clerk/nextjs";
import AuthLayout from "../../AuthLayout";

const SignUpPage = () => {
  return (
    <AuthLayout>
      <SignUp />;
    </AuthLayout>
  );
};

export default SignUpPage;
