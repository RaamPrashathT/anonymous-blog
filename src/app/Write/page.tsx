"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/lib/cloudinary";
import { toast } from "sonner";
import {createPost} from "@/app/Write/action";
import { CrepeEditor } from '@/components/crepe/CrepeEditor'
import { MilkdownProvider } from '@milkdown/react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import {ImageUploader} from "@/components/image_upload/uploader"

const tagList = [
  "Tech",
  "Exploration",
  "Food",
  "Thoughts",
  "Driving",
] as const

export default function WriteBlog() {
    const [title, setTitle] = useState("");
    const [editorKey, setEditorKey] = useState(0)
    const [content, setContent] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogError, setDialogError] = useState<string | null>(null);

    const validateTitleAndContent = (): string | null => {
        if (!title.trim()) {
            return "Title is required";
        }
        if (!content.trim()) {
            return "Content is required";
        }
        return null;
    }

    const validateImageAndTags = (): string | null => {
        if (!selectedImage) {
            return "Please upload an image";
        }
        if (tags.length === 0) {
            return "At least one tag is required";
        }
        return null;
    }

    useEffect(() => {
        console.log("tags:", tags)
    }, [tags])

    const handlePublishClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError(null);
        setDialogError(null);

        const validationError = validateTitleAndContent();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsDialogOpen(true);
    }

    const handleFinalSubmit = async () => {
        setDialogError(null);

        const validationError = validateImageAndTags();
        if (validationError) {
            setDialogError(validationError);
            return;
        }

        setIsSubmitting(true);

        try {
            const imgUrl = await uploadImage(selectedImage!);

            const result = await createPost({
                title: title,
                content: content,
                imageUrl: imgUrl,
                tags: tags,
            })

            if(result.error) {
                setDialogError(result.error);
                return;
            }

            toast.success("Blog post created successfully.");

            setTitle("");
            setContent("");
            setEditorKey(prev => prev + 1)
            setSelectedImage(null);
            setTags([]);
            setIsDialogOpen(false);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to create blog post";
            setDialogError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleTagSelect = (value: string) => {
        if (!tags.includes(value)) {
            setTags([...tags, value]);
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    }

    const availableTags = tagList.filter(tag => !tags.includes(tag));

    return (
        <div className="w-full px-16">
            <form
                onSubmit={handlePublishClick}
                className="space-y-6 mx-auto p-6 w-[95%] text-2xl"
            >
                <div className="flex justify-between items-center w-full">
                    <input
                    id="title"
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isSubmitting}
                    className="
                        p-0 text-5xl flex-1 min-w-0 focus:outline-none ml-20
                    "
                    />

                    <div>
                        <Button 
                            type="submit" 
                            className="w-48 mr-20" 
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Publishing..." : "Publish Blog Post"}
                        </Button>
                        
                        {error && (
                            <p className="text-sm text-destructive text-center mt-2">{error}</p>
                        )}
                    </div>
                </div>

                <div >
                    <MilkdownProvider>
                        <div className="container mx-auto p-0 bg-white">
                            <CrepeEditor 
                                key={editorKey}
                                onChange={setContent}
                            />
                        </div>
                    </MilkdownProvider>
                </div>
            </form>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-150">
                    <DialogHeader>
                        <DialogTitle>Complete Your Blog Post</DialogTitle>
                        <div>
                            <p className="mb-1">Give thumbnail image and select tags to complete.</p>
                            <p className="text-orange-500">Disclaimer: This blog cannot be deleted or changed in the future.</p>
                        </div>
                    </DialogHeader>
                    
                    <div className="space-y-6 py-4">
                        <div className="space-y-3">
                            <Label className="font-semibold text-lg">
                                Tags:
                            </Label>
                            
                            
                            {availableTags.length > 0 && (
                                <Select onValueChange={handleTagSelect}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a tag to add..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableTags.map((tag) => (
                                            <SelectItem key={tag} value={tag}>
                                                {tag}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            
                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2   rounded-md ">
                                    {tags.map((tag) => (
                                        <Badge 
                                            key={tag} 
                                            variant="secondary"
                                            className="px-3 py-1 text-sm"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className="ml-2 hover:text-destructive"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {tags.length === tagList.length && (
                                <p className="text-sm text-muted-foreground">
                                    All tags have been selected
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className="font-semibold text-lg mb-2 block">
                                Upload Thumbnail:
                            </Label>
                            <ImageUploader
                                setSelectedImage={setSelectedImage}
                                selectedImage={selectedImage}
                            />
                        </div>

                        {dialogError && (
                            <p className="text-sm text-destructive text-center">{dialogError}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleFinalSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Publishing..." : "Publish"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}