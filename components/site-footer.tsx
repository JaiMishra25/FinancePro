import { Heart } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t py-6">
      <div className="container flex flex-col items-center justify-center gap-4">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          Made with <Heart className="inline-block h-4 w-4 text-red-500 fill-red-500 animate-heart-beat" /> by Jai
        </p>
      </div>
    </footer>
  )
}

