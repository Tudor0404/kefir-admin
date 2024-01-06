import Link from "next/link";
import { TbChevronRight } from "react-icons/tb";

export default function Login() {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="w-full grid grid-cols-3 gap-2">
        <div className="flex justify-start">
          <div className="border-0 border-b-2 border-primary">Login</div>
        </div>

        <div className="flex justify-center">
          <div className="button flex flex-row justify-center items-center border-b-2 border-transparent hover:border-secondary hover:border-b-2 transition-all">
            <Link href={"/"}>Home </Link>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="button flex flex-row justify-center items-center border-b-2 border-transparent hover:border-secondary hover:border-b-2 transition-all">
            <Link href={"/signup"}>Signup </Link> <TbChevronRight />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-neutral text-lg">Email</label>
        <input className=""></input>
      </div>

      <div className="flex flex-col">
        <label className="text-neutral text-lg">Password</label>
        <input className=""></input>
      </div>

      <div className="mt-2">
        <button className="btn-success"> Login</button>
      </div>
    </div>
  );
}
