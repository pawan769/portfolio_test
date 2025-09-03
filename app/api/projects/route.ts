import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

// get all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// create a new project
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, tag, description, coverUrl, liveUrl, repoUrl } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }
    const project = await prisma.project.create({
      data: {
        title,
        description,
        coverUrl,
        liveUrl,
        repoUrl,
        tag,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
