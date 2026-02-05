"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/image_upload/uploader";
import { uploadImage } from "@/lib/cloudinary";
import { toast } from "sonner";
import {createPost} from "@/app/Write/action";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export default function WriteBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [tag, setTag] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validForm = (): string | null => {
        if (!title.trim()) {
            return "Title is required";
        }
        if (!content.trim()) {
            return "Content is required";
        }
        if (!selectedImage) {
            return "Please upload an Image";
        }
        if (!tag) {
            return "Tag is required";
        }
        return null;
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError(null)

        const validationError = validForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSubmitting(true);

        try {
            const imgUrl = await uploadImage(selectedImage!);

            const result = await createPost({
                title: title,
                content: content,
                imageUrl: imgUrl,
                tag: tag as string,
            })

            if(result.error) {
                setError(result.error)
                return;
            }

            toast.success("Blog post created successfully.");

            setTitle("");
            setContent("");
            setSelectedImage(null);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to create blog post";
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className=" w-full">
            <h1 className="text-4xl font-bold mb-3 mt-6 text-center">
                Write your blog!
            </h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 mx-auto p-6 w-[95%] md:w-[50%]"
            >
                <div>
                    <Label
                        htmlFor="title"
                        className="font-semibold text-xl mb-1.5"
                    >
                        Title:
                    </Label>
                    <Input
                        id="title"
                        type="text"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <Label
                        htmlFor="content"
                        className="font-semibold text-xl mb-1.5"
                    >
                        Content:
                    </Label>
                    <Textarea
                        id="content"
                        placeholder="Write your blog content here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <Label
                        className="font-semibold text-xl mb-1.5"
                    >
                        Tag:
                    </Label>
                    <Select
                        onValueChange={(value) => { setTag(value); }}
                        disabled={isSubmitting}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue  placeholder="Add a tag"/>
                        </SelectTrigger>
                        <SelectContent  className="mt-7">
                            <SelectGroup>
                                <SelectLabel>Select Tags</SelectLabel>
                                <SelectItem value="Tech">Tech</SelectItem>
                                <SelectItem value="Exploration">Exploration</SelectItem>
                                <SelectItem value="Thoughts">Thoughts</SelectItem>
                                <SelectItem value="Food">Food</SelectItem>
                                <SelectItem value="Driving">Driving</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="">
                    <Label
                        htmlFor="content"
                        className="font-semibold text-xl mb-1.5"
                    >
                        Upload Thumbnail:
                    </Label>
                    <ImageUploader
                        setSelectedImage={setSelectedImage}
                        selectedImage={selectedImage}
                    />
                </div>

                <div className="space-y-4">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Publishing..." : "Publish Blog Post"}
                    </Button>
                    {error && (
                        <p className="text-sm text-destructive text-center">{error}</p>
                    )}
                </div>

            </form>
        </div>
    )
}