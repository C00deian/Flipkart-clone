"use client";

import React, { useContext } from "react";
import Container from "@/app/components/Container";
import { AuthContext } from "@/app/context/AuthContext";
import NullData from "@/app/components/NullData";
import { FormWrap } from "@/app/components/FormWrap";
import { AddProductForm } from "./AddProductForm";

const AddProducts = () => {
  const auth = useContext(AuthContext);

  if (!auth || auth.isLoading) {
    return <NullData title="Loading..." />;
  }

  const { currentUser } = auth;

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access Denied" />;
  }

  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddProducts;
