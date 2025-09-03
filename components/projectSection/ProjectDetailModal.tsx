import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { LinkIcon, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/project";
import Tag from "./Tag";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  if (!project) {
    return null;
  }
  const { coverUrl, title, tag, description, liveUrl, repoUrl } = project;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#282727] border-none text-white p-1">
        <div className="bg-[#282727] relative rounded-lg overflow-hidden ">
          <div className="relative w-full h-64 pointer-events-none">
            <Image
              src={coverUrl && coverUrl !== "" ? coverUrl : "/demo_project.jpg"} //use placeholder image if coverUrl is not present
              alt={title || "Project Image"}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 object-cover h-full w-full z-10 opacity-50"
            />
          </div>

          <div className="relative z-20 p-4 flex flex-col gap-4">
            <DialogHeader className="p-0">
              <DialogTitle className="text-3xl font-bold">{title}</DialogTitle>
            </DialogHeader>

            <Tag tag={tag} />

            <p className="text-gray-300 text-lg leading-relaxed">
              {description}
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              {liveUrl ? (
                <Link
                  href={liveUrl}
                  target="_blank"
                  className="text-blue-400 hover:underline flex items-center gap-2 text-lg"
                >
                  <LinkIcon className="h-5 w-5 text-white" /> Live Demo
                </Link>
              ) : null}
              {repoUrl ? (
                <Link
                  href={repoUrl}
                  target="_blank"
                  className="text-blue-400 hover:underline flex items-center gap-2 text-lg"
                >
                  <Github className="h-5 w-5 text-white" /> GitHub Repo
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
