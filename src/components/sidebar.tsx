import {Tabs, TabsContent, TabsList, TabsTrigger} from "@ui/tabs";
import {Card} from "@ui/card.tsx";
import Settings from "@components/settings.tsx";


const Sidebar = () => {
    return (


        <Tabs defaultValue="settings"
              className="w-[350px] w-min-[250px] flex flex-col flex-shrink-0">
            <TabsList className={"grid w-full  grid-cols-3 "}>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="blocks">Blocks</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabContent value="code"></TabContent>
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
            <Card className="p-6 h-full">
                {children}
            </Card>
        </TabsContent>
    )
}
export default Sidebar