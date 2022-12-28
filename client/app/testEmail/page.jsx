"use client";
import React from "react";

const TestEmail = () => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target);
        }}
      >
        <label htmlFor="name">Name</label>
        <input type="text" name="name" />
        <label htmlFor="email">email</label>
        <input type="email" name="useremail" />
        <label htmlFor="message">address</label>
        <textarea rows={4} type="text" name="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default TestEmail;
