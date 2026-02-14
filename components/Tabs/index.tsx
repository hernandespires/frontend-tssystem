import { SetStateAction } from "react"

const Tabs = ({ children, actualTab, setActualTab }: { children: string[], actualTab: string, setActualTab: (value: SetStateAction<string>) => void }) => (
    <div className="w-88">
        { children.map((tab) => (
            <button key={tab} className={`block p-3 border-l-4 hover:bg-[#00000080] w-full cursor-pointer ${tab === actualTab && `border-[#FFA300] bg-[#00000080]`}`} onClick={() => setActualTab(tab)}>
                {tab}
            </button>
        )) }
    </div>
)

export default Tabs