
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import DeleteTaskInDropdown from './TaskProperties/DeleteTaskInDropdown'

const MorePropertiesDropdown = (props: {task: any}) => {
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
                
                {/*Delete */}
                <DeleteTaskInDropdown taskId={props.task._id} />


                
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
    </div>
  )
}

export default MorePropertiesDropdown
