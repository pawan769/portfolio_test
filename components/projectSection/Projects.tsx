"use client";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { useProjects } from "@/lib/projects-context";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import ProjectDetailModal from "./ProjectDetailModal";
import { Project } from "@/types/project";
import ProjectSectionLogo from "./ProjectSectionLogo";
import useBoolean from "@/hooks/use-boolean";
import SlideFromLeft from "@/animations/SlideFromLeft";
import SuggestionCard from "./SuggestionCard";

export default function Projects() {
  const { projects, loading, error } = useProjects();
  const [isDetailModalOpen, setIsDetailModalOpen] = useBoolean(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleViewDetail = (project: Project) => {
    setSelectedProject(project);
    setIsDetailModalOpen();
  };

  if (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <section className="container-max text-white mb-6 md:mb-12 ">
      <div className="mx-auto ">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <ProjectSectionLogo />
          </div>
          <Link
            href="#portfolio"
            className="text-lg font-medium hover:underline flex items-center gap-2"
          >
            See the Portfolio →
          </Link>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="h-93 w-full flex justify-center items-center p-8 text-white">
            <Loader2 className="animate-spin size-20" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project: Project) => (
              <SlideFromLeft key={project.id}>
                <ProjectCard
                  project={project}
                  onViewDetail={handleViewDetail}
                />
              </SlideFromLeft>
            ))}

            <SuggestionCard />
          </div>
        )}
      </div>
      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen()}
      />
    </section>
  );
}
