"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Project } from "@/types/project";
import useBoolean from "@/hooks/use-boolean";
import axios from "axios";


interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (
    project: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => Promise<Project | undefined>;
  updateProject: (
    id: string,
    project: Partial<Project>
  ) => Promise<Project | undefined>;
  deleteProject: (id: string) => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);


//custom hook to access product context
export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};

export const ProjectsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useBoolean(true);
  const [error, setError] = useState<string | null>(null);

  //to fetch all projects
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/projects");
      setProjects(response.data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  //to add a project
  const addProject = async (
    project: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const response = await axios.post("/api/projects", project);
      const newProject = response.data;
      setProjects((prevProjects) => [...prevProjects, newProject]);
      return newProject;
    } catch (e: any) {
      setError(e.message);
      return undefined;
    }
  };


  //to update a project
  const updateProject = async (id: string, project: Partial<Project>) => {
    try {
      const response = await axios.put(`/api/projects/${id}`, project);
      const updatedProject = response.data;
      setProjects((prevProjects) =>
        prevProjects.map((p) => (p.id === id ? updatedProject : p))
      );
      return updatedProject;
    } catch (e: any) {
      setError(e.message);
      return undefined;
    }
  };

  //to delete a project
  const deleteProject = async (id: string) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects((prevProjects) => prevProjects.filter((p) => p.id !== id));
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const contextValue = {
    projects,
    loading,
    error,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
  };
 //project context provide used in root layout
  return (
    <ProjectsContext.Provider value={contextValue}>  
      {children}
    </ProjectsContext.Provider>
  );
};
