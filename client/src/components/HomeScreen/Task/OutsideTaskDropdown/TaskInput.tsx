import { Input } from "@/components/ui/input";
import { useState } from "react";

const TaskInput = ((props: { title: any; handleSetProperties: (arg0: string, arg1: any, arg2: any) => any; properties: any; handleUpdateProperties: (arg0: any) => void; }) => {

    const [title, setTitle] = useState(props.title);

    const handleTitleChange = (e: any) => {
        const updatedTitle = e.target.value;
        setTitle(updatedTitle);
      };

  return (
    <>
    <Input
        className="min-w-[24rem]"
        value={title}
        onChange={handleTitleChange}
        onBlur={() => {
          const updatedProperties = props.handleSetProperties("title", title, props.properties);
          props.handleUpdateProperties(updatedProperties);
        }}
      />
      </>
  )
})
export default TaskInput
