import { CategoryManager } from "@/components/category-manager"

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">Gestión de Categorías</h1>
        </div>
        <CategoryManager />
      </div>
    </main>
  )
}
