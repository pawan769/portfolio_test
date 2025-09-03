'use client';
import ProjectForm from './ProjectForm';
import { z } from 'zod';
import { projectFormSchema } from '@/lib/schemas';
import { useProjects } from '@/lib/projects-context';
import useBoolean from '@/hooks/use-boolean';

interface AddProjectModalProps {
  onProjectAdded: () => void;
}

export default function AddProjectModal({
  onProjectAdded,
}: AddProjectModalProps) {
  const { addProject } = useProjects();
  const [isAdding, setIsAdding] = useBoolean(false);

  const handleSubmit = async (data: z.infer<typeof projectFormSchema>) => {
    setIsAdding();
    const newProject = await addProject(data);
    if (newProject) {
      onProjectAdded();
    }
    setIsAdding();
  };

  return (
    <ProjectForm onSubmit={handleSubmit} isLoading={isAdding} isEdit={false} /> //same form for edit and creation
  );
}