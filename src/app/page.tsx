import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";

const ArticleCard = () => {
  return (
    <Card className="border rounded-lg shadow-sm hover:shadow-md transition duration-200 ease-in-out">
      <CardHeader>
        <CardTitle className="text-xl">JavaScript Tips and Tricks</CardTitle>
        <CardDescription className="text-muted-foreground">
          Updated on Nov 7, 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Discover essential JavaScript tips to improve your coding skills and
          write more efficient code. Get insights on best practices...
        </p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
            >
              <ThumbsUp className="w-4 h-4" /> Like
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
            >
              <ThumbsDown className="w-4 h-4" /> Dislike
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" /> Comment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Home() {
  return (
    <div className="flex gap-6 p-6">
      {/* SIDE BAR */}
      <aside className="flex flex-col bg-muted rounded-lg p-4 w-[20%] h-auto shadow-lg">
        <div className="space-y-4">
          <Badge variant="outline" className="w-full py-2 text-center">
            JavaScript
          </Badge>
          <Badge variant="outline" className="w-full py-2 text-center">
            Web Development
          </Badge>
          <Badge variant="outline" className="w-full py-2 text-center">
            UI/UX Design
          </Badge>
          <Badge variant="outline" className="w-full py-2 text-center">
            React.js
          </Badge>
        </div>
      </aside>

      {/* Article Cards */}
      <main className="flex flex-wrap gap-6 w-[80%]">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
          <div key={index} className="w-full md:w-[45%] lg:w-[30%]">
            <ArticleCard />
          </div>
        ))}
      </main>
    </div>
  );
}
