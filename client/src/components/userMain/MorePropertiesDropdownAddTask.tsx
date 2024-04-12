
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Calendar } from '../ui/calendar'
import { useState } from 'react'
import SetDueDateInDropdown from './taskProperties/SetDueDateInDropdown'

type AddOrUpdatePropertyFunction = (key: string, value: any) => void;

const MorePropertiesDropdownAddTask = (props: {addOrUpdateProperty: AddOrUpdatePropertyFunction}) => {
    const [date, setDate] = useState<Date>();
    const [open, setOpen] = useState<boolean>(false);
    
  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-[1px] h-[40px]"
              >
                <DotsHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>More Properties</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {/*set due date... */}
                <SetDueDateInDropdown addOrUpdateProperty={props.addOrUpdateProperty}/>


                
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
    </div>
  )
}

export default MorePropertiesDropdownAddTask
