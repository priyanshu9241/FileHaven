"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelative } from "date-fns";
import { useState } from "react";

import { Doc } from "../../../../convex/_generated/dataModel";
import { FileTextIcon, GanttChartIcon, ImageIcon,X } from "lucide-react";
import { ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Image from "next/image";
import { FileCardActions, getFileUrl } from "./file-actions";
import { useToast } from "@/components/ui/use-toast";

export function FileCard({
  file,
}: {
  file: Doc<"files"> & { isFavorited: boolean };
}) {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  });
  
  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
  } as Record<Doc<"files">["type"], ReactNode>;
  const [isImageOpen, setIsImageOpen] = useState(false);
  const { toast } = useToast();
  return (
    <Card className="flex-col cursor-pointer">
      {isImageOpen && (
        <div className="absolute h-full my-auto w-full top-0 bottom-0 right-0 left-0 backdrop-blur-xl z-[1000]
        flex justify-center item-center">
        <X onClick={() => setIsImageOpen(false)} className="absolute top-0 right-0 w-10 h-10 cursor-pointer" />
          <img
          onClick={() => setIsImageOpen(true)}
            alt={file.name}
            className="  aspect-auto mx-auto"
            src={getFileUrl(file.fileId)}
          />


        </div>
      )}
      <CardHeader className="relative">
        <CardTitle className="flex gap-2 text-base font-normal">
          <div className="flex justify-center">{typeIcons[file.type]}</div>
          {file.name}
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardActions isFavorited={file.isFavorited} file={file} />
        </div>
      </CardHeader>
      <CardContent className="flex justify-center items-center h-[200px]">
        {file.type === "image" && (
          <Image
          onClick={() => setIsImageOpen(true)}
            width="1000"
            height="300"
            alt={file.name}
            className="w-full h-full object-cover aspect-square"
            src={getFileUrl(file.fileId)}
          />
        )}

        {file.type === "csv" && (
          <GanttChartIcon onClick={()=>{
              toast({
                  variant: "destructive",
                  title: "No support",
                  description: "Currently we do not support viewing these file types",
                });
          }} className="w-full h-full sm:w-[60px] sm:h-[60px]" />
        )}

        {file.type === "pdf" && (
          <FileTextIcon onClick={()=>{
              toast({
                  variant: "destructive",
                  title: "No support",
                  description: "Currently we do not support viewing these file types",
                });
          }} className="w-full h-full sm:w-[60px] sm:h-[60px]" />
        )}
      </CardContent>

      <CardFooter className="flex justify-between flex-wrap">
        <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
          <Avatar className="w-6 h-6">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {userProfile?.name}
        </div>
        <div className="text-xs text-gray-700">
          Uploaded on {formatRelative(new Date(file._creationTime), new Date())}
        </div>
      </CardFooter>
    </Card>
  );
}
