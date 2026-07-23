"use client";

import { use } from "react";
import ProjectForm from "../../_components/ProjectForm";

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <ProjectForm projectId={id} />;
}
