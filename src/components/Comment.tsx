import { ThumbsUp, ThumbsDown, Reply } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const dummyComments = [
  {
    id: 1,
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    fullName: "Ikram Bagban",
    comment:
      "This is the first comment, and it’s a bit longer to see how it adjusts.",
  },
  {
    id: 2,
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    fullName: "Jane Doe",
    comment: "Another great comment to test the layout!",
  },
  {
    id: 3,
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    fullName: "John Smith",
    comment: "This is a shorter comment.",
  },
  {
    id: 4,
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    fullName: "Michael Green",
    comment: "This is a cool sidebar component!",
  },
  {
    id: 5,
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
    fullName: "Emma Watson",
    comment: "Loving the design so far.",
  },
  {
    id: 6,
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
    fullName: "Chris Evans",
    comment: "Nice and clean interface!",
  },
  {
    id: 7,
    profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
    fullName: "Sophia Turner",
    comment: "Can’t wait to see the final version!",
  },
  {
    id: 8,
    profilePic: "https://randomuser.me/api/portraits/men/8.jpg",
    fullName: "Liam Neeson",
    comment: "Impressive work, keep it up.",
  },
  {
    id: 9,
    profilePic: "https://randomuser.me/api/portraits/women/9.jpg",
    fullName: "Emily Blunt",
    comment: "Looks great on mobile devices too.",
  },
  {
    id: 10,
    profilePic: "https://randomuser.me/api/portraits/men/10.jpg",
    fullName: "Tom Holland",
    comment: "How do I contribute to this project?",
  },
  {
    id: 11,
    profilePic: "https://randomuser.me/api/portraits/women/11.jpg",
    fullName: "Olivia Wilde",
    comment: "Amazing attention to detail!",
  },
  {
    id: 12,
    profilePic: "https://randomuser.me/api/portraits/men/12.jpg",
    fullName: "Henry Cavill",
    comment: "Really enjoying the responsiveness.",
  },
  {
    id: 13,
    profilePic: "https://randomuser.me/api/portraits/women/13.jpg",
    fullName: "Mia Clarke",
    comment: "Love the color scheme.",
  },
  {
    id: 14,
    profilePic: "https://randomuser.me/api/portraits/men/14.jpg",
    fullName: "Jason Bourne",
    comment: "Keep up the great work!",
  },
  {
    id: 15,
    profilePic: "https://randomuser.me/api/portraits/women/15.jpg",
    fullName: "Sophia Loren",
    comment: "This feature is exactly what I needed.",
  },
  {
    id: 16,
    profilePic: "https://randomuser.me/api/portraits/men/16.jpg",
    fullName: "Robert Downey Jr.",
    comment: "Wow, this is impressive!",
  },
  {
    id: 17,
    profilePic: "https://randomuser.me/api/portraits/women/17.jpg",
    fullName: "Scarlett Johansson",
    comment: "How can I share this?",
  },
  {
    id: 18,
    profilePic: "https://randomuser.me/api/portraits/men/18.jpg",
    fullName: "Chris Hemsworth",
    comment: "Excellent work as always.",
  },
  {
    id: 19,
    profilePic: "https://randomuser.me/api/portraits/women/19.jpg",
    fullName: "Natalie Portman",
    comment: "Looking forward to more updates.",
  },
  {
    id: 20,
    profilePic: "https://randomuser.me/api/portraits/men/20.jpg",
    fullName: "Hugh Jackman",
    comment: "Super clean design!",
  },
  {
    id: 21,
    profilePic: "https://randomuser.me/api/portraits/women/21.jpg",
    fullName: "Gal Gadot",
    comment: "Perfectly executed!",
  },
  {
    id: 22,
    profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
    fullName: "Ryan Reynolds",
    comment: "Is there a dark mode?",
  },
  {
    id: 23,
    profilePic: "https://randomuser.me/api/portraits/women/23.jpg",
    fullName: "Anna Kendrick",
    comment: "So user-friendly!",
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      side="right"
      variant="floating"
      collapsible="offcanvas"
      className=" bg-white"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex justify-between items-center p-4">
                  <SidebarGroupLabel>Comments</SidebarGroupLabel>
                  <SidebarTrigger />
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarGroupContent>
            <div className="space-y-6 px-4">
              {dummyComments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-start gap-4 border-b pb-4 last:border-none"
                >
                  <Avatar>
                    <AvatarImage src={comment.profilePic} />
                    <AvatarFallback>
                      {comment.fullName.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{comment.fullName}</p>
                    <p className="text-gray-600 text-sm">{comment.comment}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 text-gray-500 hover:text-blue-600"
                      >
                        <ThumbsUp className="w-4 h-4" /> Like
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 text-gray-500 hover:text-red-600"
                      >
                        <ThumbsDown className="w-4 h-4" /> Dislike
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 text-gray-500 hover:text-green-600"
                      >
                        <Reply className="w-4 h-4" /> Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
          <Input placeholder="Write a comment..." className="flex-grow" />
          <Button>Send</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
