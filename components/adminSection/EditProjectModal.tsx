'use client';

import ProjectForm from './ProjectForm';
import { z } from 'zod';
import { projectFormSchema } from '@/lib/schemas';
import { useProjects } from '@/lib/projects-context';
import { Project } from '@/types/project';
import useBoolean from '@/hooks/use-boolean';

interface EditProjectModalProps {
  project: Project;
  onProjectUpdated: () => void;
}

export default function EditProjectModal({
  project,
  onProjectUpdated,
}: EditProjectModalProps) {
  const { updateProject } = useProjects();
  const [isUpdating, setIsUpdating] = useBoolean(false);

  const handleSubmit = async (data: z.infer<typeof projectFormSchema>) => {
    setIsUpdating();
    const updatedProject = await updateProject(project.id, data);
    if (updatedProject) {
      onProjectUpdated();
    }
    setIsUpdating();
  };

  return (
    <ProjectForm         //same  form for edit and create
      initialData={project}
      onSubmit={handleSubmit}
      isLoading={isUpdating}
      isEdit={true}
    />
  );
}