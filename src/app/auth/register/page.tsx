"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const [meta, setMeta] = useState({ email: "", password: "", fullName: "" });
  const router = useRouter();
  const onChangeMeta = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setMeta((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      console.log("META", meta);

      const response = await axios.post("/api/auth/register", meta);
      if (response.status === 200) {
        router.push("/auth/signin");
      } else {
        throw new Error("Unexpected Error " + response.status);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form
        className="w-[50%] self-center flex flex-col gap-4"
        onSubmit={handleRegister}
      >
        <Input
          placeholder="Full Name"
          name="fullName"
          onChange={onChangeMeta}
          value={meta.fullName}
        />
        <Input
          placeholder="Email"
          name="email"
          onChange={onChangeMeta}
          value={meta.email}
        />
        <Input
          placeholder="Password"
          name="password"
          type="password"
          onChange={onChangeMeta}
          value={meta.password}
        />
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
