import { Post, User, Comment } from "@/types";

const posts: Post[] = [
  {
    id: 1,
    title: "Começando com React",
    content:
      "React é uma poderosa biblioteca JavaScript para construir interfaces de usuário. Neste post, vamos explorar os fundamentos do React e como começar.",
    author: "João Silva",
    description:
      "Aprenda os fundamentos do React e como construir sua primeira aplicação com este guia completo.",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    published: true,
  },
  {
    id: 2,
    title: "Padrões Avançados de TypeScript",
    content:
      "TypeScript traz tipagem estática para JavaScript, tornando seu código mais robusto e sustentável. Neste guia avançado, exploramos padrões e técnicas poderosas.",
    author: "Maria Santos",
    description: "Explore padrões e técnicas avançadas de TypeScript.",
    createdAt: "2024-01-20T14:30:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
    published: true,
  },
  {
    id: 3,
    title: "Construindo Aplicações Web Responsivas",
    content:
      "Criar aplicações web responsivas é essencial no mundo multi-dispositivo de hoje.",
    author: "Carlos Oliveira",
    description: "Melhores práticas para aplicações responsivas.",
    createdAt: "2024-01-25T09:15:00Z",
    updatedAt: "2024-01-25T09:15:00Z",
    published: false,
  },
];

const comments: Comment[] = [
  {
    id: 1,
    postId: 1,
    author: "Alice",
    content: "amei!",
    createdAt: "2024-01-16T08:30:00Z",
  },
  {
    id: 2,
    postId: 1,
    author: "Lucas",
    content: "Top, gostei dos exemplos.",
    createdAt: "2024-01-16T15:45:00Z",
  },
  {
    id: 3,
    postId: 2,
    author: "Marcos",
    content: "Aí simmm!!!",
    createdAt: "2024-01-21T11:20:00Z",
  },
];

const admin: User = {
  id: 1,
  username: "admin",
  email: "admin@example.com",
  role: "admin",
};

export const db = {
  posts,
  comments,
  admin,
};

export function nextId(prefix: "post" | "comment"): number {
  if (prefix === "post") return db.posts.length + 1;
  return db.comments.length + 1;
}
