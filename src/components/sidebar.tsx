import {Tabs, TabsContent, TabsList, TabsTrigger} from "@ui/tabs";
import Settings from "@components/settings.tsx";
import Code from "@components/code";


const Sidebar = () => {
    return (


        <Tabs defaultValue="code"
              className="w-[350px] w-min-[250px] flex flex-col flex-shrink-0">
            <TabsList className={"grid w-full  grid-cols-3 "}>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="blocks">Blocks</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabContent value="code"><Code/></TabContent>
            <TabContent value="blocks">Change your password here.</TabContent>
            <TabContent value="settings"><Settings/></TabContent>
        </Tabs>
    )
}

interface TabContentProps {
    children?: React.ReactNode
    value: string
}

const TabContent = ({children, value}: TabContentProps) => {
    return (
        <TabsContent value={value}
                     className="flex-grow">

            {children}

        </TabsContent>
    )
}
export default Sidebar