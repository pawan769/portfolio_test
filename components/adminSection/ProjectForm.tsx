"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { ProjectTag } from "@/constants/tags";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectFormSchema } from "@/lib/schemas";

interface ProjectFormProps {
  initialData?: z.infer<typeof projectFormSchema>;
  onSubmit: (data: z.infer<typeof projectFormSchema>) => void;
  isLoading: boolean;
  isEdit: boolean;
}

export default function ProjectForm({
  initialData,
  onSubmit,
  isLoading,
  isEdit,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    trigger,
  } = useForm<z.infer<typeof projectFormSchema>>({ //use of react hook form with zod
    resolver: zodResolver(projectFormSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      coverUrl: "",
      liveUrl: "",
      repoUrl: "",
      tag: ProjectTag.WEBSITE,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);  //set data in edit mode
    }
  }, [initialData, reset]);

  const onSubmitForm = (data: z.infer<typeof projectFormSchema>) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Title</label>
        <Input
          type="text"
          {...register("title")}
          className="mt-1 w-full bg-[#1e1e1e] border-gray-600 text-white"
        />
        {errors.title ? (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        ) : null}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Tag</label>
        <Select
          onValueChange={(value) => {
            setValue("tag", value as ProjectTag);
            trigger("tag");
          }}
          defaultValue={initialData?.tag || ProjectTag.WEBSITE}
        >
          <SelectTrigger className="w-full bg-[#1e1e1e] border-gray-600 text-white">
            <SelectValue placeholder="Select a tag" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(ProjectTag).map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.tag ? (
          <p className="text-red-500 text-sm mt-1">{errors.tag.message}</p>
        ) : null}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">
          Description
        </label>
        <Textarea
          {...register("description")}
          className="mt-1 max-h-40 w-full bg-[#1e1e1e] border-gray-600 text-white"
        />
        {errors.description ? (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        ) : null}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">
          Cover URL
        </label>
        <Input
          type="text"
          {...register("coverUrl")}
          className="mt-1 w-full bg-[#1e1e1e] border-gray-600 text-white"
        />
        {errors.coverUrl ? (
          <p className="text-red-500 text-sm mt-1">{errors.coverUrl.message}</p>
        ) : null}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">
          Live URL
        </label>
        <Input
          type="text"
          {...register("liveUrl")}
          className="mt-1 w-full bg-[#1e1e1e] border-gray-600 text-white"
        />
        {errors.liveUrl ? (
          <p className="text-red-500 text-sm mt-1">{errors.liveUrl.message}</p>
        ) : null}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">
          Github URL
        </label>
        <Input
          type="text"
          {...register("repoUrl")}
          className="mt-1 w-full bg-[#1e1e1e] border-gray-600 text-white"
        />
        {errors.repoUrl ? (
          <p className="text-red-500 text-sm mt-1">{errors.repoUrl.message}</p>
        ) : null}
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit" variant="secondary" disabled={isLoading}>
          {isLoading
            ? isEdit
              ? "Updating..."
              : "Adding..."
            : isEdit
            ? "Update Project"
            : "Add Project"}
        </Button>
      </div>
    </form>
  );
}
