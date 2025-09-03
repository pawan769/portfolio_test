import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Project } from "@/types/project";
import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react";

export const ProjectActionsDropdown = ({
  project,
  handleEdit,
  handleDeleteClick,
}: {
  project: Project;
  handleEdit: (project: Project) => void;
  handleDeleteClick: (id: string) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="hover:bg-[#2a2a2a] hover:text-white focus-visible:ring-transparent"
      >
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleEdit(project)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDeleteClick(project.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
