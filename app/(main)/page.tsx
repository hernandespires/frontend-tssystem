import { redirect } from "next/navigation"

const Home = async () => {    
    redirect("/comercial")

    // return <main className="px-4 py-7 flex flex-col min-h-screen">test</main>
}

export default Home