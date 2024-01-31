import Link from "next/link";

export default function NavBar() {

    return (
        //Just Mock up, feel free to edit
        <div className="menucontainer fixed px-9 top-0 left-0 right-0 h-20 bg-slate-400 z-30 flex justify-between">

            <div className="flex justify-start items-center z-30 flex-row h-full">
                <Link className="block px-4 py-2 p text-black hover:font-medium transition duration-00 ease-in-out" href="">
                    Link1
                </Link>
                <Link className="block px-4 py-2 p text-black hover:font-medium transition duration-00 ease-in-out" href="">
                    Link2
                </Link>
                <Link className="block px-4 py-2 p text-black hover:font-medium transition duration-00 ease-in-out" href="">
                    Link3
                </Link>
            </div>

        </div>
    );
}
