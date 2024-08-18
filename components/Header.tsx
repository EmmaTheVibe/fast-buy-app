import Link from "next/link";

export default function Header({ font }: { font?: string }) {
  return (
    <header className="py-2 bg-gray-951 fixed z-10 w-[100%]">
      <div className="max-w-[100rem] px-12 mx-auto flex justify-between">
        <Link href="/">
          <h1 className={` text-yellow-500 text-center py-2`}>fastBuy</h1>
        </Link>
        <Link
          href="/products/upload"
          className="uppercase text-green-951 text-xl py-2 hover:text-yellow-700"
        >
          Upload {">"}
        </Link>
      </div>
    </header>
  );
}
