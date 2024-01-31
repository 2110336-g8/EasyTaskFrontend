import NavBar from "@/components/navbar/navBar"
import "../globals.css"

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <div>
            <NavBar />
            <div className='mt-28 mx-auto bg-white lg:w-[700px] xl:w-[800px] 2xl:w-[1000px]'>
                {children}
            </div>
        </div>
    )
}
