const Tabs = ({ children }: { children: string[] }) => <div>{ children.map((tab) => <span key={tab} className="">{tab}</span>) }</div>

export default Tabs