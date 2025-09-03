import { Project } from "@/types/project";
import Image from "next/image";
import Tag from "./Tag";

interface ProjectCardProps {
  project: Project;
  onViewDetail: (project: Project) => void;
}

const ProjectCard = ({ project, onViewDetail }: ProjectCardProps) => {
  return (
    <div className="bg-[#282727] relative rounded-lg overflow-hidden p-4 shadow-lg h-96 hover:scale-105 transition border border-gray-500/50">
      <Image
        src={
          project.coverUrl && project.coverUrl !== ""
            ? project.coverUrl
            : "/demo_project.jpg"
        }
        alt={project.title || "Project Image"}
        width={500}
        height={500}
        className="absolute inset-0 object-cover h-full w-full z-10 opacity-50"
      />
      <div className="absolute bottom-0 left-0 w-full z-20 p-3 opacity-80">
        <div className="flex flex-col gap-0">
          <Tag tag={project.tag} />
          <h3 className="text-lg font-semibold text-nowrap">{project.title}</h3>
          <button
            onClick={() => onViewDetail(project)}
            className="text-sm hover:underline text-left"
          >
            view detail →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
