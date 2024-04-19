import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react";

const IsCompletedCheckBox = (props: any) => {
    const [isCompleted, setIsCompleted] = useState(
        props.isCompleted
      );

    const handleIsCompletedChange = (checked: boolean) => {
        const updatedIsCompleted = checked ? true : false;
        setIsCompleted(updatedIsCompleted);
        const updatedProperties = props.handleSetProperties(
          "isCompleted",
          updatedIsCompleted,
          props.properties
        );
        props.handleUpdateProperties(updatedProperties);
      };

    
  return (
    <div>
       <Checkbox
          className=" h-5 w-5 "
          checked={isCompleted}
          onCheckedChange={handleIsCompletedChange}
        />
    </div>
  )
}

export default IsCompletedCheckBox
