import Link from "next/link";
import Image from "next/image";
export default function Headers(){
    return(
        <div className="flex justify-between bg-gray-800">
            <div className="">
                <Image
                src='/assets/logo.png'
                height={40}
                width={50}
                alt="image not found"
                className="rounded-4xl m-2"
                />
            </div>
            <ul className="flex m-4 gap-4 text-xl">
                {/* <li>
                <Link href="/all-task">All tasks</Link>
                </li> */}
                <li>
                 <button type="button">Logout</button>
                </li>
            </ul>
        </div>
    )
}