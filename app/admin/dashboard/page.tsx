"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { redirect } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { LinkIcon, Github, Loader2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/lib/projects-context";
import { Project } from "@/types/project";
import axios from "axios";
import AddProjectModal from "@/components/adminSection/AddProjectModal";
import EditProjectModal from "@/components/adminSection/EditProjectModal";
import { LogoutDialog } from "@/components/adminSection/dialogs/LogoutDialog";
import { DeleteProjectDialog } from "@/components/adminSection/dialogs/DeleteProjectDialog";
import { ProjectActionsDropdown } from "@/components/adminSection/ProjectActionsDropdown";
import useBoolean from "@/hooks/use-boolean";

export default function AdminDashboard() {
  const { projects, loading, deleteProject } = useProjects(); // form poject-context
  const [isAddModalOpen, setIsAddModalOpen] = useBoolean(false);//use of useBoolean hook, we dont have to set state manually
  const [isEditModalOpen, setIsEditModalOpen] = useBoolean(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [projectToDeleteId, setProjectToDeleteId] = useState<string | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useBoolean(false);

  const handleDelete = async () => {
    if (projectToDeleteId) {
      await deleteProject(projectToDeleteId); // Use deleteProject from context
      setIsDeleteDialogOpen();
      setProjectToDeleteId(null);
    }
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsEditModalOpen();
  };

  const handleDeleteClick = (id: string) => {
    setProjectToDeleteId(id);
    setIsDeleteDialogOpen();
  };

  const handleLogout = async () => {
    await axios.get("/api/auth");
    redirect("/admin");
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8 text-white">
        <Loader2 className="animate-spin size-20" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="bg-[#1e1e1e] border-none">
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
          </DialogHeader>
          <AddProjectModal
            onProjectAdded={() => {
              setIsAddModalOpen();
            }}
          />
        </DialogContent>
      </Dialog>

      {selectedProject && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="bg-[#1e1e1e] border-none">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
            </DialogHeader>
            <EditProjectModal
              project={selectedProject}
              onProjectUpdated={() => {
                setIsEditModalOpen();
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <LogoutDialog handleLogout={handleLogout} />
      </div>
      <div className="bg-[#2a2a2a] rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          <Button
            onClick={() => setIsAddModalOpen()}
            variant="secondary"
            className="cursor-pointer"
          >
            Add Project
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length != 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className="bg-[#1e1e1e] rounded-lg p-4 flex flex-col justify-between relative"
              >
                <div className="absolute top-2 right-2">
                  <ProjectActionsDropdown
                    project={project}
                    handleEdit={handleEdit}
                    handleDeleteClick={handleDeleteClick}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 overflow-hidden max-w-[85%]">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    {project.description}
                  </p>
                  {project.tag && (
                    <Badge variant="secondary" className="mb-2 rounded-lg">
                      {project.tag}
                    </Badge>
                  )}
                  {project.coverUrl && (
                    <Link
                      href={project.coverUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-sm mb-2 block"
                    >
                      View Cover
                    </Link>
                  )}
                  <div className="flex flex-col flex-wrap gap-2 mt-2">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline text-sm flex items-center gap-1"
                      >
                        <LinkIcon className="h-4 w-4 text-white" /> Live Demo
                      </Link>
                    )}
                    {project.repoUrl && (
                      <Link
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline text-sm flex items-center gap-1"
                      >
                        <Github className="h-4 w-4 text-white" /> GitHub Repo
                      </Link>
                    )}
                  </div>
                </div>
                <DeleteProjectDialog
                  open={isDeleteDialogOpen && projectToDeleteId === project.id}
                  onOpenChange={setIsDeleteDialogOpen}
                  handleDelete={handleDelete}
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center">
              No projects found. Please add a project
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
