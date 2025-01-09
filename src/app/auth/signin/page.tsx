"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { Loader2 } from "lucide-react";

export default function Singin() {
  const [meta, setMeta] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSingin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("CLICK HANDL SIGNIN");
      const res = await signIn("credentials", {
        email: meta.email,
        password: meta.password,
        redirect: false,
      });

      console.log("RES", res);

      if (res?.ok) {
        router.push("/");
      } else {
        alert("Singin failed");
      }
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      setLoading(false);
    }
  };
  const handlerMetaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setMeta((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form
        className="w-[50%] self-center flex flex-col gap-4"
        onSubmit={handleSingin}
      >
        <Input placeholder="Email" onChange={handlerMetaChange} name="email" />
        <Input
          placeholder="Password"
          type="password"
          onChange={handlerMetaChange}
          className="my-4"
          name="password"
        />

        {loading ? (
          <Button disabled>
            <Loader2 className="animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit"> Signin</Button>
        )}

        <div className="flex gap-4 mt-4">
          <Button>Login with GitHub</Button>
          <Button>Login with Google</Button>
        </div>
      </form>
    </div>
  );
}
