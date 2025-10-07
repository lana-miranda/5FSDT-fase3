"use client";

import React, { useState } from "react";
import { usePosts } from "@/contexts/PostsContext";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Post } from "@/types";

export default function AdminPage() {
  const { posts, isLoading, error, deletePost } = usePosts();
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (postId: number) => {
    if (
      !confirm(
        "Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita."
      )
    ) {
      return;
    }

    setDeletingId(postId);
    try {
      const success = await deletePost(postId);
      if (success) {
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (post: Post) => {
    router.push(`/edit/${post.id}`);
  };

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingSpinner size="lg" text="Carregando posts..." />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "var(--danger)", marginBottom: "1rem" }}>
            Erro ao Carregar Posts
          </h2>
          <p style={{ color: "var(--text-muted)" }}>{error}</p>
        </div>
      </div>
    );
  }

  const publishedPosts = posts.filter((post) => post.published);
  const draftPosts = posts.filter((post) => !post.published);

  return (
    <ProtectedRoute requireAdmin>
      <>
        <Header />
        <main className="main">
          <div className="container">
            <div style={{ marginBottom: "2rem" }}>
              <div
                className="flex justify-between items-center"
                style={{ marginBottom: "1rem" }}
              >
                <h1
                  className="title"
                  style={{ fontSize: "2rem", marginBottom: 0 }}
                >
                  Painel de Controle
                </h1>
                <Link href="/create">
                  <button className="btn btn-primary">
                    <Plus size={16} style={{ marginRight: "0.25rem" }} />
                    Novo Post
                  </button>
                </Link>
              </div>

              <div
                className="grid"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                <div
                  className="card"
                  style={{ textAlign: "center", padding: "1.5rem" }}
                >
                  <h3
                    className="title"
                    style={{
                      fontSize: "2rem",
                      color: "var(--carolina-blue)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {posts.length}
                  </h3>
                  <p className="muted">Total de Posts</p>
                </div>
                <div
                  className="card"
                  style={{ textAlign: "center", padding: "1.5rem" }}
                >
                  <h3
                    className="title"
                    style={{
                      fontSize: "2rem",
                      color: "var(--success)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {publishedPosts.length}
                  </h3>
                  <p className="muted">Publicados</p>
                </div>
                <div
                  className="card"
                  style={{ textAlign: "center", padding: "1.5rem" }}
                >
                  <h3
                    className="title"
                    style={{
                      fontSize: "2rem",
                      color: "var(--warning)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {draftPosts.length}
                  </h3>
                  <p className="muted">Rascunhos</p>
                </div>
              </div>
            </div>

            {/* Published Posts */}
            {publishedPosts.length > 0 && (
              <div style={{ marginBottom: "3rem" }}>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "var(--text)",
                    marginBottom: "1rem",
                  }}
                >
                  Posts Publicados ({publishedPosts.length})
                </h2>
                <div className="grid" style={{ gap: "1.5rem" }}>
                  {publishedPosts.map((post) => (
                    <div key={post.id} style={{ position: "relative" }}>
                      <PostCard
                        post={post}
                        showActions={true}
                        onEdit={handleEdit}
                        onDelete={() => handleDelete(post.id)}
                      />
                      {deletingId === post.id && (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "8px",
                          }}
                        >
                          <LoadingSpinner text="Excluindo..." />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Draft Posts */}
            {draftPosts.length > 0 && (
              <div>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "var(--text)",
                    marginBottom: "1rem",
                  }}
                >
                  Posts em Rascunho ({draftPosts.length})
                </h2>
                <div className="grid" style={{ gap: "1.5rem" }}>
                  {draftPosts.map((post) => (
                    <div key={post.id} style={{ position: "relative" }}>
                      <PostCard
                        post={post}
                        showActions={true}
                        onEdit={handleEdit}
                        onDelete={() => handleDelete(post.id)}
                      />
                      {deletingId === post.id && (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "8px",
                          }}
                        >
                          <LoadingSpinner text="Excluindo..." />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {posts.length === 0 && (
              <div
                className="card accent-border"
                style={{
                  textAlign: "center",
                  padding: "3rem 1rem",
                }}
              >
                <h3 className="title" style={{ marginBottom: "0.5rem" }}>
                  Nenhum post ainda
                </h3>
                <Link href="/create">
                  <button className="btn btn-primary">
                    <Plus size={16} style={{ marginRight: "0.25rem" }} />
                    Criar Primeiro Post
                  </button>
                </Link>
              </div>
            )}
          </div>
        </main>
      </>
    </ProtectedRoute>
  );
}
